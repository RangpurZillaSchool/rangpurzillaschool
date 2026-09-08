import {
  BASE_URL,
  getSessionCookie,
  jsonResponse,
  errorResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequestGet({ request }) {
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.teachers, async () => {
    try {
      const cookie = await getSessionCookie();
      const url = new URL('officer-teacher.aspx', BASE_URL).href;

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': BASE_URL
        }
      });

      if (!res.ok) {
        return errorResponse(`Legacy server returned status ${res.status}`, res.status);
      }

      const html = await res.text();
      const teachers = [];
      const idMatches = [...html.matchAll(/id="ContentPlaceHolder1_grdvTeachers_lblID_(\d+)"[^>]*>([^<]*)<\/span>/g)];

      for (const m of idMatches) {
        const i = m[1];
        const pdsId = m[2].trim();
        const nameMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblName_${i}"[^>]*>([^<]*)<\\/span>`));
        const orgPostMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblOrgPost_${i}"[^>]*>([^<]*)<\\/span>`));
        const desigMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblDesig_${i}"[^>]*>([^<]*)<\\/span>`));
        const joinMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblStationJoin_${i}"[^>]*>([^<]*)<\\/span>`));
        const distMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblDist_${i}"[^>]*>([^<]*)<\\/span>`));
        const mobileMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_lblMobile_${i}"[^>]*>([^<]*)<\\/span>`));
        const imgMatch = html.match(new RegExp(`id="ContentPlaceHolder1_grdvTeachers_imgEMp_${i}"[^>]*src="([^"]*)"`));

        const rawPhoto = imgMatch && imgMatch[1] && !imgMatch[1].includes('no-image') ? imgMatch[1] : null;

        teachers.push({
          sl: parseInt(i) + 1,
          pdsId,
          name: nameMatch ? nameMatch[1].trim() : '',
          originalPost: orgPostMatch ? orgPostMatch[1].trim() : '',
          designation: desigMatch ? desigMatch[1].trim() : '',
          joiningDate: joinMatch ? joinMatch[1].trim() : '',
          homeDistrict: distMatch ? distMatch[1].trim() : '',
          mobile: mobileMatch ? mobileMatch[1].trim() : '',
          photo: rawPhoto ? `/api/teachers/photo?url=${encodeURIComponent(rawPhoto)}` : null
        });
      }

      return jsonResponse({ total: teachers.length, teachers }, 200, CACHE_TTL.teachers);
    } catch (err) {
      return errorResponse(err.message || 'Unable to retrieve teachers list.');
    }
  });
}
