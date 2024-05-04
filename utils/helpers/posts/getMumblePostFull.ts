import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumblePostService, { IPost } from '@/services/Mumble/MumblePost';

export interface IGetMumblePostFullArgs {
  identifier: string;
  includeReplies: boolean;
}

export const getMumblePostFull = async ({
  identifier,
  includeReplies,
}: IGetMumblePostFullArgs): Promise<IPost> => {
  const session = await auth();
  return await mumblePostService.getPostById({
    token: session ? session.accessToken : '',
    includeReplies,
    identifier,
  });
};
