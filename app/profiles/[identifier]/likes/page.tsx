import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';

export default async function ProfileLikes(context: {
  params: { identifier: number };
}) {
  const userIdentifier = context.params.identifier.toString();

  try {
    const profileData = await getMumbleUserByIdentifier(userIdentifier);

    const userMumbleLikes = await getMumblePosts({
      likedBy: [userIdentifier],
      offset: 0,
      limit: frontendConfig.feed.defaultAmount,
    });

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          <ProfileFeed
            isLikes={true}
            userIdentifier={userIdentifier}
            count={userMumbleLikes.count}
            data={userMumbleLikes.data}
            next={userMumbleLikes.next}
            prev={userMumbleLikes.prev}
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
