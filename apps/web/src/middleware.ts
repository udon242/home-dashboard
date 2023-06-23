import { NextResponse } from 'next/server';

import { requestValidator } from '@/utils/auth';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    requestValidator(request);
    return NextResponse.next();
  } catch (_) {
    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
}

export const config = {
  matcher: '/',
};
