import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const refreshMatch = cookie.match(/(?:^|;\s*)pinterest_refresh_token=([^;]+)/);
  const refreshToken = refreshMatch?.[1];
  const clientId = process.env.PINTEREST_CLIENT_ID;
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    return NextResponse.json({ error: 'Pinterest refresh is not configured.' }, { status: 401 });
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  if (!response.ok) return NextResponse.json(data, { status: response.status });

  const result = NextResponse.json({ ok: true });
  result.cookies.set('pinterest_access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  });
  if (data.refresh_token) {
    result.cookies.set('pinterest_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 60,
      path: '/',
    });
  }
  return result;
}
