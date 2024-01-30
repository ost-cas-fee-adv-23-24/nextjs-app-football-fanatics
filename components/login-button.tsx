'use client';

import { Button } from '@ost-cas-fee-adv-23-24/elbmum-design';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      label="Login with Zitadel"
      onClickEvent={() => {
        signIn('zitadel');
      }}
    />
  );
}