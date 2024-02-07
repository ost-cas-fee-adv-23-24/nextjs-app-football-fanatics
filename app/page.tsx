import LogoutButton from '@/components/logout-button';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Logo,
  Paragraph
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { signIn } from 'next-auth/react';
import { auth } from './api/auth/[...nextauth]/auth';

// TODO Check to add a namespace to the design system to avoid css conflicts.

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
