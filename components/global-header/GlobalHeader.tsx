'use client';
import React from 'react';
import {
  Avatar,
  ButtonMenu,
  EAvatarSizes,
  EIconColors,
  EIConTypes,
  ELogoPositions,
  ELogoTypes,
  Icon,
  Logo,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import useUserInfo from '@/hooks/useUserInfo';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import UserSettings from '@/components/user-settings/UserSettings';
import { toast } from 'react-toastify';

interface IProps {}

export const GlobalHeader = ({}: IProps) => {
  const { avatarUrl, identifier } = useUserInfo();
  const { dispatchModal, closeModal } = useModal();

  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} title="mumble">
        <div className="w-10 h-10 md:hidden">
          <Icon
            type={EIConTypes.MUMBLE}
            fitParent={true}
            // extend to icon colo white or inherit color
            color={EIconColors.VIOLET}
          />
        </div>
        <div className="hidden md:block">
          <Logo logoPosition={ELogoPositions.LEFT} color={ELogoTypes.HEADER} />
        </div>
        <span className="hidden">Mumble Logo</span>
      </Link>
      <div className="flex items-center gap-6">
        {identifier ? (
          <>
            <Link href={`/profiles/${identifier}`}>
              <Avatar
                imgSrc={avatarUrl}
                size={EAvatarSizes.SM}
                nameHtml="avatar"
              />
            </Link>
            <ButtonMenu
              label="Settings"
              icon={EIConTypes.SETTINGS}
              name="settings"
              onCustomClick={() => {
                dispatchModal({
                  type: EModalActions.SET_CONTENT,
                  payload: {
                    title: 'Settings',
                    content: (
                      <UserSettings
                        onClose={closeModal}
                        onSave={(options) => {
                          toast(
                            'Saved! Sorry. No apis for this at the moment ¯\\_(ツ)_/¯',
                          );
                          setTimeout(() => {
                            closeModal();
                          }, 2000);
                        }}
                      />
                    ),
                  },
                });
              }}
            />
            <ButtonMenu
              name="logout"
              label="Logout"
              icon={EIConTypes.LOGOUT}
              onCustomClick={() => {
                signOut();
              }}
            />
          </>
        ) : (
          <ButtonMenu
            name="login"
            label="Login"
            icon={EIConTypes.LOGOUT}
            onCustomClick={() => {
              signIn('zitadel');
            }}
          />
        )}
      </div>
    </div>
  );
};
