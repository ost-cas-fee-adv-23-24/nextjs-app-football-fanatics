import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods, EEndpointsBackend } from '@/utils/enums/general.enum';
import config from '@/config';
import { generateBoundary } from '@/utils/helpers/generateBoundary';

export interface IUploadAvatarParams {
  token: string;
  image: File;
}

export class MumbleUserService extends MumbleService {
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
