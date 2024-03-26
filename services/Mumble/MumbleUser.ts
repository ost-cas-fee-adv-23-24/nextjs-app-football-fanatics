import config from '@/config';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods, EEndpointsBackend } from '@/utils/enums/general.enum';
import { generateBoundary } from '@/utils/helpers/generateBoundary';
import { IMumbleFollowersApiResponse } from '@/utils/interfaces/mumbleFollowers.interface';

export interface IUploadAvatarParams {
  token: string;
  image: File;
}

export interface IUserMumble {
  id: string;
  username: string;
  avatarUrl: string;
}

export class MumbleUserService extends MumbleService {
  async getUserByIdentifier({
    token,
    identifier,
  }: {
    token: string;
    identifier: string;
  }): Promise<IUserMumble> {
    const responseApi = await this.performRequest({
      method: EApiMethods.GET,
      path: `${EEndpointsBackend.USER}/${identifier}`,
      token,
      message: 'Getting user by identifier',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });

    return responseApi as IUserMumble;
  }

  async getAllFollowers({
    token,
    identifier,
    followers,
    url,
  }: {
    token: string;
    identifier: string;
    followers?: string[];
    url?: string;
  }): Promise<string[]> {
    const followersIntern: string[] = followers ? followers : [];
    const queryParams = new URLSearchParams({ limit: '100', offset: '0' });
    const urlIntern = url
      ? url
      : EEndpointsBackend.USER_FOLLOWERS.replace('*identifier*', identifier) +
        `?${queryParams.toString()}`;
    const responseApi = (await this.performRequest({
      method: EApiMethods.GET,
      path: urlIntern,
      token,
      message: 'Getting user followers',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })) as IMumbleFollowersApiResponse;

    responseApi.data.map((follower) => {
      followersIntern.push(follower.id);
    });

    if (responseApi.next) {
      await this.getAllFollowers({
        token,
        identifier,
        url: responseApi.next,
        followers: followersIntern,
      });
    }

    // rlu cache can be something here. we avoid to make 20 requests (or more) to get all followers
    // and also all the maps and arrays concatenations
    // lruCache.get(`${identifier}-followers`, followersIntern);
    // time to live like 1 hour and clearing if a new follow comes

    return followersIntern;
  }

  async uploadAvatar({ token, image }: IUploadAvatarParams): Promise<string> {
    const formData = new FormData();
    formData.append(config.avatar.fileNameUploader, image);
    try {
      const response = await this.performRequest({
        method: EApiMethods.PUT,
        path: EEndpointsBackend.USER_UPDATE_AVATAR,
        token,
        message: 'Uploading avatar',
        data: formData,
        expectedBack: 'text',
        headers: {
          contentType: `multipart/form-data; boundary=${generateBoundary()}`,
          Authorization: `Bearer ${token}`,
        },
      });

      return response as string;
    } catch (error) {
      throw error;
    }
  }

  async followUserToggle({
    token,
    identifier,
    unfollow = false,
  }: {
    token: string;
    identifier: string;
    unfollow?: boolean;
  }) {
    try {
      const method = unfollow ? EApiMethods.DELETE : EApiMethods.PUT;
      const response = await this.performRequest({
        method: method,
        path: EEndpointsBackend.USER_FOLLOWERS.replace(
          '*identifier*',
          identifier,
        ),
        token,
        expectedBack: 'empty',
        message: 'Following user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        status: response.status,
        message: `User ${identifier} followed`,
      };
    } catch (error) {
      throw error;
    }
  }
}

const mumbleUserServiceInstance = new MumbleUserService(config.mumble.host);
export default mumbleUserServiceInstance;
