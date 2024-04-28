import { getProfileData } from '@/actions/getProfileData';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import { UserCardGroupFollowing } from '@/components/user-card-group/UserCardGroupFollowing';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import { notFound } from 'next/navigation';

export default async function ProfileFollowers(ctx: IParamsOnlyIdentifierCtx) {
  const session = await auth();
  const userIdentifier = ctx.params.identifier.toString();
  try {
    const { loggedUserFollowees, profileFollowees } = await getProfileData({
      profileIdentifier: userIdentifier,
      loggedInUserIdentifier: session?.user.identifier,
    });

    return (
      <>
        <div className="mt-8 mb-4">
          <ProfileSwitch
            redirectionDelay={200}
            selectedTab={3}
            userIdentifier={userIdentifier}
          />
        </div>
        <div className="mt-8 mb-4">
          <UserCardGroupFollowing
            revalidationPath={`/profiles/${userIdentifier}/following`}
            loggedInUserIdentifier={session?.user.identifier}
            loggedInUserFollowees={loggedUserFollowees}
            profileIdentifier={userIdentifier}
            followees={profileFollowees}
          />
        </div>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
