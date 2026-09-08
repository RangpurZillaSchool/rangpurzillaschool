import {
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequest({ request }) {
  const requestUrl = new URL(request.url);
  const targetUrlParam = requestUrl.searchParams.get('url');
  const noticeIdParam = requestUrl.searchParams.get('id');

  let targetUrl = targetUrlParam;
  if (!targetUrl && noticeIdParam && /^\d+$/.test(noticeIdParam)) {
    targetUrl = `http://sib.gov.bd/notice_board/127372${noticeIdParam}.pdf`;
  }

  if (!targetUrl) {
    return new Response('Missing target file url or id parameter.', { status: 400 });
  }

  // Domain security whitelist - strictly notice board origin hosts
  try {
    const parsed = new URL(targetUrl);
    const allowedHosts = ['sib.gov.bd', 'www.rangpurzillaschool.edu.bd', 'rangpurzillaschool.edu.bd'];
    if (!['http:', 'https:'].includes(parsed.protocol) || !allowedHosts.includes(parsed.hostname.toLowerCase())) {
      return new Response('Forbidden file origin.', { status: 403 });
    }
  } catch {
    return new Response('Invalid target file URL.', { status: 400 });
  }

  // Generate candidate URLs (auto-resolving .pdf vs .jpg vs .jpeg)
  const candidates = [];
  const lowerUrl = targetUrl.toLowerCase();
  if (lowerUrl.endsWith('.pdf')) {
    candidates.push(targetUrl);
    candidates.push(targetUrl.replace(/\.pdf$/i, '.jpg'));
    candidates.push(targetUrl.replace(/\.pdf$/i, '.jpeg'));
  } else if (lowerUrl.endsWith('.jpg')) {
    candidates.push(targetUrl);
    candidates.push(targetUrl.replace(/\.jpg$/i, '.pdf'));
    candidates.push(targetUrl.replace(/\.jpg$/i, '.jpeg'));
  } else if (lowerUrl.endsWith('.jpeg')) {
    candidates.push(targetUrl);
    candidates.push(targetUrl.replace(/\.jpeg$/i, '.pdf'));
    candidates.push(targetUrl.replace(/\.jpeg$/i, '.jpg'));
  } else {
    candidates.push(targetUrl);
  }

  // 12-Hour Edge Cache + Single-flight coalescing
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.notices, async () => {
    try {
      let winningRes = null;
      let winningUrl = null;

      for (const candidate of candidates) {
        try {
          const res = await fetch(candidate, {
            method: request.method === 'HEAD' ? 'HEAD' : 'GET',
            signal: AbortSignal.timeout(8000),
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
              'Referer': 'http://www.rangpurzillaschool.edu.bd/'
            }
          });

          if (res.ok) {
            winningRes = res;
            winningUrl = candidate;
            break;
          }
        } catch {
          // Attempt next format candidate
        }
      }

      if (!winningRes) {
        // File purged or unavailable on legacy origin server
        if (request.method === 'HEAD') {
          return new Response(null, {
            status: 404,
            headers: {
              'Cache-Control': 'public, max-age=3600, s-maxage=3600',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        const fallbackHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ফাইল পাওয়া যায়নি</title>
<style>
body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #334155; }
.card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2.5rem 1.5rem; max-width: 420px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin: 1rem; }
.icon { font-size: 2.75rem; margin-bottom: 0.75rem; }
h2 { font-size: 1.15rem; color: #0f172a; margin: 0 0 0.5rem; font-weight: 700; }
p { font-size: 0.875rem; color: #64748b; line-height: 1.5; margin: 0; }
</style>
</head>
<body>
<div class="card">
  <div class="icon">📁</div>
  <h2>সংযুক্ত নথিটি পাওয়া যায়নি</h2>
  <p>বিদ্যালয়ের মূল আর্কাইভ সার্ভারে এই বিজ্ঞপ্তির সংযুক্ত ফাইলটি সংরক্ষিত নেই (ফাইলটি সার্ভার থেকে অপসারিত হতে পারে)।</p>
</div>
</body>
</html>`;

        return new Response(fallbackHtml, {
          status: 404,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Determine correct Content-Type from resolved candidate
      let contentType = (winningRes.headers.get('content-type') || '').toLowerCase();
      if (winningUrl.toLowerCase().endsWith('.pdf') || contentType.includes('pdf')) {
        contentType = 'application/pdf';
      } else if (winningUrl.toLowerCase().endsWith('.jpg') || winningUrl.toLowerCase().endsWith('.jpeg') || contentType.startsWith('image/')) {
        contentType = 'image/jpeg';
      }

      const body = request.method === 'HEAD' ? null : await winningRes.arrayBuffer();

      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': `public, max-age=${CACHE_TTL.notices}, s-maxage=${CACHE_TTL.notices}`,
          'Access-Control-Allow-Origin': '*',
          'X-Notice-Resolved-Url': winningUrl
        }
      });
    } catch (err) {
      return new Response(`Failed to fetch notice file: ${err.message}`, { status: 502 });
    }
  });
}

