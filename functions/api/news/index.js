import {
  BASE_URL,
  getSessionCookie,
  jsonResponse,
  errorResponse,
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequestGet({ request }) {
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.news, async () => {
    try {
      const cookie = await getSessionCookie();
      const url = new URL('news.aspx', BASE_URL).href;

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
      const newsItems = [];
      const tableMatch = html.match(/<table[^>]*id=["']ContentPlaceHolder1_GridView1["'][^>]*>([\s\S]*?)<\/table>/i);

      if (tableMatch) {
        const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        for (let i = 1; i < rows.length; i++) {
          const cols = [...rows[i][1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
          if (cols.length >= 3) {
            const sl = cols[0][1].replace(/<[^>]+>/g, '').trim();
            const title = cols[1][1].replace(/<[^>]+>/g, '').trim();
            const date = cols[2][1].replace(/<[^>]+>/g, '').trim();
            const linkMatch = rows[i][1].match(/href=["']news-details\.aspx\?nid=(\d+)["']/i);
            const id = linkMatch ? linkMatch[1] : `news-${i}`;

            if (title) {
              newsItems.push({ id, sl, title, date });
            }
          }
        }
      }

      return jsonResponse({ total: newsItems.length, news: newsItems }, 200, CACHE_TTL.news);
    } catch (err) {
      return errorResponse(err.message || 'Unable to retrieve news from school server.');
    }
  });
}
