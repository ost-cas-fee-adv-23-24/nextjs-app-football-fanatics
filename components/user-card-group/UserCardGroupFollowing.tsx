'use client';
import React from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import useUserInfo from '@/hooks/useUserInfo';
import { UserCardFollower } from '@/components/user-card/UserCardFollower';
import { EUserCardGroup } from '@/utils/enums/general.enum';

interface IProps {
  cards: IMumbleUser[];
  type: EUserCardGroup;
}

export const UserCardGroupFollowing = ({ cards }: IProps) => {
  const { isLoggedIn } = useUserInfo();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {cards.map((follower) => {
        return (
          <UserCardFollower
            data={follower}
            key={follower.id}
            type={EUserCardGroup.FOLLOWING}
          />
        );
      })}
    </div>
  );
};
