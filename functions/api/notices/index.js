import {
  BASE_URL,
  getSessionCookie,
  jsonResponse,
  errorResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

/**
 * Parses the legacy ASP.NET GridView (ContentPlaceHolder1_GridView1) into notice objects.
 *
 * Header-aware: a row is treated as a notice only when it links to
 * "notice-details.aspx?nid=..." — so the newest notices at the top of the table
 * are ALWAYS included regardless of how many header/filter rows the legacy page renders.
 * (Previously a fixed row offset silently dropped the two most recent notices.)
 */
export function parseNotices(html) {
  const notices = [];
  const tableMatch = html.match(/<table[^>]*id=["']ContentPlaceHolder1_GridView1["'][^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return notices;

  const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  for (const row of rows) {
    const rowHtml = row[1];

    const linkMatch = rowHtml.match(/href=["']notice-details\.aspx\?nid=(\d+)["']/i);
    if (!linkMatch) continue; // header, filter or pager rows carry no notice link

    const cols = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
    if (cols.length < 3) continue;

    const sl = cols[0][1].replace(/<[^>]+>/g, '').trim();
    const title = cols[1][1].replace(/<[^>]+>/g, '').trim();
    const date = cols[2][1].replace(/<[^>]+>/g, '').trim();
    if (!title) continue;

    const id = linkMatch[1];
    notices.push({
      id,
      sl,
      title,
      date,
      attachmentUrl: `/api/notices/file?url=${encodeURIComponent(`http://sib.gov.bd/notice_board/127372${id}.jpg`)}`
    });
  }

  return notices;
}

async function fetchNoticeBoardHtml(forceNewSession = false) {
  const cookie = await getSessionCookie(forceNewSession);
  const url = new URL('notice-board.aspx', BASE_URL).href;

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

export async function onRequestGet({ request }) {
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.notices, async () => {
    try {
      let notices = parseNotices(await fetchNoticeBoardHtml());

      if (notices.length === 0) {
        // The GridView only renders with a valid ASP.NET session. If the cached
        // session went stale, retry once with a brand-new one before giving up.
        notices = parseNotices(await fetchNoticeBoardHtml(true));
      }

      if (notices.length === 0) {
        // Never store an empty 200 response in the edge cache: return an
        // uncacheable error so the client falls back to its verified dataset
        // and the next request retries the origin immediately.
        return errorResponse('Unable to retrieve notices from the school server (empty or invalid response).', 502);
      }

      return jsonResponse({ total: notices.length, notices }, 200, CACHE_TTL.notices);
    } catch (err) {
      return errorResponse(err.message || 'Unable to retrieve notices from school server.');
    }
  });
}
