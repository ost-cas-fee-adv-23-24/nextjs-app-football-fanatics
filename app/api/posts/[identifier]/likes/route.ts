import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import { MumblePostService } from '@/services/mumble/MumblePost';
import { NextRequest, NextResponse } from 'next/server';

const dataSource = new MumblePostService(config.mumble.host);

export const PUT = async (
  request: NextRequest,
  context: any,
): Promise<Response> => {
  const session = await auth();
  const identifier = context.params.identifier;
  try {
    const response = await dataSource.likePost({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier,
    });
    return NextResponse.json(response);
  } catch (error) {
    throw new Error(`Error liking posts ${identifier}`);
  }
};

export const DELETE = async (
  request: NextRequest,
  context: any,
): Promise<Response> => {
  const session = await auth();
  const identifier = context.params.identifier;
  try {
    const response = await dataSource.unlikePost({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier,
    });
    return NextResponse.json(response);
  } catch (error) {
    throw new Error(`Error liking posts ${identifier}`);
  }
};
