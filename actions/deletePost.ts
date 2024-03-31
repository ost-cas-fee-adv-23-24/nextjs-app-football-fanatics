'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService from '@/services/Mumble/MumblePost';
import { revalidatePath } from 'next/cache';

export const deletePost = async ({
  postIdentifier,
  sourcePath,
}: {
  postIdentifier: string;
  sourcePath?: string;
}): Promise<void> => {
  const session = await auth();

  if (!session) throw new Error('No session');
  try {
    await mumblePostService.deletePost({
      token: session ? session.accessToken : '',
      identifier: postIdentifier,
    });
    if (sourcePath) {
      revalidatePath(sourcePath);
    }
  } catch (error) {
    throw new Error(`Error deleting post ${(error as Error).message}`);
  }
};
