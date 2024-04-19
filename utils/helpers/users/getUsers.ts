'use server';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import mumbleUserServiceInstance from '@/services/Mumble/MumbleUser';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

export const getAllUsers = async (): Promise<IMumbleUser[]> => {
  const session = await auth();
  try {
    return mumbleUserServiceInstance.getAllUsers({
      token: session ? session.accessToken : '',
    });
  } catch (error) {
    throw new Error(`Error fetching users - ${JSON.stringify(error)}`);
  }
};
