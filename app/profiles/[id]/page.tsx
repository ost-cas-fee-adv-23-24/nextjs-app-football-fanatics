import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import { getMumbleUserByIdentifier } from '@/actions/getMumbleUserByIdentifier';

export default async function Profile(context: { params: { id: number } }) {
  // TODO: redirect to profile/me if userID === current signed in userID
  try {
    const profileData = await getMumbleUserByIdentifier(
      context.params.id.toString(),
    );

    return <Header user={profileData} />;
  } catch (error) {
    return notFound();
  }
}
