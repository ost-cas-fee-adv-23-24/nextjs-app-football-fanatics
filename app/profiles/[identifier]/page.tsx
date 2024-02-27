import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';

export default async function Profile(context: {
  params: { identifier: number };
}) {
  // TODO: redirect to profile/me if userID === current signed in userID
  try {
    const profileData = await getMumbleUserByIdentifier(
      context.params.identifier.toString(),
    );

    return <Header user={profileData} />;
  } catch (error) {
    return notFound();
  }
}
