import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';

export default async function ProfileLikes(context: IParamsOnlyIdentifierCtx) {
  const userIdentifier = context.params.identifier.toString();

  return (
    <>
      <div className="mt-8 mb-4">
        <ProfileSwitch
          redirectionDelay={200}
          selectedTab={1}
          userIdentifier={userIdentifier}
        />
      </div>
      <ProfileFeed
        revalidationPath={`/profiles/${userIdentifier}/likes`}
        isLikes={true}
        userIdentifier={userIdentifier}
        subscribeToNewestPost={false}
      />
    </>
  );
}
