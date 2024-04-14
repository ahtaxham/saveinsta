import type { APIRoute } from 'astro';
import { key } from 'key';
export const prerender = false;
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const username = params.get('username');
    if (!username) {
      return new Response(JSON.stringify({ error: 'username is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

    const userOptiom = {
      method: 'GET',
      url: `https://instagram-bulk-scraper-latest.p.rapidapi.com/webget_user_id/${username}`,
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
      },
    };
    const storyOption = {
      method: 'GET',
      url: 'https://instagram-bulk-scraper-latest.p.rapidapi.com/download_story/' + username,
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
      },
    };
    const userDataResponse = await fetch(userOptiom.url, userOptiom);
    const storyDataResponse = await fetch(storyOption.url, storyOption);

    const userData = await userDataResponse.json();
    const storyData = await storyDataResponse.json();

    return new Response(
      JSON.stringify({
        userData,
        storyData,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
