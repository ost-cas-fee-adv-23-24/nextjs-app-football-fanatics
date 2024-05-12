'use client';
import DialogLogin from '@/components/dialog-login/DialogLogin';
import useUserInfo from '@/hooks/useUserInfo';
import { NOT_LOGGED_IN_MESSAGE } from '@/utils/constants';
import { EIConTypes } from '@ost-cas-fee-adv-23-24/elbmum-design';
import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

const DialogLoginWrapper = () => {
  const { isLoggedIn } = useUserInfo();

  // in case of de-sync between zitadel/mumble and session
  // we ensure to log out,  if we arrived to this page.
  // the only way to get to this page is by being redirected in the backend due to
  // missing session or unauthenticated response of the mumble api (401)
  // should not happen but just in case
  useEffect(() => {
    if (isLoggedIn) {
      signOut();
    }
  }, [isLoggedIn]);

  return (
    <>
      <DialogLogin
        message={NOT_LOGGED_IN_MESSAGE}
        icon={EIConTypes.MUMBLE}
        customClick={() => {
          // after sign in the middleware will redirect to the correct feed
          signIn('zitadel', { callbackUrl: '/' });
        }}
        labelButton="Login"
      />
    </>
  );
};

export default DialogLoginWrapper;
