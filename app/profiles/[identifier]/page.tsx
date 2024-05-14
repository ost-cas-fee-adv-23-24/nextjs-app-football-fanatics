import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import TabDispatcher from '@/components/tab-dispatcher/TabDispatcher';

export default async function Profile(context: IParamsOnlyIdentifierCtx) {
  const currentProfileUserIdentifier = context.params.identifier.toString();

  return (
    <>
      <TabDispatcher selectedTab={0} />
      <ProfileFeed
        creators={[currentProfileUserIdentifier]}
        userIdentifier={currentProfileUserIdentifier}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
        text="No Mumbles yet, Hurry up! mumble something!"
      />
    </>
  );
}
