import type { APIRoute } from 'astro';
import { key } from 'key';
export const prerender = false;
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const count = params.get('count');

    const id = params.get('id');
    const end_cursor = params.get('end_cursor');
    if (!id) {
      return new Response(JSON.stringify({ error: 'id is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
    console.log('end_cursor', end_cursor);

    const userOptiom = {
      method: 'GET',
      url: `https://instagram-bulk-scraper-latest.p.rapidapi.com/webuser_posts/${id}?end_cursor=${end_cursor}&count=${count}`,
      headers: {
        'X-RapidAPI-Key':   key,
        'X-RapidAPI-Host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
      },
      params: {
        count: '30',
        nocors: 'true',
        end_cursor: end_cursor || '',
      },
    };

    const userDataResponse = await fetch(userOptiom.url, {
      headers: userOptiom.headers,
    });

    const userData = await userDataResponse.json();

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
