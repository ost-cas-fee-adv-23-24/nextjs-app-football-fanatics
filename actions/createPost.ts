'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService from '@/services/Mumble/MumblePost';

import { revalidatePath } from 'next/cache';

export const createPost = async (formData: FormData): Promise<void> => {
  const session = await auth();

  if (!session) throw new Error('No session');
  try {
    const revalidationsPath = formData.get('revalidationsPath') as string;
    formData.delete('revalidationsPath');
    const response = await mumblePostService.createPost({
      token: session ? session.accessToken : '',
      formData,
    });
    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }
  } catch (error) {
    throw new Error(`Error creating post ${(error as Error).message}`);
  }
};
