import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

export interface RecommendationsArgs {
  maxAmount: number;
  rawUsers: IMumbleUser[];
  currentRecommendations: IMumbleUser[];
  followedUsersIdentifiers: string[];
  rejectedUsersIdentifiers: string[];
}

export interface ISelectableUsersArgs {
  rawUsers: IMumbleUser[];
  followedUsersIdentifiers: string[];
  rejectedUsersIdentifiers: string[];
}

export interface IPickRecommendationArgs {
  selectableUsers: IMumbleUser[];
  pickedUsers: IMumbleUser[];
}

export const completeRecommendations = ({
  maxAmount,
  rawUsers,
  followedUsersIdentifiers,
  rejectedUsersIdentifiers,
  currentRecommendations,
}: RecommendationsArgs): IMumbleUser[] => {
  const selectableUsers = getSelectableUsers({
    rawUsers,
    followedUsersIdentifiers,
    rejectedUsersIdentifiers,
  });
  const currentAmount = currentRecommendations.length;
  const neededAmount = maxAmount - currentAmount;
  if (selectableUsers.length === 0) {
    return [...currentRecommendations];
  } else if (selectableUsers.length <= neededAmount) {
    return [...currentRecommendations, ...selectableUsers];
  }

  const pickedUsers: IMumbleUser[] = [...currentRecommendations];

  for (let x = 0; x < neededAmount; x++) {
    const selected = pickRecommendation({
      selectableUsers,
      pickedUsers,
    });
    if (selected) {
      pickedUsers.push(selected);
    }
  }
  return pickedUsers;
};

export const getSelectableUsers = ({
  rawUsers,
  followedUsersIdentifiers,
  rejectedUsersIdentifiers,
}: ISelectableUsersArgs): IMumbleUser[] => {
  return rawUsers
    .filter(
      (rawUser: IMumbleUser) => !followedUsersIdentifiers.includes(rawUser.id),
    )
    .filter(
      (rawUser: IMumbleUser) => !rejectedUsersIdentifiers.includes(rawUser.id),
    );
};

export const pickRecommendation = ({
  selectableUsers,
  pickedUsers,
}: IPickRecommendationArgs): IMumbleUser | null => {
  const randomIndex = Math.floor(Math.random() * selectableUsers.length);
  const recommendedUser = selectableUsers[randomIndex];
  const alreadyInBag = pickedUsers.find(
    (pickedUser: IMumbleUser) => pickedUser.id === recommendedUser.id,
  );
  if (alreadyInBag) {
    return pickRecommendation({
      selectableUsers,
      pickedUsers,
    });
  }

  return recommendedUser;
};
