import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const expectedState = request.headers.get('cookie')?.match(/(?:^|;\s*)pinterest_oauth_state=([^;]+)/)?.[1];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const redirectUri = `${baseUrl}/api/pinterest/callback`;

  if (error) {
    return NextResponse.redirect(`${baseUrl}/?pinterest=denied`);
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: 'Invalid Pinterest OAuth state or missing authorization code.' }, { status: 400 });
  }

  const clientId = process.env.PINTEREST_CLIENT_ID;
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Pinterest credentials are not configured.' }, { status: 503 });
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenResponse = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const details = await tokenResponse.text();
    console.error('Pinterest token exchange failed:', details);
    return NextResponse.json({ error: 'Pinterest authorization failed.' }, { status: 502 });
  }

  const token = await tokenResponse.json();
  const response = NextResponse.redirect(`${baseUrl}/?pinterest=connected`);
  response.cookies.set('pinterest_access_token', token.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  });
  if (token.refresh_token) {
    response.cookies.set('pinterest_refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 60,
      path: '/',
    });
  }
  response.cookies.delete('pinterest_oauth_state');
  return response;
}
