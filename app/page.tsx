'use client';
import LogoutButton from '@/components/logout-button';
import { auth } from './api/auth/[...nextauth]/auth';
import { signIn } from 'next-auth/react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Logo,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

// TODO Include styles from design system.
// TODO Check to add a namespace to the design system to avoid css conflicts.
// TODO Fix Issue with enums in design System

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Heading level={ETypographyLevels.ONE} text="Elbum Web App" />
      <Logo logoPosition={'left' as any} color={'gradient' as any} />
      {!!session ? (
        <div>
          <Paragraph
            size={EParagraphSizes.LARGE}
            text={`You are logged in as ${session.user?.name} (${session.user?.email}).`}
          />
          <div>
            {/* TODO: use Button from Design System */}
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-slate-600">You are not logged in.</p>
          <div>
            <Button
              icon={EIConTypes.SHARE}
              type={EButtonTypes.PRIMARY}
              label="Login with Zitadel"
              onCustomClick={() => {
                signIn('zitadel');
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
