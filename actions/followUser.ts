'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { revalidatePath } from 'next/cache';

export interface IFollowUserToggle {
  identifier: string;
  unfollow: boolean;
}

export const followUserToggle = async ({
  identifier,
  unfollow = false,
}: IFollowUserToggle): Promise<void> => {
  const session = await auth();
  try {
    await mumbleUserServiceInstance.followUserToggle({
      token: session ? session.accessToken : '',
      identifier,
      unfollow,
    });
    revalidatePath(`/profiles/${identifier}}`);
  } catch (error) {
    throw new Error(`Error following user ${identifier}`);
  }
};
