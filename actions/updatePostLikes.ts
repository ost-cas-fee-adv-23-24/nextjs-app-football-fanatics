'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';

export const increasePostLikes = async (identifier: string): Promise<any> => {
  const session = await auth();
  const dataSource = new MumblePostService(config.mumble.host);

  try {
    await dataSource.likePost({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(`Error liking posts ${identifier}`);
  }
};

export const decreasePostLike = async (identifier: string) => {
  const session = await auth();
  const dataSource = new MumblePostService(config.mumble.host);

  try {
    await dataSource.unlikePost({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(`Error unliking posts ${identifier}`);
  }
};
