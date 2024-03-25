'use server';
import { getAllUsers } from '@/actions/getUsers';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

// in the real world the api should deliver  recommendations based on user preferences/behaviour/marketing
// we just get all the users and the user followees. In a real world scenario we would set a batch number of recommendations
// we have only 11 users on the DB. So we just get all the users and the user followees
// also the rejected recommendations would be stored in the DB, so that they are not shown again (for a while)
export const getRecommendationsData = async (
  userIdentifier: string,
): Promise<{ users: IMumbleUser[]; userFollowees: IMumbleUser[] }> => {
  const users = await getAllUsers(true);
  const userFollowees = await getAllFollowees({ identifier: userIdentifier });

  return {
    users,
    userFollowees,
  };
};
