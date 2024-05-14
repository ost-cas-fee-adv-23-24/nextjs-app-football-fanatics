import {
  EApiMethods,
  EEndpointsBackend,
  EResponseMumbleStatus,
} from '@/utils/enums/general.enum';
import { generateBoundary } from '@/utils/helpers/generateBoundary';
import {
  ICreatePost,
  IGetPostsParams,
  IPostData,
  IPostItem,
  IPostItemBase,
  IPostLike,
  IPostReply,
  IPostReplyItemBase,
  IPostsApiResponse,
  IRemoveImagePost,
  IUpdateImagePost,
  IUpdatePost,
} from '@/utils/interfaces/mumblePost.interface';
import { decodeTime } from 'ulidx';
import { MumbleService } from '@/services/Mumble/index';
import config from '@/config';

export interface IPost {
  postData: IPostItem;
  repliesData: IPostData | null;
}

export interface IUpdatePostTextMumble {
  status: EResponseMumbleStatus;
  message?: string;
}

export class MumblePostService extends MumbleService {
  public async deletePost({
    token,
    identifier,
  }: {
    identifier: string;
    token: string;
  }) {
    await this.performRequest({
      method: EApiMethods.DELETE,
      path: `${EEndpointsBackend.POSTS}/${identifier}`,
      token,
      message: 'Deleting post',
      expectedBack: 'empty',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public async getPostById({
    includeReplies,
    identifier,
    token,
  }: {
    identifier: string;
    token: string;
    includeReplies: boolean;
  }): Promise<IPost> {
    const responseApi = (await this.performRequest({
      method: EApiMethods.GET,
      path: `${EEndpointsBackend.POSTS}/${identifier}`,
      token,
      forceNoCache: true,
      message: 'Getting post by identifier',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      expectedBack: 'json',
    })) as IPostItemBase;

    let repliesData: IPostData | null = null;
    if (includeReplies) {
      repliesData = await this.getPostReplies({
        identifier,
        token,
        data: {
          limit: 100,
          offset: 0,
        },
      });
    }

    return {
      postData: {
        ...responseApi,
        createdTimestamp: decodeTime(responseApi.id),
      },
      repliesData,
    };
  }

  public async getPostReplies({
    identifier,
    token,
    data,
  }: {
    identifier: string;
    token: string;
    data: any;
  }): Promise<IPostData> {
    const params = this.getParams(data);
    const responseMumbleApi = await this.performRequest({
      method: EApiMethods.GET,
      path: `${EEndpointsBackend.POSTS}/${identifier}/replies`,
      token,
      message: `Fetching replies of post ${identifier}`,
      expectedBack: 'json',
    });

    return {
      ...responseMumbleApi,
      data: responseMumbleApi.data.map(this.addCreatedTimestamp),
    };
  }

  public async removePostImage({ token, postIdentifier }: IRemoveImagePost) {
    try {
      // response is empty
      await this.performRequest({
        method: EApiMethods.DELETE,
        path: `${EEndpointsBackend.POSTS}/${postIdentifier}/media`,
        token,
        message: 'Updating post',
        expectedBack: 'text',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
    } catch (error) {
      return {
        status: EResponseMumbleStatus.ERROR,
        message: (error as Error).message,
      };
    }

    return { status: EResponseMumbleStatus.SUCCESS };
  }

  public async updatePostText({
    token,
    text,
    postIdentifier,
  }: IUpdatePost): Promise<IUpdatePostTextMumble> {
    try {
      // response is empty
      await this.performRequest({
        method: EApiMethods.PATCH,
        path: `${EEndpointsBackend.POSTS}/${postIdentifier}`,
        token,
        message: 'Updating post',
        expectedBack: 'text',
        data: JSON.stringify({ text }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
    } catch (error) {
      return {
        status: EResponseMumbleStatus.ERROR,
        message: (error as Error).message,
      };
    }

    return { status: EResponseMumbleStatus.SUCCESS };
  }

  public async updatePostImage({
    token,
    formData,
    postIdentifier,
  }: IUpdateImagePost): Promise<string> {
    const responseApi = await this.performRequest({
      method: EApiMethods.PUT,
      path: `${EEndpointsBackend.POSTS}/${postIdentifier}/media`,
      token,
      data: formData,
      expectedBack: 'text',
      message: 'Updating image post',
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: `multipart/form-data; boundary=${generateBoundary()}`,
        accept: 'text/plain',
      },
    });

    return responseApi as string;
  }

  public async createPost({ token, formData }: ICreatePost) {
    const responseApi = await this.performRequest({
      method: EApiMethods.POST,
      path: EEndpointsBackend.POSTS,
      token,
      message: 'Creating post',
      expectedBack: 'json',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: `multipart/form-data; boundary=${generateBoundary()}`,
        accept: 'application/json',
      },
    });
    return responseApi as IPostItem;
  }

  public async createPostReply({
    token,
    formData,
    identifier,
  }: {
    token: string;
    formData: FormData;
    identifier: string;
  }): Promise<any> {
    const responseApi = await this.performRequest({
      method: EApiMethods.POST,
      path: EEndpointsBackend.REPLY_POST.replace('*identifier*', identifier),
      token,
      message: 'Creating post Reply',
      expectedBack: 'json', // do we need this?
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: `multipart/form-data; boundary=${generateBoundary()}`,
        accept: 'application/json',
      },
    });
    return responseApi as IPostReplyItemBase;
  }

  public async likePost({ token, identifier }: IPostLike) {
    const responseApi = await this.performRequest({
      method: EApiMethods.PUT,
      path: EEndpointsBackend.LIKE_POST.replace('*identifier*', identifier),
      token,
      message: 'Liking post',
      expectedBack: 'empty',
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: `multipart/form-data; boundary=${generateBoundary()}`,
      },
    });
    return responseApi; // empty only a 204 success no content
  }
  async unlikePost({ token, identifier }: IPostLike) {
    const responseApi = await this.performRequest({
      method: EApiMethods.DELETE,
      path: EEndpointsBackend.LIKE_POST.replace('*identifier*', identifier),
      token,
      message: 'Unliking post',
      expectedBack: 'empty',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseApi;
  }

  public async getPosts({
    token,
    data,
    useCache = false,
  }: {
    token: string;
    data: IGetPostsParams;
    useCache?: boolean;
  }): Promise<IPostsApiResponse> {
    let path: string;
    if (data.mumbleNextUrl) {
      path = data.mumbleNextUrl;
    } else {
      const params = this.getParams(data);
      path = `${EEndpointsBackend.POSTS}?${params}`;
    }

    const responseMumbleApi = await this.performRequest({
      method: EApiMethods.GET,
      path,
      ttl: useCache ? config.cacheRules.postsFeedData : undefined,
      token,
      message: 'Fetching posts From Mumble API',
    });

    responseMumbleApi.data = responseMumbleApi.data.map(
      this.addCreatedTimestamp,
    );

    return responseMumbleApi as IPostsApiResponse;
  }
  private getParams(data: IGetPostsParams): string {
    const params = new URLSearchParams();
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        params.append(key, value.toString());
      } else if (Array.isArray(value)) {
        for (const single of value) {
          params.append(key, single);
        }
      }
    });
    return params.toString();
  }
  private addCreatedTimestamp(post: IPostItemBase | IPostReply): IPostItem {
    return {
      ...post,
      createdTimestamp: decodeTime(post.id),
    };
  }
}

const mumblePostService = new MumblePostService(config.mumble.host);
export default mumblePostService;
