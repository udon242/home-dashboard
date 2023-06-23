import { NextResponse } from 'next/server';

import { authValidator } from '@/utils/auth';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  try {
    authValidator(basicAuth);
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
