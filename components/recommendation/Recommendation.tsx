'use client';
import React from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  ButtonIconRounded,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import Link from 'next/link';

interface IProps extends IMumbleUser {
  onDismiss: (identifier: string) => void;
  onFollow: (identifier: string) => void;
}

const Recommendation = ({
  avatarUrl,
  id: identifier,
  lastname,
  username,
  firstname,
  onDismiss,
  onFollow,
}: IProps) => {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col items-center w-full relative">
      <div className="absolute top-2 right-2">
        {/* maybe to change for an icon with a clickEvent*/}
        <ButtonIconRounded
          name={`dismiss-${identifier}`}
          icon={EIConTypes.CANCEL}
          onCustomClick={() => {
            onDismiss(identifier);
          }}
          label="dismiss"
        />
      </div>
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
            href: `/profiles/${identifier}/mumbles`,
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
            onFollow(identifier);
          }}
        />
      </div>
    </div>
  );
};

export default Recommendation;
