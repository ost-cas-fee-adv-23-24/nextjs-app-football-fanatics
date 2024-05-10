'use client';
import React, { useEffect } from 'react';
import DialogLogin from '@/components/dialog-login/DialogLogin';
import { EIConTypes } from '@ost-cas-fee-adv-23-24/elbmum-design';
import useUserInfo from '@/hooks/useUserInfo';
import { signIn, signOut } from 'next-auth/react';

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
        message="Login to have a full experience!"
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
