import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import {
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Logo,
  Paragraph,
  Tabs,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { auth } from './api/auth/[...nextauth]/auth';
import DummyClientWrapperServer from '@/components/DummyClientWrapperServer';
import DummyClientWrapperClient from '@/components/DummyClientWrapperClient';

// TODO Check to add a namespace to the design system to avoid css conflicts.

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DummyClientWrapperServer>
        <Heading level={ETypographyLevels.ONE} text="Elbum Web App" />
        <Logo logoPosition={'left' as any} color={'gradient' as any} />
        <p className="bg-slate-600">
          As soon as the class is in the body, the bg shows ... weird.{' '}
        </p>
        <Paragraph
          size={EParagraphSizes.LARGE}
          text="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction. What are we going to do? We'll be sent to the spice mine of Kessel or smashed into who knows what! Wait a minute, where are you going? The Death Star plans are not in the main computer. Where are those transmissions you intercepted? What have you done with those plans? We intercepted no transmissions. Aaah., This is a consular ship."
        />
        <Paragraph
          size={EParagraphSizes.LARGE}
          text="I knew that you were going to say that! Who's the more foolish...the fool or the fool who follows him? The ship's all yours. If the scanners pick up anything, report it immediately. All right, let's go. Hey down there, could you give us a hand with this? TX-four-one-two. Why aren't you at your post? TX-four-one-two, do you copy? Take over. We've got a bad transmitter. I'll see what I can do."
        />
      </DummyClientWrapperServer>

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
