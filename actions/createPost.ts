'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService from '@/services/Mumble/MumblePost';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

export const createPost = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    console.log('No session found: redirecting to login page');
    redirect('/login', RedirectType.push);
  } else {
    try {
      const revalidationsPath = formData.get('revalidationsPath') as string;
      formData.delete('revalidationsPath');
      await mumblePostService.createPost({
        token: session.accessToken,
        formData,
      });
      if (revalidationsPath) {
        revalidatePath(revalidationsPath);
      }
    } catch (error) {
      console.log(`Error creating post. ${(error as Error).message}`);
      redirect('/error', RedirectType.push);
    }
  }
};
