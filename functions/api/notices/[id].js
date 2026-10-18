import {
  BASE_URL,
  getSessionCookie,
  jsonResponse,
  errorResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

async function fetchNoticeDetailsHtml(id, forceNewSession = false) {
  const cookie = await getSessionCookie(forceNewSession);
  const url = new URL(`notice-details.aspx?nid=${id}`, BASE_URL).href;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      'Cookie': cookie,
      'Referer': BASE_URL
    }
  });

  if (!res.ok) {
    throw new Error(`Legacy server returned status ${res.status}`);
  }

  return res.text();
}

export function parseNoticeDetails(id, html) {
  const titleMatch = html.match(/id="ContentPlaceHolder1_lblTitle"[^>]*>([\s\S]*?)<\/span>/i);
  const detailsMatch = html.match(/id="ContentPlaceHolder1_lblDetils"[^>]*>([\s\S]*?)<\/span>/i);
  const updateMatch = html.match(/id="ContentPlaceHolder1_lblUpDate"[^>]*>([\s\S]*?)<\/span>/i);
  const fileMatch = html.match(/(?:href|src|data)\s*=\s*["'](http:\/\/sib\.gov\.bd\/notice_board\/[^"']+)["']/i);

  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const description = detailsMatch ? detailsMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const lastUpdate = updateMatch ? updateMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const rawFileUrl = fileMatch ? fileMatch[1] : `http://sib.gov.bd/notice_board/127372${id}.jpg`;
  const isPdf = rawFileUrl.toLowerCase().endsWith('.pdf');
  const fileType = isPdf ? 'pdf' : 'image';
  const fileUrl = rawFileUrl ? `/api/notices/file?url=${encodeURIComponent(rawFileUrl)}` : null;

  return { id, title, description, lastUpdate, fileUrl, fileType };
}

export async function onRequestGet({ request, params }) {
  const id = params.id;
  if (!id) {
    return errorResponse('Notice ID is required', 400);
  }

  return withEdgeCacheAndCoalescing(request, CACHE_TTL.noticeDetail, async () => {
    try {
      let details = parseNoticeDetails(id, await fetchNoticeDetailsHtml(id));

      if (!details.title && !details.description && !details.lastUpdate) {
        // Session may have expired on the legacy server; retry once with a fresh one.
        details = parseNoticeDetails(id, await fetchNoticeDetailsHtml(id, true));
      }

      if (!details.title && !details.description && !details.lastUpdate) {
        return errorResponse('Unable to retrieve the notice from the school server (empty or invalid response).', 502);
      }

      return jsonResponse(details, 200, CACHE_TTL.noticeDetail);
    } catch (err) {
      return errorResponse(err.message || 'Unable to retrieve notice details.');
    }
  });
}
