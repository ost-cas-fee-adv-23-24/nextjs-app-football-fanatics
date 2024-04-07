'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import useUserInfo from '@/hooks/useUserInfo';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { UserCard } from '@/components/user-card/UserCard';

interface IProps {
  cards: IMumbleUser[];
  loggedInUserFollowees: IMumbleFollowers[];
  loggedInUserIdentifier?: string;
  profileIdentifier: string;
  revalidationPath: string;
}

export const UserCardGroupFollowers = ({
  cards,
  profileIdentifier,
  loggedInUserFollowees,
  revalidationPath,
}: IProps) => {
  const { identifier: loggedInProfileIdentifier, isLoggedIn } = useUserInfo();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {cards.map((userCardInfo) => {
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
            loggedInUserIdentifier={loggedInProfileIdentifier}
            data={userCardInfo}
            key={userCardInfo.id}
          />
        );
      })}
    </div>
  );
};
