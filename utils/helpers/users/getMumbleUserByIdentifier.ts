import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config, { frontendConfig } from '@/config';
import { MumbleUserService } from '@/services/Mumble/MumbleUser';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

interface IGetMumbleUserByIdentifierArgs {
  identifier: string;
  useCache?: boolean;
}

export const getMumbleUserByIdentifier = async ({
  identifier,
  useCache = false,
}: IGetMumbleUserByIdentifierArgs): Promise<IMumbleUser> => {
  const session = await auth();
  const dataSrc = new MumbleUserService(config.mumble.host);
  try {
    return await dataSrc.getUserByIdentifier({
      token: session ? session.accessToken : '',
      identifier,
      ttl: useCache ? config.cacheRules.userProfileData : undefined,
    });
  } catch (error) {
    throw new Error(
      `Error fetching user information ${identifier} - ${JSON.stringify(error)}`,
    );
  }
};
