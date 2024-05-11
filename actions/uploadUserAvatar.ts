'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IServerActionResponse } from '@/utils/interfaces/mumblePost.interface';
import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import config from '@/config';
import { EResponseMumbleStatus } from '@/utils/enums/general.enum';

export const uploadUserAvatar = async (
  formData: FormData,
): Promise<IServerActionResponse<{ imageSource: string }>> => {
  const session = await auth();
  const image = formData.get(config.avatar.fileNameUploader) as File;

  try {
    const response = await mumbleUserServiceInstance.uploadAvatar({
      // @ts-ignore
      token: session ? session.accessToken : '',
      image,
    });

    return {
      status: EResponseMumbleStatus.SUCCESS,
      data: { imageSource: response },
    };
  } catch (error) {
    return {
      status: EResponseMumbleStatus.ERROR,
      message: (error as Error).message,
    };
  }
};
