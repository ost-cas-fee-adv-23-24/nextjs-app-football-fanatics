'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService from '@/services/Mumble/MumblePost';
import { revalidatePath } from 'next/cache';
import {
  IPostItem,
  IPostReplyItemBase,
  IServerActionResponse,
} from '@/utils/interfaces/mumblePost.interface';

export interface ICreatePostReplyArgs {
  formData: FormData;
  identifier: string;
}

export const createPostReply = async ({
  formData,
  identifier,
}: ICreatePostReplyArgs): Promise<
  IServerActionResponse<IPostReplyItemBase>
> => {
  const session = await auth();

  if (!session) throw new Error('No session found');
  try {
    const revalidationsPath = formData.get('revalidatePath') as string;
    formData.delete('revalidatePath');

    const responseService = await mumblePostService.createPostReply({
      token: session ? session.accessToken : '',
      formData,
      identifier,
    });
    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }
    return { status: 'success', data: responseService };
  } catch (error) {
    return { status: 'error', message: (error as Error).message };
  }
};
