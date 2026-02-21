/**
 * GoldRisk AI — Route guard (Phase 1: auth redirect)
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }
  // Phase 1: add auth check; for now allow all
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|fonts).*)'],
};
