import {
  BASE_URL,
  getSessionCookie,
  extractHiddenFields,
  jsonResponse,
  errorResponse,
  legacyUnavailableResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const selectedClass = url.searchParams.get('class');
  const selectedShift = url.searchParams.get('shift');
  const selectedSection = url.searchParams.get('section');

  if (!selectedClass || !selectedShift || !selectedSection) {
    return errorResponse('Parameters class, shift, and section are required. Example: /api/students?class=Six&shift=Morning&section=A', 400);
  }

  return withEdgeCacheAndCoalescing(request, CACHE_TTL.students, async () => {
    try {
      const cookie = await getSessionCookie();
      if (!cookie) {
        return legacyUnavailableResponse();
      }

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
      return legacyUnavailableResponse();
    }

    const initialHtml = await getRes.text();
    let state = extractHiddenFields(initialHtml);

    // Step 2: Post Class
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

    if (!post1Res.ok) {
      return legacyUnavailableResponse();
    }

    const post1Html = await post1Res.text();
    state = extractHiddenFields(post1Html);

    // Step 3: Post Shift
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

    if (!post2Res.ok) {
      return legacyUnavailableResponse();
    }

    const post2Html = await post2Res.text();
    state = extractHiddenFields(post2Html);

    // Step 4: Post Section
    const body3 = new URLSearchParams({
      '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmbSection',
      '__EVENTARGUMENT': '',
      '__LASTFOCUS': '',
      '__VIEWSTATE': state.viewState,
      '__VIEWSTATEGENERATOR': state.viewStateGenerator,
      'ctl00$ContentPlaceHolder1$txtSession': '2026',
      'ctl00$ContentPlaceHolder1$cmbClass': selectedClass,
      'ctl00$ContentPlaceHolder1$cmbShift': selectedShift,
      'ctl00$ContentPlaceHolder1$cmbSection': selectedSection
    });

    const post3Res = await fetch(studentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Cookie': cookie,
        'Referer': studentUrl
      },
      body: body3.toString()
    });

    if (!post3Res.ok) {
      return legacyUnavailableResponse();
    }

    const finalHtml = await post3Res.text();

    // Parse students table
    const students = [];
    const rollMatches = [...finalHtml.matchAll(/id="ContentPlaceHolder1_grdvStudents_lblRollNo_(\d+)"[^>]*>([^<]*)<\/span>/g)];

    for (const m of rollMatches) {
      const idx = m[1];
      const roll = m[2].trim();
      const idMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_lblID_${idx}"[^>]*>([^<]*)<\\/span>`));
      const nameMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_lblName_${idx}"[^>]*>([^<]*)<\\/span>`));
      const imgMatch = finalHtml.match(new RegExp(`id="ContentPlaceHolder1_grdvStudents_imgStd_${idx}"[^>]*src="([^"]*)"`));

      const rawPhoto = imgMatch && imgMatch[1] && !imgMatch[1].includes('no-image') && !imgMatch[1].endsWith('/') ? imgMatch[1] : null;

      students.push({
        roll,
        id: idMatch ? idMatch[1].trim() : '',
        name: nameMatch ? nameMatch[1].trim() : '',
        photo: rawPhoto ? `/api/students/photo?url=${encodeURIComponent(rawPhoto)}` : null
      });
    }

    return jsonResponse({
      class: selectedClass,
      shift: selectedShift,
      section: selectedSection,
      total: students.length,
      students
    }, 200, CACHE_TTL.students);
  } catch (err) {
    return legacyUnavailableResponse();
  }
  });
}
