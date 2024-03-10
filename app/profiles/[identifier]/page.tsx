import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';

export default async function Profile(context: {
  params: { identifier: number };
}) {
  // TODO: redirect to profile/me if userID === current signed in userID
  try {
    const profileData = await getMumbleUserByIdentifier(
      context.params.identifier.toString(),
    );

    const userMumbles = await getMumblePosts({
      creators: [profileData.id],
      offset: 0,
      limit: frontendConfig.feed.defaultAmount,
    });

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          <ProfileFeed
            count={userMumbles.count}
            data={userMumbles.data}
            next={userMumbles.next}
            prev={userMumbles.prev}
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
