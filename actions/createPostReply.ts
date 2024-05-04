'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import { revalidatePath } from 'next/cache';

export interface ICreatePostReplyArgs {
  formData: FormData;
  identifier: string;
}

export const createPostReply = async ({
  formData,
  identifier,
}: ICreatePostReplyArgs): Promise<void> => {
  const session = await auth();
  const dataSource = new MumblePostService(config.mumble.host);

  if (!session) throw new Error('No session found');
  try {
    const revalidationsPath = formData.get('revalidatePath') as string;
    formData.delete('revalidatePath');

    await dataSource.createPostReply({
      token: session ? session.accessToken : '',
      formData,
      identifier,
    });
    if (revalidationsPath) {
      revalidatePath(revalidationsPath);
    }
  } catch (error) {
    throw new Error(`Error creating post reply  - ${JSON.stringify(error)}`);
  }
};
