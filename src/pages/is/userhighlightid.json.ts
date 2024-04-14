import type { APIRoute } from 'astro';
import { key } from 'key';
export const prerender = false;
export const GET: APIRoute = async ({ request }) => {
  try {
    let url = new URL(request.url);
    let params = url.searchParams;
    const id = params.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'id is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

    const userOptiom = {
      method: 'GET',
      url: `https://instagram-bulk-scraper-latest.p.rapidapi.com/download_highlights/${id}`,
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
      },
    };

    const userDataResponse = await fetch(userOptiom.url, userOptiom);

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
