import { NextRequest, NextResponse } from 'next/server';

import { getMeter } from '@/app/service';
import { requestValidator } from '@/utils/auth';

export async function GET(request: NextRequest) {
  requestValidator(request);
  return NextResponse.json(await getMeter());
}
