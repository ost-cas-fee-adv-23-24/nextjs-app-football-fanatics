'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import { revalidatePath } from 'next/cache';

export const createPost = async (formData: FormData): Promise<void> => {
  const session = await auth();
  const dataSource = new MumblePostService(config.mumble.host);

  if (!session) throw new Error('No session');
  try {
    await dataSource.createPost({
      token: session ? session.accessToken : '',
      formData,
    });
    revalidatePath(`/`);
  } catch (error) {
    throw new Error(`Error creating post  - ${JSON.stringify(error)}`);
  }
};
