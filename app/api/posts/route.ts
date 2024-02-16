import { NextResponse } from 'next/server';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import { auth } from '../auth/[...nextauth]/auth';
import { NextApiRequest } from 'next';

const dataSource = new MumblePostService(config.mumble.host);
export const GET = async (request: NextApiRequest): Promise<Response> => {
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
    throw new Error('Error fetching posts');
  }
};
