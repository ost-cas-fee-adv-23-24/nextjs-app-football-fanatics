import { NextResponse } from 'next/server';
import tokenManager from '@/services/Token/TokenManager';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';

const dataSource = new MumblePostService(config.mumble.host);
export const GET = async (request: Request): Promise<Response> => {
  const accessToken = tokenManager.getToken();
  try {
    const response = await dataSource.getPosts({
      token: accessToken,
      data: {
        limit: 30,
        offset: 0,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};
