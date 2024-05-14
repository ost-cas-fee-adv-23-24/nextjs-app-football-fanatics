'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { UserCard } from '@/components/user-card/UserCard';

interface IProps {
  followers: IMumbleUser[];
  loggedInUserFollowees: IMumbleFollowers[];
  loggedInUserIdentifier?: string;
  profileIdentifier: string;
  revalidationPath: string;
}

export const UserCardGroupFollowers = ({
  followers,
  profileIdentifier,
  loggedInUserFollowees,
  revalidationPath,
  loggedInUserIdentifier,
}: IProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {followers.map((userCardInfo) => {
        let isFollowable = true;
        const isFollowing = loggedInUserFollowees.find(
          (userCard) => userCard.id === userCardInfo.id,
        );
        if (isFollowing) {
          isFollowable = false;
        }

        return (
          <UserCard
            revalidationPath={revalidationPath}
            followable={isFollowable}
            profileIdentifier={profileIdentifier}
            loggedInUserIdentifier={loggedInUserIdentifier}
            userData={userCardInfo}
            key={userCardInfo.id}
          />
        );
      })}
    </div>
  );
};
