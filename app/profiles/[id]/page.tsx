import Header from '@/components/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';

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
