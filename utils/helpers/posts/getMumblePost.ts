import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import { IPost, MumblePostService } from '@/services/Mumble/MumblePost';

export const getMumblePostAction = async (
  identifier: string,
  includeReplies: boolean,
): Promise<IPost> => {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);
  return await dataSrc.getPostById({
    token: session ? session.accessToken : '',
    includeReplies,
    identifier,
  });
};
