import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import {
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Logo,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { auth } from './api/auth/[...nextauth]/auth';

// TODO Check to add a namespace to the design system to avoid css conflicts.

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Heading level={ETypographyLevels.ONE} text="Elbum Web App" />
      <Logo logoPosition={'left' as any} color={'gradient' as any} />
      <p className="bg-slate-600">
        As soon as the class is in the body, the bg shows ... weird.{' '}
      </p>
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
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}
    </main>
  );
}
