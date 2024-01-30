
import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import {
  Heading,
  Logo,
  Paragraph
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { auth } from './api/auth/[...nextauth]/auth';

// TODO Include styles from design system.
// TODO Check to add a namespace to the design system to avoid css conflicts.
// TODO Fix Issue with enums in design System

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Heading level="1" text="Elbum Web App" />
      <Logo logoPosition={'left' as any} color={'gradient' as any} />
      {!!session ? (
        <div>
          <Paragraph
            size="L"
            text={`You are logged in as ${session.user?.name} (${session.user?.email}).`}
          />
          <div>
            {/* TODO: use Button from Design System */}
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
