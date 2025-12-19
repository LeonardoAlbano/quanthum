import { proxy } from './src/proxy';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  return proxy(req);
}

export const config = {
  matcher: ['/dashboard/:path*', '/(app)/:path*'],
};
