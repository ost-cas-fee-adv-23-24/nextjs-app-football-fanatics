import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';

import {
  IGetPostsParams,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';
import { MumblePostService } from '@/services/Mumble/MumblePost';

export const getMumblePosts = async ({
  offset = 0,
  limit = config.feed.defaultAmount,
  tags,
}: {
  offset?: number;
  limit?: number;
  tags?: string[];
}): Promise<IPostsApiResponse> => {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);

  const options: IGetPostsParams = {
    limit,
    offset,
  };

  if (tags && tags.length > 0) {
    options.tags = tags;
  }

  try {
    return await dataSrc.getPosts({
      token: session ? session.accessToken : '',
      data: options,
    });
  } catch (error) {
    console.log('Error fetching posts');
    throw error;
  }
};
