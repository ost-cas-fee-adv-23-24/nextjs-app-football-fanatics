import { MumbleService } from '@/services/Mumble/index';
import { EApiMethods } from '@/utils/enums/general.enum';
import config from '@/config';

export interface IUploadAvatarParams {
  token: string;
  image: File;
}

//test boundary from form-dara package
const generateBoundary = function () {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  let boundary = '--------------------------';
  for (let i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  return boundary;
};

export class MumbleUserService extends MumbleService {
  async uploadAvatar({ token, image }: IUploadAvatarParams): Promise<string> {
    const formData = new FormData();
    formData.append(config.avatar.fileNameUploader, image);
    try {
      const response = await this.performRequest({
        method: EApiMethods.PUT,
        path: 'users/avatar',
        token,
        message: 'Uploading avatar',
        data: formData,
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
