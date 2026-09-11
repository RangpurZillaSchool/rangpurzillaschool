// Cloudflare Pages Functions client helper for legacy ASP.NET Web Forms integration
export const BASE_URL = 'http://www.rangpurzillaschool.edu.bd/';

// 12-Hour Default Cache Policy (43200 seconds)
export const DEFAULT_CACHE_TTL = 43200; // 12 hours

export const CACHE_TTL = {
  default: DEFAULT_CACHE_TTL,
  students: DEFAULT_CACHE_TTL,
  notices: DEFAULT_CACHE_TTL,
  noticeDetail: DEFAULT_CACHE_TTL,
  teachers: DEFAULT_CACHE_TTL,
  news: DEFAULT_CACHE_TTL,
  downloads: DEFAULT_CACHE_TTL,
  studentOptions: DEFAULT_CACHE_TTL,
  payments: 0 // Instant / Real-time live (no-cache)
};

let cachedSession = {
  cookie: '',
  expiresAt: 0
};

export async function getSessionCookie() {
  const now = Date.now();
  if (cachedSession.cookie && cachedSession.expiresAt > now) {
    return cachedSession.cookie;
  }

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      const match = setCookie.match(/ASP\.NET_SessionId=[^;]+/);
      if (match) {
        cachedSession.cookie = match[0];
        cachedSession.expiresAt = now + 10 * 60 * 1000; // 10 minutes
        return cachedSession.cookie;
      }
    }
  } catch (err) {
    console.error('Failed to acquire ASP.NET session cookie:', err);
  }

  return cachedSession.cookie || '';
}

export function extractHiddenFields(html) {
  const vs = html.match(/id="__VIEWSTATE"\s+value="([^"]*)"/);
  const vsg = html.match(/id="__VIEWSTATEGENERATOR"\s+value="([^"]*)"/);
  const ev = html.match(/id="__EVENTVALIDATION"\s+value="([^"]*)"/);

  return {
    viewState: vs ? vs[1] : '',
    viewStateGenerator: vsg ? vsg[1] : '',
    eventValidation: ev ? ev[1] : ''
  };
}

export function jsonResponse(data, status = 200, maxAge = DEFAULT_CACHE_TTL) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`
    }
  });
}

export function errorResponse(message, status = 500) {
  return new Response(JSON.stringify({ error: true, message }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export function legacyUnavailableResponse(message = 'The requested information is temporarily unavailable.') {
  return new Response(JSON.stringify({
    error: true,
    code: 'LEGACY_UNAVAILABLE',
    message
  }), {
    status: 503,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

// Single-flight in-flight promise map for cache stampede protection
const inFlightRequests = new Map();

/**
 * Normalizes URL query parameters alphabetically for consistent cache keys
 */
export function normalizeUrlKey(urlString) {
  try {
    const parsed = new URL(urlString);
    const params = new URLSearchParams(parsed.searchParams);
    const sorted = [...params.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const cleanParams = new URLSearchParams();
    for (const [k, v] of sorted) {
      cleanParams.set(k.toLowerCase().trim(), v.trim());
    }
    const search = cleanParams.toString();
    return `${parsed.origin}${parsed.pathname}${search ? '?' + search : ''}`;
  } catch (e) {
    return urlString;
  }
}

/**
 * Executes a request with Cloudflare Edge Cache (caches.default) + Single-flight coalescing
 */
export async function withEdgeCacheAndCoalescing(request, ttl, fetcher, normalizeFn = normalizeUrlKey) {
  const normalizedKey = normalizeFn(request.url);
  const cacheKeyRequest = new Request(normalizedKey, {
    method: 'GET',
    headers: request.headers
  });

  // Step 1: Check Cloudflare Edge Cache
  let cache = null;
  try {
    if (typeof caches !== 'undefined' && caches.default) {
      cache = caches.default;
      const cachedResponse = await cache.match(cacheKeyRequest);
      if (cachedResponse) {
        const headers = new Headers(cachedResponse.headers);
        headers.set('X-Cache', 'HIT');
        headers.set('X-Cache-TTL', `${ttl}s`);
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers
        });
      }
    }
  } catch (cacheErr) {
    console.warn('Cache match error:', cacheErr);
  }

  // Step 2: Cache stampede protection (Single-flight coalescing)
  let flightPromise = inFlightRequests.get(normalizedKey);
  if (!flightPromise) {
    flightPromise = (async () => {
      try {
        const response = await fetcher();
        return response;
      } finally {
        inFlightRequests.delete(normalizedKey);
      }
    })();
    inFlightRequests.set(normalizedKey, flightPromise);
  }

  const upstreamResponse = await flightPromise;

  // Step 3: If response was successful (200), store in Edge Cache for 12 hours
  if (upstreamResponse.status === 200 && cache) {
    try {
      const responseToCache = upstreamResponse.clone();
      const cacheHeaders = new Headers(responseToCache.headers);
      cacheHeaders.set('Cache-Control', `public, max-age=${ttl}, s-maxage=${ttl}`);
      const finalToStore = new Response(responseToCache.body, {
        status: responseToCache.status,
        headers: cacheHeaders
      });
      cache.put(cacheKeyRequest, finalToStore).catch(err => {
        console.warn('Cache put error:', err);
      });
    } catch (putErr) {
      console.warn('Failed to clone/put to edge cache:', putErr);
    }
  }

  const headers = new Headers(upstreamResponse.headers);
  headers.set('X-Cache', 'MISS');
  headers.set('X-Cache-TTL', `${ttl}s`);
  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers
  });
}
