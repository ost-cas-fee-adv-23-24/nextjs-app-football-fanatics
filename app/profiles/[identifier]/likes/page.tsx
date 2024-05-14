import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import TabDispatcher from '@/components/tab-dispatcher/TabDispatcher';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mumble | Profile Likes',
  description: 'Mumbles/Likes/Followers/Following/Suggestions',
};

export default async function ProfileLikes(context: IParamsOnlyIdentifierCtx) {
  const userIdentifier = context.params.identifier.toString();

  return (
    <>
      <TabDispatcher selectedTab={1} />
      <ProfileFeed
        revalidationPath={`/profiles/${userIdentifier}/likes`}
        isLikes={true}
        userIdentifier={userIdentifier}
        subscribeToNewestPost={false}
        text="No Likes yet, Hurry up! like some posts!"
      />
    </>
  );
}
