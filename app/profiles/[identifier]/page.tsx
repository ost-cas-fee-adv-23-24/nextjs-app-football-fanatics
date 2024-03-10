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

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="max-w-4xl mx-auto py-8">
          <Header user={profileData} />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
