import { NextResponse, type NextRequest } from 'next/server';
import { proxy } from './src/proxy';
import { rateLimitFromRequest } from './src/shared/lib/rate-limit';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api/auth')) {
    const rl = await rateLimitFromRequest({
      reqHeaders: req.headers,
      routeKey: 'api-auth',
      limit: 30,
      windowMs: 60_000,
    });

    if (!rl.ok) {
      const res = NextResponse.json(
        { error: 'Too many requests', resetMs: rl.resetMs },
        { status: 429 },
      );

      res.headers.set('Retry-After', String(Math.ceil(rl.resetMs / 1000)));
      res.headers.set('X-RateLimit-Remaining', String(rl.remaining));
      return res;
    }
  }

  return proxy(req);
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/:path*'],
};
