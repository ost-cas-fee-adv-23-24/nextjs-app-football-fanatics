import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import { notFound } from 'next/navigation';

import { getProfileData } from '@/actions/getProfileData';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { UserCardGroupFollowers } from '@/components/user-card-group/UserCardGroupFollowers';

export default async function ProfileFollowers(ctx: IParamsOnlyIdentifierCtx) {
  const session = await auth();
  const userIdentifier = ctx.params.identifier.toString();
  try {
    const { profileFollowers, loggedUserFollowees } = await getProfileData({
      profileIdentifier: userIdentifier,
      loggedInUserIdentifier: session?.user.identifier,
    });

    return (
      <>
        <div className="mt-8 mb-4">
          <ProfileSwitch
            redirectionDelay={200}
            selectedTab={2}
            userIdentifier={userIdentifier}
          />
        </div>
        <div className="mt-8 mb-4">
          <UserCardGroupFollowers
            revalidationPath={`/profiles/${userIdentifier}/followers`}
            loggedInUserIdentifier={session?.user.identifier}
            loggedInUserFollowees={loggedUserFollowees}
            profileIdentifier={userIdentifier}
            followers={profileFollowers}
          />
        </div>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
