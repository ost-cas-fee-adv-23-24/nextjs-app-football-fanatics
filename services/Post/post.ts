import envVariables from '@/config/env';
import { ApiResponseType, Post } from '@/types';
import { decodeTime } from 'ulidx';
import {
  IPostItem,
  IPostItemBase,
  IPostsApiResponse,
  TPostParams,
} from '@/services/Post/post.interface';

export async function getPosts(
  params?: TPostParams,
): Promise<IPostsApiResponse> {
  console.log(params);

  const {
    limit,
    offset,
    newerThanPostId,
    olderThanPostId,
    text,
    likedBy,
    creators,
    tags,
  } = params || {};

  const urlParams = new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanPostId || '',
    olderThan: olderThanPostId || '',
    text: text || '',
  });

  if (creators) {
    creators.map((creator) => urlParams.append('creators', creator));
  }

  if (likedBy) {
    likedBy.map((likedBy) => urlParams.append('likedBy', likedBy));
  }

  if (tags) {
    tags.map((tag) => urlParams.append('tags', tag));
  }

  const res = await fetch(
    `${envVariables.MUMBLE_API_URL}/posts?${urlParams.toString()}`,
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  if (!res.ok) throw new Error('Error');

  const { count, data, next, previous } = (await res.json()) as ApiResponseType<
    IPostItem[]
  >;

  const posts = data.map(addCreatedTimestamp);

  return {
    count,
    data: posts,
    next,
    previous,
  };
}

function addCreatedTimestamp(post: IPostItemBase): IPostItem {
  return {
    ...post,
    createdTimestamp: decodeTime(post.id),
  };
}
