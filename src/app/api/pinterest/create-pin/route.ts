import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const tokenMatch = cookie.match(/(?:^|;\s*)pinterest_access_token=([^;]+)/);
  const accessToken = tokenMatch?.[1];

  if (!accessToken) {
    return NextResponse.json({ error: 'Pinterest is not connected.' }, { status: 401 });
  }

  let body: { board_id?: string; title?: string; description?: string; link?: string; image_url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.board_id || !body.image_url) {
    return NextResponse.json({ error: 'board_id and image_url are required.' }, { status: 400 });
  }

  const pinterestResponse = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board_id: body.board_id,
      title: body.title || undefined,
      description: body.description || undefined,
      link: body.link || undefined,
      media_source: {
        source_type: 'image_url',
        url: body.image_url,
      },
    }),
  });

  const data = await pinterestResponse.json();
  return NextResponse.json(data, { status: pinterestResponse.status });
}
