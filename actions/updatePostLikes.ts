'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

import mumblePostService from '@/services/Mumble/MumblePost';
import { revalidatePath } from 'next/cache';

interface IToggleLikePostArgs {
  revalidationPath?: string;
  identifier: string;
}

export const increasePostLikes = async ({
  identifier,
  revalidationPath,
}: IToggleLikePostArgs): Promise<any> => {
  const session = await auth();

  try {
    await mumblePostService.likePost({
      token: session ? session.accessToken : '',
      identifier,
    });
    if (revalidationPath) {
      revalidatePath(revalidationPath);
    }
  } catch (error) {
    throw new Error(`Error liking posts ${identifier}`);
  }
};

export const decreasePostLike = async ({
  identifier,
  revalidationPath,
}: IToggleLikePostArgs) => {
  const session = await auth();

  try {
    await mumblePostService.unlikePost({
      token: session ? session.accessToken : '',
      identifier,
    });
    if (revalidationPath) {
      revalidatePath(revalidationPath);
    }
  } catch (error) {
    throw new Error(`Error unliking posts ${identifier}`);
  }
};
