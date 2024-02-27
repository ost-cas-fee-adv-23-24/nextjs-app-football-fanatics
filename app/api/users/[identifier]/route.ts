import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import { MumbleUserService } from '@/services/mumble/MumbleUser';
import { NextRequest, NextResponse } from 'next/server';

const dataSource = new MumbleUserService(config.mumble.host);

export const GET = async (
  request: NextRequest,
  context: any,
): Promise<Response> => {
  const session = await auth();
  const identifier = context.params.identifier;
  try {
    const responseService = await dataSource.getUserByIdentifier({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier: identifier,
    });
    return NextResponse.json(responseService);
  } catch (error) {
    console.log('Error fetching user');
    throw error;
  }
};
