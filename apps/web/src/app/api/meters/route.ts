import { NextResponse } from 'next/server';

import { getMeter } from '@/app/service';
import { authValidator } from '@/utils/auth';

export async function GET(request: Request) {
  authValidator(request.headers.get('authorization'));
  return NextResponse.json(await getMeter());
}
