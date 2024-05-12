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

export interface IUpdatePostArgs {
  text: string;
  identifier: string;
  revalidationsPath?: string;
}

export interface IUpdatePostImageArgs {
  identifier: string;
  formData: FormData;
  revalidationsPath?: string;
}

export const updatePostText = async ({
  text,
  identifier,
  revalidationsPath,
}: IUpdatePostArgs): Promise<IServerActionResponse<IPostItem>> => {
  const session = await auth();

  if (!session) {
    console.log('No session found: redirecting to login page');
    redirect('/login', RedirectType.push);
  }

  try {
    const responseService = await mumblePostService.updatePostText({
      token: session.accessToken,
      text,
      postIdentifier: identifier,
    });
    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }

    if (responseService.status === EResponseMumbleStatus.SUCCESS) {
      return { status: EResponseMumbleStatus.SUCCESS };
    } else {
      throw new Error(responseService.message);
    }
  } catch (error) {
    return {
      status: EResponseMumbleStatus.ERROR,
      message: (error as Error).message,
    };
  }
};

export const updatePostImage = async ({
  identifier,
  formData,
  revalidationsPath,
}: IUpdatePostImageArgs) => {
  const session = await auth();

  if (!session) {
    console.log('No session found: redirecting to login page');
    redirect('/login', RedirectType.push);
  }

  try {
    const responseService = await mumblePostService.updatePostImage({
      token: session.accessToken,
      formData,
      postIdentifier: identifier,
    });

    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }

    return {
      status: EResponseMumbleStatus.SUCCESS,
      data: responseService,
    };
  } catch (error) {
    return {
      status: EResponseMumbleStatus.ERROR,
      message: (error as Error).message,
    };
  }
};
