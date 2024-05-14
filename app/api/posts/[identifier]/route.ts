import { auth } from '@/app/api/auth/[...nextauth]/auth';

import mumblePostService from '@/services/Mumble/MumblePost';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  context: any,
): Promise<Response> => {
  const searchParams = request.nextUrl.searchParams;
  const identifier = context.params.identifier;
  const includeReplies = searchParams.get('includeReplies') === 'true';

  const session = await auth();
  try {
    const response = await mumblePostService.getPostById({
      token: session ? session.accessToken : '',
      identifier,
      includeReplies,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log('Error fetching posts');
    throw error;
  }
};
