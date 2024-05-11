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
import React, { useMemo } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import Link from 'next/link';
import { decodeTime } from 'ulidx';
import { IPostCreator } from '@/utils/interfaces/mumblePost.interface';
import useBreakpoints from '@/hooks/useBreakpoints';

export const PostCardHeader = ({
  postIdentifier,
  creator,
  avatarFloating = true,
}: {
  postIdentifier?: string;
  creator: IPostCreator;
  avatarSize: EAvatarSizes;
  avatarFloating?: boolean;
}) => {
  const { lastName, userName, firstName, identifier, avatarUrl } =
    useUserInfo();
  const { isBpMDDown } = useBreakpoints();

  const useAvatarPositionFloating = useMemo(() => {
    if (isBpMDDown) {
      return false;
    }
    return avatarFloating;
  }, [isBpMDDown, avatarFloating]);

  return (
    <div className="relative">
      {useAvatarPositionFloating && (
        <div className="absolute left-[-85px] top-[-8px]">
          <Link
            href={`/profiles/${creator.id}`}
            aria-label={`more of this user ${creator.username || ''} here`}
          >
            <Avatar
              size={EAvatarSizes.MD}
              imgSrc={creator.avatarUrl || undefined}
              nameHtml="avatar"
            />
          </Link>
        </div>
      )}
      <div className="flex items-center gap-4">
        {!useAvatarPositionFloating && (
          <Link href={`/profiles/${creator.id}`}>
            <Avatar
              size={EAvatarSizes.MD}
              imgSrc={creator.avatarUrl || undefined}
              nameHtml="avatar"
            />
          </Link>
        )}
        <div className="grow text-slate-900">
          <Paragraph
            inheritColor={true}
            size={EParagraphSizes.MEDIUM}
            text={
              identifier === creator.id
                ? `${firstName || userName} ${lastName || ''}`
                : creator.username
            }
          />
        </div>
      </div>
      <div className="flex mt-2 items-center pb-6">
        <ButtonIcon
          name="profile"
          type={EButtonTypes.PRIMARY}
          icon={EIConTypes.PROFILE}
          label={creator ? creator.username : userName}
          next={{
            // @ts-ignore
            NextLinkComponent: Link,
            // @ts-ignore
            href: `/profiles/${creator ? creator.id : identifier}`,
          }}
        />
        {postIdentifier && (
          <div className="flex items-center ml-4 text-slate-400">
            <Icon type={EIConTypes.TIME} />
            <p className="ml-1">
              {formatDistance(new Date(decodeTime(postIdentifier)), new Date())}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
