import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IUserMumble, MumbleUserService } from '@/services/Mumble/MumbleUser';
import config from '@/config';

export const getMumbleUserByIdentifier = async (
  identifier: string,
): Promise<IUserMumble> => {
  const session = await auth();
  const dataSrc = new MumbleUserService(config.mumble.host);
  try {
    return await dataSrc.getUserByIdentifier({
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(
      `Error fetching user information ${identifier} - ${JSON.stringify(error)}`,
    );
  }
};
