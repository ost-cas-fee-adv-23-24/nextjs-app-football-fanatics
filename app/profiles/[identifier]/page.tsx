import { auth } from '@/app/api/auth/[...nextauth]/auth';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';

export default async function Profile(context: IParamsOnlyIdentifierCtx) {
  const currentProfileUserIdentifier = context.params.identifier.toString();

  const session = await auth();

  return (
    <>
      <div className="mt-8 mb-4">
        <ProfileSwitch
          redirectionDelay={500}
          selectedTab={0}
          userIdentifier={currentProfileUserIdentifier}
          showSuggestions={
            !!(
              session &&
              currentProfileUserIdentifier === session.user.identifier
            )
          }
        />
      </div>
      <ProfileFeed
        creators={[currentProfileUserIdentifier]}
        userIdentifier={currentProfileUserIdentifier}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </>
  );
}
