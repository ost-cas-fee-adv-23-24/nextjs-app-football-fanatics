import { decodeTime } from 'ulidx';
import {
  ICreatePost,
  IGetPostsParams,
  IPostData,
  IPostItem,
  IPostItemBase,
  IPostLike,
  IPostReply,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods, EEndpointsBackend } from '@/utils/enums/general.enum';
import { generateBoundary } from '@/utils/helpers/generateBoundary';

export interface IPost {
  postData: IPostItem;
  repliesData: IPostData | null;
}

export class MumblePostService extends MumbleService {
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
    return responseApi as any;
  }

  public async createPost({
    token,
    formData,
  }: ICreatePost): Promise<IPostItem> {
    const responseApi = await this.performRequest({
      method: EApiMethods.POST,
      path: EEndpointsBackend.POSTS,
      token,
      message: 'Creating post',
      expectedBack: 'json', // do we need this?
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: `multipart/form-data; boundary=${generateBoundary()}`,
        accept: 'application/json',
      },
    });
    return responseApi as IPostItem;
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
    return responseApi;
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
  }: {
    token: string;
    data: IGetPostsParams;
  }): Promise<IPostsApiResponse> {
    const params = this.getParams(data);
    const responseMumbleApi = await this.performRequest({
      method: EApiMethods.GET,
      path: `${EEndpointsBackend.POSTS}?${params}`,
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
        for (const single in value) {
          value.forEach((val) => {
            params.append(key, single);
          });
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
