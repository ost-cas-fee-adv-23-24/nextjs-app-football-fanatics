'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { UserCard } from '@/components/user-card/UserCard';

interface IProps {
  followees: IMumbleUser[];
  loggedInUserFollowees: IMumbleFollowers[];
  loggedInUserIdentifier?: string;
  profileIdentifier: string;
  revalidationPath: string;
}

export const UserCardGroupFollowing = ({
  followees,
  profileIdentifier,
  loggedInUserFollowees,
  revalidationPath,
  loggedInUserIdentifier,
}: IProps) => {
  const isSameProfileAndVisitor = profileIdentifier === loggedInUserIdentifier;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {followees.map((userCardInfo) => {
        if (isSameProfileAndVisitor) {
          // if the loggedInUser is the same as the profile visitor
          // then it is only possible to unfollow. on Unfollow the userCard will be removed from the list
          return (
            <UserCard
              revalidationPath={revalidationPath}
              followable={false}
              profileIdentifier={profileIdentifier}
              loggedInUserIdentifier={loggedInUserIdentifier}
              userData={userCardInfo}
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
              loggedInUserIdentifier={loggedInUserIdentifier}
              userData={userCardInfo}
              key={userCardInfo.id}
            />
          );
        }
      })}
    </div>
  );
};
