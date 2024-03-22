'use client';
import React, { useMemo } from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import Link from 'next/link';
import { followUserToggle } from '@/actions/followUser';

interface IProps extends IMumbleUser {}

const Recommendation = ({
  avatarUrl,
  id: identifier,
  lastname,
  username,
  firstname,
}: IProps) => {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col items-center w-full">
      <Avatar
        size={EAvatarSizes.LG}
        imgSrc={avatarUrl || undefined}
        nameHtml="avatar"
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
      <div className="mt-4 w-full">
        <Button
          fitParent={true}
          type={EButtonTypes.SECONDARY}
          icon={EIConTypes.MUMBLE}
          label="Follow"
          name={`user-follow-${identifier}`}
          onCustomClick={async () => {
            await followUserToggle({
              identifier,
              unfollow: false,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Recommendation;
