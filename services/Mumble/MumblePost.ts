import { decodeTime } from 'ulidx';
import {
  IGetPostsParams,
  IPostItem,
  IPostItemBase,
  IPostLike,
  IPostsApiResponse,
} from '@/services/Post/post.interface';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods, EEndpointsBackend } from '@/utils/enums/general.enum';

export class MumblePostService extends MumbleService {
  public async likePost({ token, identifier }: IPostLike) {
    const responseApi = await this.performRequest({
      method: EApiMethods.PUT,
      path: EEndpointsBackend.LIKE_POST.replace('*identifier*', identifier),
      token,
      message: 'Liking post',
      expectedBack: 'empty',
      headers: {
        Authorization: `Bearer ${token}`,
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
  private addCreatedTimestamp(post: IPostItemBase): IPostItem {
    return {
      ...post,
      createdTimestamp: decodeTime(post.id),
    };
  }
}
