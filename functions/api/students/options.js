import {
  BASE_URL,
  getSessionCookie,
  extractHiddenFields,
  jsonResponse,
  errorResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

function extractSelectOptions(html, selectName) {
  const regex = new RegExp(`<select[^>]*name=["']${selectName.replace(/\$/g, '\\$')}["'][^>]*>([\\s\\S]*?)<\\/select>`, 'i');
  const match = html.match(regex);
  if (!match) return [];
  const optRegex = /<option\s+value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/option>/gi;
  const options = [];
  let m;
  while ((m = optRegex.exec(match[1])) !== null) {
    const val = m[1].trim();
    const text = m[2].trim();
    if (val && val !== '0' && val !== '-' && !text.toLowerCase().includes('select')) {
      options.push({ value: val, label: text });
    }
  }
  return options;
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const selectedClass = url.searchParams.get('class');
  const selectedShift = url.searchParams.get('shift');

  return withEdgeCacheAndCoalescing(request, CACHE_TTL.studentOptions, async () => {
    try {
      const cookie = await getSessionCookie();
      const studentUrl = new URL('studentlist.aspx', BASE_URL).href;

      // Step 1: Initial GET
      const getRes = await fetch(studentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': BASE_URL
        }
      });

      if (!getRes.ok) {
        return errorResponse(`Legacy server error ${getRes.status}`, getRes.status);
      }

      const initialHtml = await getRes.text();
      const classes = extractSelectOptions(initialHtml, 'ctl00$ContentPlaceHolder1$cmbClass');

      // If only classes requested
      if (!selectedClass) {
        return jsonResponse({
          classes: classes.length > 0 ? classes : [
            { value: 'Three', label: 'Three' },
            { value: 'Four', label: 'Four' },
            { value: 'Five', label: 'Five' },
            { value: 'Six', label: 'Six' },
            { value: 'Seven', label: 'Seven' },
            { value: 'Eight', label: 'Eight' },
            { value: 'Nine', label: 'Nine' },
            { value: 'Ten', label: 'Ten' },
            { value: 'S.S.C', label: 'S.S.C' }
          ]
        }, 200, CACHE_TTL.studentOptions);
      }

      // Step 2: Post Class to get shifts
      let state = extractHiddenFields(initialHtml);
      const body1 = new URLSearchParams({
        '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbClass',
        '__EVENTARGUMENT': '',
        '__LASTFOCUS': '',
        '__VIEWSTATE': state.viewState,
        '__VIEWSTATEGENERATOR': state.viewStateGenerator,
        'ctl00$ContentPlaceHolder1$txtSession': '2026',
        'ctl00$ContentPlaceHolder1$cmbClass': selectedClass
      });

      const post1Res = await fetch(studentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': studentUrl
        },
        body: body1.toString()
      });

      const post1Html = await post1Res.text();
      const shifts = extractSelectOptions(post1Html, 'ctl00$ContentPlaceHolder1$cmbShift');

      if (!selectedShift) {
        return jsonResponse({
          class: selectedClass,
          shifts: shifts.length > 0 ? shifts : [
            { value: 'Morning', label: 'Morning' },
            { value: 'Day', label: 'Day' }
          ]
        }, 200, CACHE_TTL.studentOptions);
      }

      // Step 3: Post Shift to get sections
      state = extractHiddenFields(post1Html);
      const body2 = new URLSearchParams({
        '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbShift',
        '__EVENTARGUMENT': '',
        '__LASTFOCUS': '',
        '__VIEWSTATE': state.viewState,
        '__VIEWSTATEGENERATOR': state.viewStateGenerator,
        'ctl00$ContentPlaceHolder1$txtSession': '2026',
        'ctl00$ContentPlaceHolder1$cmbClass': selectedClass,
        'ctl00$ContentPlaceHolder1$cmbShift': selectedShift
      });

      const post2Res = await fetch(studentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': studentUrl
        },
        body: body2.toString()
      });

      const post2Html = await post2Res.text();
      const sections = extractSelectOptions(post2Html, 'ctl00$ContentPlaceHolder1$cmbSection');

      return jsonResponse({
        class: selectedClass,
        shift: selectedShift,
        sections: sections.length > 0 ? sections : (
          selectedShift.toLowerCase() === 'morning' 
            ? [{ value: 'A', label: 'A' }, { value: 'C', label: 'C' }]
            : [{ value: 'B', label: 'B' }, { value: 'D', label: 'D' }]
        )
      }, 200, CACHE_TTL.studentOptions);
    } catch (err) {
      return errorResponse(err.message || 'Unable to retrieve student filter options.');
    }
  });
}
