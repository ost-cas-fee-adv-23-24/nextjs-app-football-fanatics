'use client';
import React from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import Link from 'next/link';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import { followUserToggle } from '@/actions/followUser';

interface IProps extends IMumbleUser {
  isFollowee?: boolean;
  type: 'following' | 'followers';
}

export const UserCard = ({
  avatarUrl,
  id: identifier,
  lastname,
  username,
  firstname,
  isFollowee = false,
  type,
}: IProps) => {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col items-center w-full relative">
      <Avatar
        size={EAvatarSizes.LG}
        imgSrc={avatarUrl || undefined}
        nameHtml="avatar"
        name={username}
      />
      <div className="mt-4 w-full text-center">
        <p className="truncate font-poppins not-italic font-medium">
          {firstname && lastname ? `${firstname} ${lastname}` : username}
        </p>
      </div>
      <div className="mt-2 w-full text-center">
        <ButtonIcon
          truncate={true}
          icon={EIConTypes.PROFILE}
          type={EButtonTypes.PRIMARY}
          label={username}
          name={identifier}
          next={{
            // @ts-ignore
            NextLinkComponent: Link,
            href: `/profiles/${identifier}`,
          }}
        />
      </div>
      {type === 'following' && (
        <div className="mt-4 w-full">
          <Button
            fitParent={true}
            type={EButtonTypes.TERTIARY}
            icon={EIConTypes.MUMBLE}
            label="Unfollow"
            name={`user-unfollow-${identifier}`}
            onCustomClick={async () => {
              await followUserToggle({
                identifier,
                unfollow: true,
              });
            }}
          />
        </div>
      )}
      {type === 'followers' && (
        <div className="mt-4 w-full">
          <Button
            fitParent={true}
            type={isFollowee ? EButtonTypes.TERTIARY : EButtonTypes.SECONDARY}
            icon={EIConTypes.MUMBLE}
            label={isFollowee ? 'Unfollow' : 'Follow back'}
            name={`user-unfollow-${identifier}`}
            onCustomClick={async () => {
              await followUserToggle({
                identifier,
                unfollow: isFollowee,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
