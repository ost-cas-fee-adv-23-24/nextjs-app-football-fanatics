import {
  IPostItem,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';

export const fetchPosts = async ({
  offset,
  limit,
  userIdentifier,
  isLikes = false,
  creators,
}: {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  creators?: string[];
}): Promise<{ posts: IPostItem[]; hasNext: boolean }> => {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (userIdentifier) {
    params.append('userIdentifier', userIdentifier);
    if (isLikes) {
      params.append('likedBy', userIdentifier);
    }
  }

  if (creators && creators.length > 0) {
    params.append('creators', creators.join(','));
  }

  const responseApi = await fetch(`/api/posts?${params.toString()}`, {
    method: 'GET',
  });

  const { data, next } = (await responseApi.json()) as IPostsApiResponse;
  return { posts: data, hasNext: !!next };
};
