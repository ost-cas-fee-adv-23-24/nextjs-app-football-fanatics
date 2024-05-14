'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService from '@/services/Mumble/MumblePost';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import {
  IPostItem,
  IServerActionResponse,
} from '@/utils/interfaces/mumblePost.interface';
import { EResponseMumbleStatus } from '@/utils/enums/general.enum';

export const createPost = async (
  formData: FormData,
): Promise<IServerActionResponse<IPostItem>> => {
  const session = await auth();

  if (!session) {
    console.log('No session found: redirecting to login page');
    redirect('/login', RedirectType.push);
  }

  try {
    const revalidationsPath = formData.get('revalidationsPath') as string;
    formData.delete('revalidationsPath');
    const responseService = await mumblePostService.createPost({
      token: session.accessToken,
      formData,
    });
    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }
    return { status: EResponseMumbleStatus.SUCCESS, data: responseService };
  } catch (error) {
    return {
      status: EResponseMumbleStatus.ERROR,
      message: (error as Error).message,
    };
  }
};
