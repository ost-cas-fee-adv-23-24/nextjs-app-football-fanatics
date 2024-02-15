import { decodeTime } from 'ulidx';
import {
  IGetPostsParams,
  IPostItem,
  IPostItemBase,
  IPostsApiResponse,
} from '@/services/Post/post.interface';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods } from '@/utils/enums/general.enum';

export class MumblePostService extends MumbleService {
  async getPosts({
    token,
    data,
  }: {
    token: string;
    data: IGetPostsParams;
  }): Promise<IPostsApiResponse> {
    const params = this.getParams(data);
    const responseMumbleApi = await this.performRequest({
      method: EApiMethods.GET,
      path: `posts?${params}`,
      token,
      message: 'Fetching posts From Mumble API',
    });

    responseMumbleApi.data = responseMumbleApi.data.map(
      this.addCreatedTimestamp,
    );

    return responseMumbleApi as IPostsApiResponse;
  }
  getParams(data: IGetPostsParams): string {
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
  addCreatedTimestamp(post: IPostItemBase): IPostItem {
    return {
      ...post,
      createdTimestamp: decodeTime(post.id),
    };
  }
}
