'use client';

import { Button, EIConTypes } from '@ost-cas-fee-adv-23-24/elbmum-design';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      icon={EIConTypes.CALENDAR}
      label="Login with Zitadel"
      onCustomClick={() => {
        signIn('zitadel');
      }}
    />
  );
}
