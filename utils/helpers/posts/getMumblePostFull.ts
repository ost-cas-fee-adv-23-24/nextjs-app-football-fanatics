import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService, { IPost } from '@/services/Mumble/MumblePost';
import { revalidatePath } from 'next/cache';

export interface IGetMumblePostFullArgs {
  identifier: string;
  includeReplies: boolean;
  revalidationsPath?: string;
}

export const getMumblePostFull = async ({
  identifier,
  includeReplies,
  revalidationsPath,
}: IGetMumblePostFullArgs): Promise<IPost> => {
  const session = await auth();
  const postData = await mumblePostService.getPostById({
    token: session ? session.accessToken : '',
    includeReplies,
    identifier,
  });

  if (revalidationsPath) {
    revalidatePath(revalidationsPath);
  }

  return postData;
};
