import envVariables from '@/config/env';
import { ApiResponseType } from '@/types';
import { decodeTime } from 'ulidx';
import {
  IGetPostsParams,
  IPostItem,
  IPostItemBase,
  IPostsApiResponse,
} from '@/services/Post/post.interface';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods } from '@/utils/enums/general.enum';

class MumblePostService extends MumbleService {
  async getPosts({
    token,
    data,
  }: {
    token: string;
    data: IGetPostsParams;
  }): Promise<IPostsApiResponse> {
    const responseMumbleApi = await this.performRequest({
      method: EApiMethods.GET,
      path: `${this.baseUrl}/posts?`,
      token,
      data,
      message: 'Fetching posts From Mumble API',
    });

    console.log(responseMumbleApi);
    return responseMumbleApi as IPostsApiResponse;
  }
}

export async function getPosts(
  params?: IGetPostsParams,
): Promise<IPostsApiResponse> {
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
