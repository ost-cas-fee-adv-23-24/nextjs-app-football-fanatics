import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';

export default async function Profile(context: IParamsOnlyIdentifierCtx) {
  const userIdentifier = context.params.identifier.toString();

  try {
    const profileData = await getMumbleUserByIdentifier(userIdentifier);

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
            userIdentifier={userIdentifier}
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
