import { NextResponse } from 'next/server';

const SCOPES = ['boards:read', 'boards:write', 'pins:read', 'pins:write'];

export async function GET(request: Request) {
  const clientId = process.env.PINTEREST_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const redirectUri = `${baseUrl}/api/pinterest/callback`;

  if (!clientId) {
    return NextResponse.json({ error: 'Pinterest is not configured yet.' }, { status: 503 });
  }

  const state = crypto.randomUUID();
  const url = new URL('https://www.pinterest.com/oauth/');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', SCOPES.join(','));
  url.searchParams.set('state', state);

  const response = NextResponse.redirect(url);
  response.cookies.set('pinterest_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  return response;
}
