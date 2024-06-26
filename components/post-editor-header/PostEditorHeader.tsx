'use client';
import {
  Avatar,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import React, { useMemo } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import Link from 'next/link';
import useBreakpoints from '@/hooks/useBreakpoints';

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
          <Link href={`/profiles/${identifier}`}>
            <Avatar
              size={EAvatarSizes.MD}
              imgSrc={avatarUrl}
              nameHtml="avatar"
            />
          </Link>
        </div>
      )}

      <div
        className={`${!useAvatarPositionFloating ? 'flex items-center' : ''} gap-4`}
      >
        {!useAvatarPositionFloating && (
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
            <div className="mb-6 text-slate-900">
              {title && (
                <Paragraph
                  size={EParagraphSizes.LARGE}
                  text={title}
                  inheritColor={true}
                />
              )}
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
                    // @ts-ignore
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
