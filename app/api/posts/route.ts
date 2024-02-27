import config from '@/config';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth/[...nextauth]/auth';

const dataSource = new MumblePostService(config.mumble.host);
export const GET = async (request: NextRequest): Promise<Response> => {
  const session = await auth();
  try {
    const response = await dataSource.getPosts({
      // @ts-ignore
      token: session ? session.accessToken : '',
      data: {
        limit: config.feed.defaultAmount,
        offset: 0,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log('Error fetching posts');
    throw error;
  }
};

export const POST = async (request: NextRequest): Promise<Response> => {
  const session = await auth();

  try {
    if (!session) throw new Error('Unauthorized');
    const formData = await request.formData();
    // @ts-ignore
    const token = session ? session.accessToken : '';
    const response = await dataSource.createPost({
      token,
      formData,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log('Error while creating post');
    throw error;
  }
};
