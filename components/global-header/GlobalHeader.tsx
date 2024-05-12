'use client';
import UserSettings from '@/components/user-settings/UserSettings';
import useModal from '@/hooks/useModal';
import useUserInfo from '@/hooks/useUserInfo';
import { EModalActions } from '@/stores/Modal.context';
import { GLOBAL_HEADER_LOGIN_BUTTON_LABEL, GLOBAL_HEADER_LOGOUT_BUTTON_LABEL } from '@/utils/constants';
import {
  Avatar,
  ButtonMenu,
  EAvatarSizes,
  EIConTypes,
  ELogoPositions,
  ELogoTypes,
  Icon,
  Logo,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';



export const GlobalHeader = () => {
  const { avatarUrl, identifier } = useUserInfo();
  const { dispatchModal, closeModal } = useModal();

  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} title="mumble">
        <div className="h-10 w-10 md:hidden text-white">
          <Icon type={EIConTypes.MUMBLE} fitParent={true} />
        </div>
        <div className="hidden md:block">
          <Logo logoPosition={ELogoPositions.LEFT} color={ELogoTypes.HEADER} />
        </div>
        <span className="hidden">Mumble Logo</span>
      </Link>
      <div className="flex items-center gap-6">
        {identifier ? (
          <>
            <Link aria-label='Profile' href={`/profiles/${identifier}`}>
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
                          // There is no endpoints on the mumble API to update an user. So we just show a toast
                          // the only thing we can update is the avatar picture. what is done in the avatar component
                          // shown in the profile page
                          toast(
                            'Not Saved! Sorry. No apis for this at the moment ¯\\_(ツ)_/¯',
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
              label={GLOBAL_HEADER_LOGOUT_BUTTON_LABEL}
              icon={EIConTypes.LOGOUT}
              onCustomClick={() => {
                signOut();
              }}
            />
          </>
        ) : (
          <>
            {/*to avoid layout shift*/}
            <div className="w-10 h-10" />
            {/*to avoid layout shift*/}
            <div className="w-[94.6px] h-[54px]" />
            <ButtonMenu
              name="login"
              label={GLOBAL_HEADER_LOGIN_BUTTON_LABEL}
              icon={EIConTypes.LOGOUT}
              onCustomClick={() => {
                signIn('zitadel', { callbackUrl: '/' });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
