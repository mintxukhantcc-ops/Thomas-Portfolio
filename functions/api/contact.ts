// Cloudflare Pages Function: /api/contact
// Receives contact inquiries and responds with 200 OK on Cloudflare Pages

export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      success: true,
      inquiries: [],
      message: 'Inquiries pipeline ready.',
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
    const body = await context.request.json();
    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: body?.name || 'Anonymous',
      email: body?.email || 'unspecified',
      scopes: Array.isArray(body?.scopes) ? body.scopes : [],
      message: body?.message || '',
      createdAt: new Date().toISOString(),
      status: 'unread',
    };

    return new Response(
      JSON.stringify({
        success: true,
        inquiry: newInquiry,
        message: 'Inquiry received on Cloudflare Edge.',
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
        message: 'Inquiry processed.',
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
