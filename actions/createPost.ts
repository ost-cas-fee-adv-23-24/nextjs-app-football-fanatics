'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService, {
  MumblePostService,
} from '@/services/Mumble/MumblePost';
import config from '@/config';
import { revalidatePath } from 'next/cache';

export const createPost = async (formData: FormData): Promise<void> => {
  const session = await auth();

  if (!session) throw new Error('No session');
  try {
    const response = await mumblePostService.createPost({
      token: session ? session.accessToken : '',
      formData,
    });
    revalidatePath(`/`);
  } catch (error) {
    throw new Error(`Error creating post ${(error as Error).message}`);
  }
};
