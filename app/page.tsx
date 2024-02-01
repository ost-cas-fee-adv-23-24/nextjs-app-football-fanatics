import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import { auth } from './api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-blue-500 text-5xl">Elbum Web App</div>
      {!!session ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            {/* TODO: use Button from Design System */}
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            {/* TODO: use Button from Design System */}
            <LoginButton />
          </div>
        </div>
      )}
    </main>
  );
}
