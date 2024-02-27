import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';

import { IPostsApiResponse } from '@/utils/interfaces/mumblePost.interface';
import { MumblePostService } from '@/services/Mumble/MumblePost';

export const getMumblePosts = async ({
  offset = 0,
  limit = config.feed.defaultAmount,
}: {
  offset?: number;
  limit?: number;
}): Promise<IPostsApiResponse> => {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);

  try {
    return await dataSrc.getPosts({
      token: session ? session.accessToken : '',
      data: {
        limit,
        offset,
      },
    });
  } catch (error) {
    console.log('Error fetching posts');
    throw error;
  }
};
