import {
  IPostItem,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';
import { IFetchPostsOptions } from '@/utils/interfaces/general';

export const fetchPostsFrontend = async ({
  offset,
  limit,
  userIdentifier,
  isLikes = false,
  newerThan,
}: IFetchPostsOptions): Promise<{ posts: IPostItem[]; hasNext: boolean }> => {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (newerThan) {
    params.append('newerThan', newerThan);
  }
  if (userIdentifier) {
    params.append('userIdentifier', userIdentifier);
    if (isLikes) {
      params.append('likedBy', userIdentifier);
    }
  }

  const responseApi = await fetch(`/api/posts?${params.toString()}`, {
    method: 'GET',
  });

  const { data, next } = (await responseApi.json()) as IPostsApiResponse;
  return { posts: data, hasNext: !!next };
};
