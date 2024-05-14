import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';

export const getAllFollowers = async ({
  identifier,
}: {
  identifier: string;
}): Promise<IMumbleFollowers[]> => {
  const session = await auth();
  try {
    return await mumbleUserServiceInstance.getAllFollowers({
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(
      `Error fetching followers for user ${identifier} - ${JSON.stringify(error)}`,
    );
  }
};
