import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';

export interface IGetProfileDataArgs {
  profileIdentifier: string;
  loggedInUserIdentifier?: string;
}

export interface IProfileData {
  profileData: IMumbleUser;
  profileFollowers: IMumbleFollowers[];
  profileFollowees: IMumbleFollowers[];
  loggedUserFollowers: IMumbleFollowers[];
  loggedUserFollowees: IMumbleFollowers[];
}

export const getProfileData = async ({
  profileIdentifier,
  loggedInUserIdentifier,
}: IGetProfileDataArgs): Promise<IProfileData> => {
  const profileData = await getMumbleUserByIdentifier(profileIdentifier);
  const profileFollowers = await getAllFollowers({
    identifier: profileIdentifier,
  });
  const profileFollowees = await getAllFollowees(profileIdentifier);
  let loggedUserFollowers: IMumbleFollowers[] = [];
  let loggedUserFollowees: IMumbleFollowers[] = [];
  if (loggedInUserIdentifier) {
    loggedUserFollowers = await getAllFollowers({
      identifier: loggedInUserIdentifier,
    });
    loggedUserFollowees = await getAllFollowees(loggedInUserIdentifier);
  }

  return {
    profileData,
    profileFollowers,
    profileFollowees,
    loggedUserFollowers,
    loggedUserFollowees,
  };
};
