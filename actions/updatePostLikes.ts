'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import mumblePostService, {
  MumblePostService,
} from '@/services/Mumble/MumblePost';
import { revalidatePath } from 'next/cache';

export const increasePostLikes = async (identifier: string): Promise<any> => {
  const session = await auth();
  const dataSource = mumblePostService;

  try {
    await dataSource.likePost({
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(`Error liking posts ${identifier}`);
  }
};

export const decreasePostLike = async (identifier: string) => {
  const session = await auth();
  const dataSource = mumblePostService;

  try {
    await dataSource.unlikePost({
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(`Error unliking posts ${identifier}`);
  }
};
