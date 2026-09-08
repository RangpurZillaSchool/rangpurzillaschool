import {
  withEdgeCacheAndCoalescing,
  CACHE_TTL
} from '../_client.js';

export async function onRequestGet({ request }) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing target image url parameter.', { status: 400 });
  }

  // Domain security whitelist - strictly student photo origin hosts
  try {
    const parsed = new URL(targetUrl);
    const allowedHosts = ['automation.sib.gov.bd', 'sib.gov.bd'];
    if (!['http:', 'https:'].includes(parsed.protocol) || !allowedHosts.includes(parsed.hostname.toLowerCase())) {
      return new Response('Forbidden image origin.', { status: 403 });
    }
  } catch {
    return new Response('Invalid target image URL.', { status: 400 });
  }

  // 12-Hour Edge Cache + Single-flight coalescing
  return withEdgeCacheAndCoalescing(request, CACHE_TTL.students, async () => {
    try {
      const res = await fetch(targetUrl, {
        signal: AbortSignal.timeout(8000), // 8-second timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Referer': 'http://www.rangpurzillaschool.edu.bd/'
        }
      });

      if (!res.ok) {
        return new Response(`Origin returned ${res.status}`, { status: res.status });
      }

      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      // Ensure origin actually returned an image
      if (!contentType.startsWith('image/')) {
        return new Response('Origin returned non-image content-type.', { status: 502 });
      }

      const body = await res.arrayBuffer();

      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': `public, max-age=${CACHE_TTL.students}, s-maxage=${CACHE_TTL.students}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (err) {
      return new Response(`Failed to fetch image: ${err.message}`, { status: 502 });
    }
  });
}
