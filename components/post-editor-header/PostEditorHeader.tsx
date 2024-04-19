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
import useUserInfo from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IProps {
  avatarFloating: boolean;
  quote?: string;
  title?: string;
  subTitle?: string;
}

export const PostEditorHeader = ({
  avatarFloating,
  title,
  subTitle,
}: IProps) => {
  const { lastName, userName, firstName, identifier, avatarUrl } =
    useUserInfo();
  const router = useRouter();

  return (
    <div className="relative">
      {avatarFloating && (
        <div className="absolute left-[-85px]">
          <Link href={`/profiles/${identifier}`}>
            <Avatar
              size={EAvatarSizes.MD}
              imgSrc={avatarUrl}
              nameHtml="avatar"
            />
          </Link>
        </div>
      )}

      <div className={`${!avatarFloating ? 'flex items-center' : ''} gap-4`}>
        {!avatarFloating && (
          <Link href={`/profiles/${identifier}`}>
            <Avatar
              size={EAvatarSizes.MD}
              imgSrc={avatarUrl}
              nameHtml="avatar"
            />
          </Link>
        )}
        <div className="grow">
          {title || subTitle ? (
            <div className="mb-6 text-slate-600">
              {title && <Paragraph size={EParagraphSizes.LARGE} text={title} />}
              {subTitle && (
                <div className="flex items-center mt-2">
                  <Paragraph
                    inheritColor={true}
                    size={EParagraphSizes.MEDIUM}
                    text={subTitle}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <Paragraph
                size={EParagraphSizes.MEDIUM}
                text={`${firstName || userName} ${lastName || ''}`}
              />
              <div className="flex items-center mt-2">
                <ButtonIcon
                  name="profile"
                  type={EButtonTypes.PRIMARY}
                  icon={EIConTypes.PROFILE}
                  label={userName}
                  next={{
                    // @ts-ignore
                    NextLinkComponent: Link,
                    href: `/profiles/${identifier}`,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
