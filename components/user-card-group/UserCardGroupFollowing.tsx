'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import useUserInfo from '@/hooks/useUserInfo';
import { UserCardFollower } from '@/components/user-card/UserCardFollower';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { UserCardFollowing } from '@/components/user-card/UserCardFollowing';
import { UserCard } from '@/components/user-card/UserCard';

interface IProps {
  cards: IMumbleUser[];
  loggedInUserFollowees: IMumbleFollowers[];
  loggedInUserIdentifier?: string;
  profileIdentifier: string;
  revalidationPath: string;
}

export const UserCardGroupFollowing = ({
  cards,
  profileIdentifier,
  loggedInUserFollowees,
  revalidationPath,
}: IProps) => {
  const { identifier: loggedInProfileIdentifier } = useUserInfo();
  const isSameProfileAndVisitor =
    profileIdentifier === loggedInProfileIdentifier;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {cards.map((userCardInfo) => {
        if (isSameProfileAndVisitor) {
          // if the loggedInUser is the same as the profile visitor
          // then it is only possible to unfollow. on Unfollow the userCard will be removed from the list
          return (
            <UserCardFollower
              followable={false}
              profileIdentifier={profileIdentifier}
              loggedInUserIdentifier={loggedInProfileIdentifier}
              data={userCardInfo}
              key={userCardInfo.id}
            />
          );
        } else {
          // otherwise it is possible to follow IF the userCard is not already followed by the loggedInUser
          // if the userCard is already followed by the loggedInUser, then it is possible to unfollow
          const IsFolloweeOfLoggedInUser = loggedInUserFollowees.find(
            (userCard) => userCard.id === userCardInfo.id,
          );

          return (
            <UserCard
              revalidationPath={revalidationPath}
              followable={!IsFolloweeOfLoggedInUser}
              profileIdentifier={profileIdentifier}
              loggedInUserIdentifier={loggedInProfileIdentifier}
              data={userCardInfo}
              key={userCardInfo.id}
            />
          );
        }
      })}
    </div>
  );
};
