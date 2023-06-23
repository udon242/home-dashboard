import { NextRequest } from 'next/server';

class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized error';
  }
}

export function requestValidator(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get('token');
  const queryBasic = queryToken ? `Basic ${queryToken}` : null;
  const basicAuth = request.headers.get('authorization') || queryBasic;
  authValidator(basicAuth);
}

function authValidator(basicAuth: string | null) {
  if (!basicAuth) {
    throw new UnauthorizedError();
  }

  const auth = basicAuth.split(' ')[1];
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');
  if (
    !(user === process.env.ADMIN_USER_NAME) ||
    !(pwd === process.env.ADMIN_USER_PASSWORD)
  ) {
    throw new UnauthorizedError();
  }
}
