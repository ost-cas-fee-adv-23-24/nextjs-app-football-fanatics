'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import useUserInfo from '@/hooks/useUserInfo';
import { UserCardFollower } from '@/components/user-card/UserCardFollower';
import { EUserCardGroup } from '@/utils/enums/general.enum';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';

interface IProps {
  cards: IMumbleUser[];
  loggedInUserFollowees: IMumbleFollowers[];
  profileFollowees: IMumbleFollowers[];
  loggedInUserIdentifier?: string;
  type: EUserCardGroup;
  profileIdentifier: string;
}

export const UserCardGroupFollowers = ({
  cards,
  profileIdentifier,
  loggedInUserFollowees,
  profileFollowees,
}: IProps) => {
  const { identifier, isLoggedIn } = useUserInfo();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {cards.map((userCardInfo) => {
        let isFollowable = true;
        if (profileIdentifier === identifier) {
          const isFollowing = loggedInUserFollowees.find(
            (userCard) => userCard.id === userCardInfo.id,
          );
          if (isFollowing) {
            isFollowable = false;
          }
        } else {
          const isFollowing = profileFollowees.find(
            (userCard) => userCard.id === userCardInfo.id,
          );
          if (isFollowing) {
            isFollowable = true;
          }
        }

        return (
          <UserCardFollower
            followable={isFollowable}
            profileIdentifier={profileIdentifier}
            loggedInUserIdentifier={identifier}
            data={userCardInfo}
            key={userCardInfo.id}
          />
        );
      })}
    </div>
  );
};
