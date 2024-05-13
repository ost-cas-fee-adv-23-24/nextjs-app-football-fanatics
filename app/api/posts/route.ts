import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth/[...nextauth]/auth';
import { IGetPostsParams } from '@/utils/interfaces/mumblePost.interface';
import frontendConfig from '@/config/configFrontend';
import mumblePostService from '@/services/Mumble/MumblePost';

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
    const response = await mumblePostService.getPosts({
      token: session ? session.accessToken : '',
      data: mumbleNextUrl ? { mumbleNextUrl } : params,
      useCache: false,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log('Error fetching posts');
    throw error;
  }
};
