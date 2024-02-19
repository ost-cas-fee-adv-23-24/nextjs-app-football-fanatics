'use client';
import React from 'react';
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

import { IPostItem } from '@/utils/interfaces/mumble.interface';
import { decodeTime } from 'ulidx';
import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import useProfileInfo from '@/hooks/useProfileInfo';

export const PostCard = ({
  mediaUrl,
  id,
  likedBySelf,
  likes,
  mediaType,
  replies,
  text,
  creator,
}: IPostItem) => {
  const { lastName, userName, firstName, identifier } = useProfileInfo();
  console.log('creator', creator);
  return (
    <>
      <div className="absolute left-[-38px] top-[40px]">
        <Avatar
          size={EAvatarSizes.MD}
          imgSrc={creator.avatarUrl}
          editable={false}
          onSuccess={() => {}}
          onError={() => {}}
        />
      </div>
      <Paragraph
        size={EParagraphSizes.MEDIUM}
        text={
          identifier && identifier === creator.id
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
            {formatDistance(new Date(decodeTime(id)), new Date())}
          </p>
        </div>
      </div>
      <Paragraph text={text} size={EParagraphSizes.MEDIUM} />
      {mediaUrl && (
        <div className="mt-4">
          {mediaType === EMediaTypes.IMAGE ? (
            <PostImage src={mediaUrl} alt="test" />
          ) : null}
        </div>
      )}
    </>
  );
};
