import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// 12-Hour Default Cache Policy (43200 seconds)
const DEV_CACHE_TTL_MS = 43200 * 1000; // 12 hours in ms
const devCache = new Map<string, { body: string; expiresAt: number; status: number }>();
const devInFlight = new Map<string, Promise<{ body: string; status: number }>>();

function normalizeDevUrlKey(urlStr: string): string {
  try {
    const parsed = new URL(urlStr, 'http://localhost');
    const params = new URLSearchParams(parsed.searchParams);
    const sorted = [...params.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const cleanParams = new URLSearchParams();
    for (const [k, v] of sorted) {
      cleanParams.set(k.toLowerCase().trim(), v.trim());
    }
    const search = cleanParams.toString();
    return `${parsed.pathname}${search ? '?' + search : ''}`;
  } catch (e) {
    return urlStr;
  }
}

// Local dev API plugin mirroring Cloudflare Functions
function localApiPlugin(): Plugin {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const normalizedKey = normalizeDevUrlKey(req.url);
        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200');

        // Check dev cache (12-hour TTL)
        const cached = devCache.get(normalizedKey);
        const now = Date.now();
        if (cached && cached.expiresAt > now) {
          res.setHeader('X-Cache', 'HIT');
          res.setHeader('X-Cache-TTL', '43200s');
          res.statusCode = cached.status;
          return res.end(cached.body);
        }

        // Stampede protection: request coalescing
        let flight = devInFlight.get(normalizedKey);
        if (!flight) {
          flight = (async () => {
            try {
              if (pathname === '/api/notices') {
                const data = fs.readFileSync(path.resolve(__dirname, 'src/data/notices.json'), 'utf8');
                const notices = JSON.parse(data);
                return { status: 200, body: JSON.stringify({ total: notices.length, notices }) };
              }

              if (pathname.startsWith('/api/notices/')) {
                const id = pathname.split('/').pop();
                const data = fs.readFileSync(path.resolve(__dirname, 'src/data/notices.json'), 'utf8');
                const notices = JSON.parse(data);
                const found = notices.find((n: any) => n.id === id);
                return {
                  status: 200,
                  body: JSON.stringify({
                    id: id,
                    title: found ? found.title : 'বিজ্ঞপ্তি',
                    description: found?.description || '',
                    fileUrl: found?.attachmentUrl || `http://sib.gov.bd/notice_board/127372${id}.pdf`,
                    lastUpdate: found?.date || ''
                  })
                };
              }

              if (pathname === '/api/teachers') {
                const data = fs.readFileSync(path.resolve(__dirname, 'src/data/teachers.json'), 'utf8');
                const teachers = JSON.parse(data);
                return { status: 200, body: JSON.stringify({ total: teachers.length, teachers }) };
              }

              if (pathname === '/api/news') {
                const data = fs.readFileSync(path.resolve(__dirname, 'src/data/news.json'), 'utf8');
                const news = JSON.parse(data);
                return { status: 200, body: JSON.stringify({ total: news.length, news }) };
              }

              if (pathname === '/api/downloads') {
                const data = fs.readFileSync(path.resolve(__dirname, 'src/data/downloads.json'), 'utf8');
                const downloads = JSON.parse(data);
                return { status: 200, body: JSON.stringify({ total: downloads.length, downloads }) };
              }

              if (pathname === '/api/students/options') {
                const cls = url.searchParams.get('class');
                const shift = url.searchParams.get('shift');

                const classes = [
                  { value: 'Three', label: 'Three' },
                  { value: 'Four', label: 'Four' },
                  { value: 'Five', label: 'Five' },
                  { value: 'Six', label: 'Six' },
                  { value: 'Seven', label: 'Seven' },
                  { value: 'Eight', label: 'Eight' },
                  { value: 'Nine', label: 'Nine' },
                  { value: 'Ten', label: 'Ten' },
                  { value: 'S.S.C', label: 'S.S.C' }
                ];

                const shifts = [
                  { value: 'Morning', label: 'Morning' },
                  { value: 'Day', label: 'Day' }
                ];

                const sections = (shift && shift.toLowerCase() === 'day')
                  ? [{ value: 'B', label: 'B' }, { value: 'D', label: 'D' }]
                  : [{ value: 'A', label: 'A' }, { value: 'C', label: 'C' }];

                return { status: 200, body: JSON.stringify({ classes, shifts, sections }) };
              }

              if (pathname === '/api/students') {
                const cls = url.searchParams.get('class');
                const shift = url.searchParams.get('shift');
                const section = url.searchParams.get('section');

                if (!cls || !shift || !section) {
                  return {
                    status: 400,
                    body: JSON.stringify({
                      error: true,
                      message: 'Parameters class, shift, and section are required. Example: /api/students?class=Six&shift=Morning&section=A'
                    })
                  };
                }

                try {
                  const homeRes = await fetch('http://www.rangpurzillaschool.edu.bd/', {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                  });
                  const cookies = homeRes.headers.getSetCookie ? homeRes.headers.getSetCookie() : [homeRes.headers.get('set-cookie')];
                  const cookieHeader = cookies.filter(Boolean).map((c: string) => c.split(';')[0]).join('; ');

                  const getRes = await fetch('http://www.rangpurzillaschool.edu.bd/studentlist.aspx', {
                    headers: { 'User-Agent': 'Mozilla/5.0', 'Cookie': cookieHeader, 'Referer': 'http://www.rangpurzillaschool.edu.bd/' }
                  });
                  const initialHtml = await getRes.text();
                  const vs = initialHtml.match(/id="__VIEWSTATE"\s+value="([^"]*)"/)?.[1] || '';
                  const vsg = initialHtml.match(/id="__VIEWSTATEGENERATOR"\s+value="([^"]*)"/)?.[1] || '';

                  // Step 2
                  const p1 = await fetch('http://www.rangpurzillaschool.edu.bd/studentlist.aspx', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0', 'Cookie': cookieHeader, 'Referer': 'http://www.rangpurzillaschool.edu.bd/studentlist.aspx' },
                    body: new URLSearchParams({
                      '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbClass',
                      '__VIEWSTATE': vs,
                      '__VIEWSTATEGENERATOR': vsg,
                      'ctl00$ContentPlaceHolder1$txtSession': '2026',
                      'ctl00$ContentPlaceHolder1$cmbClass': cls
                    }).toString()
                  });
                  const h1 = await p1.text();
                  const vs1 = h1.match(/id="__VIEWSTATE"\s+value="([^"]*)"/)?.[1] || '';

                  // Step 3
                  const p2 = await fetch('http://www.rangpurzillaschool.edu.bd/studentlist.aspx', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0', 'Cookie': cookieHeader, 'Referer': 'http://www.rangpurzillaschool.edu.bd/studentlist.aspx' },
                    body: new URLSearchParams({
                      '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbShift',
                      '__VIEWSTATE': vs1,
                      '__VIEWSTATEGENERATOR': vsg,
                      'ctl00$ContentPlaceHolder1$txtSession': '2026',
                      'ctl00$ContentPlaceHolder1$cmbClass': cls,
                      'ctl00$ContentPlaceHolder1$cmbShift': shift
                    }).toString()
                  });
                  const h2 = await p2.text();
                  const vs2 = h2.match(/id="__VIEWSTATE"\s+value="([^"]*)"/)?.[1] || '';

                  // Step 4
                  const p3 = await fetch('http://www.rangpurzillaschool.edu.bd/studentlist.aspx', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0', 'Cookie': cookieHeader, 'Referer': 'http://www.rangpurzillaschool.edu.bd/studentlist.aspx' },
                    body: new URLSearchParams({
                      '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbSection',
                      '__VIEWSTATE': vs2,
                      '__VIEWSTATEGENERATOR': vsg,
                      'ctl00$ContentPlaceHolder1$txtSession': '2026',
                      'ctl00$ContentPlaceHolder1$cmbClass': cls,
                      'ctl00$ContentPlaceHolder1$cmbShift': shift,
                      'ctl00$ContentPlaceHolder1$cmbSection': section
                    }).toString()
                  });
                  const finalHtml = await p3.text();
                  const students: any[] = [];
                  const rollMatches = [...finalHtml.matchAll(/id="ContentPlaceHolder1_grdvStudents_lblRollNo_(\d+)"[^>]*>([^<]*)<\/span>/g)];
                  for (const m of rollMatches) {
                    const idx = m[1];
                    const roll = m[2].trim();
                    const idMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_lblID_${idx}"[^>]*>([^<]*)<\\/span>`));
                    const nameMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_lblName_${idx}"[^>]*>([^<]*)<\\/span>`));
                    const imgMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_imgStd_${idx}"[^>]*src="([^"]*)"`));
                    students.push({
                      roll,
                      id: idMatch ? idMatch[1].trim() : '',
                      name: nameMatch ? nameMatch[1].trim() : '',
                      photo: imgMatch && imgMatch[1] && !imgMatch[1].includes('no-image') ? imgMatch[1] : null
                    });
                  }

                  return {
                    status: 200,
                    body: JSON.stringify({ class: cls, shift, section, total: students.length, students })
                  };
                } catch (liveErr) {
                  console.warn('Live dev student query failed, returning LEGACY_UNAVAILABLE:', liveErr);
                  return {
                    status: 503,
                    body: JSON.stringify({
                      error: true,
                      code: 'LEGACY_UNAVAILABLE',
                      message: 'Student information is temporarily unavailable.'
                    })
                  };
                }
              }

              return { status: 404, body: JSON.stringify({ error: true, message: 'Endpoint not found' }) };
            } catch (err: any) {
              return { status: 500, body: JSON.stringify({ error: true, message: err.message }) };
            } finally {
              devInFlight.delete(normalizedKey);
            }
          })();
          devInFlight.set(normalizedKey, flight);
        }

        const result = await flight;

        // If 200, store in 12-hour dev cache
        if (result.status === 200) {
          devCache.set(normalizedKey, {
            body: result.body,
            status: result.status,
            expiresAt: Date.now() + DEV_CACHE_TTL_MS
          });
        } else {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }

        res.setHeader('X-Cache', 'MISS');
        res.setHeader('X-Cache-TTL', '43200s');
        res.statusCode = result.status;
        return res.end(result.body);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
