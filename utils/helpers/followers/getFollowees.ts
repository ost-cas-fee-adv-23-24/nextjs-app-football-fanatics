import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';

export const getAllFollowees = async (
  identifier: string,
): Promise<IMumbleFollowers[]> => {
  const session = await auth();
  try {
    return await mumbleUserServiceInstance.getAllFollowees({
      token: session ? session.accessToken : '',
      identifier,
    });
  } catch (error) {
    throw new Error(
      `Error fetching followees for user ${identifier} - ${JSON.stringify(error)}`,
    );
  }
};
