import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';

import {
  IGetPostsParams,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';
import mumblePostService from '@/services/Mumble/MumblePost';

export const getMumblePosts = async ({
  offset = 0,
  limit = config.feed.defaultAmount,
  tags,
  creators,
  likedBy,
}: {
  offset?: number;
  limit?: number;
  tags?: string[];
  creators?: string[];
  likedBy?: string[];
}): Promise<IPostsApiResponse> => {
  const session = await auth();
  const dataSrc = mumblePostService;

  const options: IGetPostsParams = {
    limit,
    offset,
  };

  if (tags && tags.length > 0) {
    options.tags = tags;
  }

  if (creators && creators.length > 0) {
    options.creators = creators;
  }

  if (likedBy && likedBy.length > 0) {
    options.likedBy = likedBy;
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
