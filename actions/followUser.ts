'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { revalidatePath } from 'next/cache';

export interface IFollowUserToggle {
  identifier: string;
  unfollow: boolean;
  revalidationPath: string;
}

export const followUserToggle = async ({
  identifier,
  unfollow = false,
  revalidationPath,
}: IFollowUserToggle): Promise<void> => {
  const session = await auth();
  try {
    await mumbleUserServiceInstance.followUserToggle({
      token: session ? session.accessToken : '',
      identifier,
      unfollow,
    });
    revalidatePath(revalidationPath);
  } catch (error) {
    throw new Error(`Error following user ${identifier}`);
  }
};
