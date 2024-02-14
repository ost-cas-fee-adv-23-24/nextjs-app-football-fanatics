import { NextResponse } from 'next/server';
import { IPostItem } from '@/utils/interfaces/mumble.interface';
import tokenManager from '@/services/Token/TokenManager';

export interface IPostsApiInterface {
  count: number;
  data: IPostItem[];
}

export const GET = async (request: Request): Promise<Response> => {
  const accessToken = tokenManager.getToken();
  try {
    const response = await fetch(
      'https://mumble-api-prod-4cxdci3drq-oa.a.run.app/posts?offset=1&limit=30',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = (await response.json()) as IPostsApiInterface;
    return NextResponse.json(data);
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};
