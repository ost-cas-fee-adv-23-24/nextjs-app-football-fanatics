'use client';
import React, { useMemo } from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { IMumbleUsers } from '@/utils/interfaces/mumbleUsers.interface';
import Link from 'next/link';

interface IProps extends IMumbleUsers {}

const Recommendation = ({
  avatarUrl,
  id: identifier,
  lastname,
  username,
  firstname,
}: IProps) => {
  const test =
    'https://storage.googleapis.com/mumble-api-data/f36b7115-9ed5-4ec4-b5bb-47d72f6f2732';

  // const profilePic = useMemo(() => {
  //   const fallbackImages = [
  //     'https://storage.googleapis.com/mumble-api-data/08cff403-bc67-4155-aa5d-b6124e282f7c',
  //     'https://storage.googleapis.com/mumble-api-data/f36b7115-9ed5-4ec4-b5bb-47d72f6f2732',
  //   ];
  //   if (avatarUrl) {
  //     return avatarUrl;
  //   }
  //
  //   return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  // }, [avatarUrl]);

  return (
    <div className="p-4 rounded-lg bg-white flex flex-col items-center">
      <Avatar
        size={EAvatarSizes.LG}
        imgSrc={avatarUrl || test}
        nameHtml="avatar"
      />
      <div className="mt-4 w-full text-center">
        <p className="truncate font-poppins not-italic font-medium">
          {firstname && lastname ? `${firstname} ${lastname}` : username}
        </p>
      </div>
      <div className="mt-2">
        <ButtonIcon
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
        />
      </div>
    </div>
  );
};

export default Recommendation;
