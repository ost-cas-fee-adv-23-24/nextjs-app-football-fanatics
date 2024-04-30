'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import config from '@/config';

interface IGetAllUsersParams {
  ttl?: number;
  token: string;
}

export const getAllUsers = async (useCache = true): Promise<IMumbleUser[]> => {
  const session = await auth();
  try {
    const options: IGetAllUsersParams = {
      token: session ? session.accessToken : '',
    };
    if (useCache) {
      options.ttl = config.cacheRules.allUsersData;
    }
    const users = await mumbleUserServiceInstance.getAllUsers(options);
    return users;
  } catch (error) {
    throw new Error(`Error fetching users - ${JSON.stringify(error)}`);
  }
};
