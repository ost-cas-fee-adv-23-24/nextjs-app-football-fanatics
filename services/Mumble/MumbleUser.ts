import config from '@/config';
import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods, EEndpointsBackend } from '@/utils/enums/general.enum';
import { generateBoundary } from '@/utils/helpers/generateBoundary';

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
}
