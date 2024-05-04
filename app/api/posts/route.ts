import config from '@/config';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth/[...nextauth]/auth';
import { IGetPostsParams } from '@/utils/interfaces/mumblePost.interface';
import frontendConfig from '@/config/configFrontend';

const dataSource = new MumblePostService(config.mumble.host);

export const GET = async (request: NextRequest): Promise<Response> => {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');
  const newerThan = searchParams.get('newerThan');
  const userIdentifier = searchParams.get('userIdentifier');
  const creators = searchParams.get('creators');
  const likedBy = searchParams.get('likedBy');
  const mumbleNextUrl = searchParams.get('mumbleNextUrl');

  // if mumbleNextUrl is set, we don't need to pass anything else

  const params: IGetPostsParams = {
    limit: limit ? parseInt(limit, 10) : frontendConfig.feed.defaultAmount,
    offset: offset ? parseInt(offset, 10) : 0,
  };

  if (newerThan) {
    params.newerThan = newerThan;
  }

  if (userIdentifier) {
    if (likedBy) {
      params.likedBy = [userIdentifier];
    } else {
      params.creators = [userIdentifier];
    }
  }

  if (creators) {
    params.creators = creators.split(',');
  }

  const session = await auth();
  try {
    const response = await dataSource.getPosts({
      token: session ? session.accessToken : '',
      data: mumbleNextUrl ? { mumbleNextUrl } : params,
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
