'use client';
import {
  Avatar,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  Icon,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { formatDistance } from 'date-fns';
import { decodeTime } from 'ulidx';
import React from 'react';
import useProfileInfo from '@/hooks/useProfileInfo';
import { IPostCreator } from '@/utils/interfaces/mumble.interface';

export const PostCardHeader = ({
  postIdentifier,
  creator,
}: {
  postIdentifier: string;
  creator: IPostCreator;
}) => {
  const { lastName, userName, firstName, identifier, avatarUrl } =
    useProfileInfo();
  return (
    <>
      <div className="absolute left-[-38px] top-[40px]">
        <Avatar size={EAvatarSizes.MD} imgSrc={creator.avatarUrl} />
      </div>
      <Paragraph
        size={EParagraphSizes.MEDIUM}
        text={
          postIdentifier === creator.id
            ? `${firstName} ${lastName}`
            : creator.username
        }
      />
      <div className="flex mt-2 items-center pb-6">
        <ButtonIcon
          type={EButtonTypes.PRIMARY}
          icon={EIConTypes.PROFILE}
          label={creator.username}
          onCustomClick={() => {
            console.log('go to profile');
          }}
        />
        <div className="flex items-center ml-4 text-slate-400">
          <Icon type={EIConTypes.TIME} />
          <p className="ml-1">
            {formatDistance(new Date(decodeTime(postIdentifier)), new Date())}
          </p>
        </div>
      </div>
    </>
  );
};
