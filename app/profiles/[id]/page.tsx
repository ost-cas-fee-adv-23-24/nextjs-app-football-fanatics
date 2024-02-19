import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import { MumbleUserService } from '@/services/Mumble/MumbleUser';

export default async function Profile(context: { params: { id: number } }) {
  // TODO: redirect to profile/me if userID === current signed in userID

  const session = await auth();
  const dataSrc = new MumbleUserService(config.mumble.host);

  try {
    const profileData = await dataSrc.getUserByIdentifier({
      // @ts-ignore
      token: session ? session.accessToken : '',
      identifier: context.params.id.toString(),
    });

    return <Header user={profileData} />;
  } catch (error) {
    return notFound();
  }
}
