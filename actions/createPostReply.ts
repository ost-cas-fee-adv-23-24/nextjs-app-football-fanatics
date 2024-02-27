'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import { revalidatePath } from 'next/cache';

export const createPostReply = async (
  formData: FormData,
  identifier: string,
): Promise<void> => {
  const session = await auth();
  const dataSource = new MumblePostService(config.mumble.host);

  if (!session) throw new Error('No session found');
  try {
    await dataSource.createPostReply({
      token: session ? session.accessToken : '',
      formData,
      identifier,
    });
    revalidatePath(`/posts/${identifier}}`);
  } catch (error) {
    throw new Error(`Error creating post reply  - ${JSON.stringify(error)}`);
  }
};
