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
import React from 'react';
import useProfileInfo from '@/hooks/useProfileInfo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const PostEditorHeader = ({
  avatarFloating,
}: {
  avatarFloating: boolean;
}) => {
  const { lastName, userName, firstName, identifier, avatarUrl } =
    useProfileInfo();
  const router = useRouter();
  return (
    <div className="relative">
      {avatarFloating && (
        <div className="absolute left-[-85px]">
          <Link href={`/profiles/${identifier}`}>
            <Avatar size={EAvatarSizes.MD} imgSrc={avatarUrl} />
          </Link>
        </div>
      )}

      <div className={`${!avatarFloating ? 'flex items-center' : ''} gap-4`}>
        {!avatarFloating && (
          <Link href={`/profiles/${identifier}`}>
            <Avatar size={EAvatarSizes.MD} imgSrc={avatarUrl} />
          </Link>
        )}
        <div className="grow">
          <Paragraph
            size={EParagraphSizes.MEDIUM}
            text={`${firstName} ${lastName}`}
          />
          <div className="flex items-center mt-2">
            {/*TODO extend to support Next Link ... hence server component too */}
            <ButtonIcon
              type={EButtonTypes.PRIMARY}
              icon={EIConTypes.PROFILE}
              label={userName}
              onCustomClick={() => {
                router.push(`/profiles/${identifier}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};