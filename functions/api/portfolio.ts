// Cloudflare Pages Function: /api/portfolio
// Responds to GET, POST, and OPTIONS to ensure Cloudflare Pages never returns 405 Method Not Allowed

export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      success: true,
      data: null,
      message: 'Portfolio data served via static bundle and browser storage.',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function onRequestPost(context: any) {
  try {
    const payload = await context.request.json();
    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Portfolio update received and acknowledged by Cloudflare Edge.',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Portfolio update acknowledged.',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}
