import {
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequestGet({ request }) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing target file url parameter.', { status: 400 });
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

  // 12-Hour Edge Cache + Single-flight coalescing
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.notices, async () => {
    try {
      const res = await fetch(targetUrl, {
        signal: AbortSignal.timeout(10000), // 10-second timeout for notice scans/PDFs
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Referer': 'http://www.rangpurzillaschool.edu.bd/'
        }
      });

      if (!res.ok) {
        return new Response(`Origin returned ${res.status}`, { status: res.status });
      }

      let contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (targetUrl.toLowerCase().endsWith('.pdf') && (!contentType || contentType.includes('octet-stream'))) {
        contentType = 'application/pdf';
      } else if (!contentType || contentType === 'text/plain') {
        contentType = 'image/jpeg';
      }

      const body = await res.arrayBuffer();

      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': `public, max-age=${CACHE_TTL.notices}, s-maxage=${CACHE_TTL.notices}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (err) {
      return new Response(`Failed to fetch notice file: ${err.message}`, { status: 502 });
    }
  });
}
