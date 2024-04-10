import Header from '@/components/header/Header';
import { notFound } from 'next/navigation';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getProfileData } from '@/actions/getProfileData';
import { UserCardGroupFollowing } from '@/components/user-card-group/UserCardGroupFollowing';
import ProfileFollow from '@/components/profile-follow/ProfileFollow';

export default async function ProfileFollowers(ctx: IParamsOnlyIdentifierCtx) {
  const session = await auth();
  const userIdentifier = ctx.params.identifier.toString();
  try {
    const {
      profileFollowers,
      profileData,
      loggedUserFollowees,
      profileFollowees,
    } = await getProfileData({
      profileIdentifier: userIdentifier,
      loggedInUserIdentifier: session?.user.identifier,
    });

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width mx-auto py-8">
          <Header user={profileData} />
          {session && (
            <div className="mt-8 mb-4">
              <ProfileFollow
                loggedInUserIdentifier={session.user.identifier}
                profileIdentifier={userIdentifier}
                followers={profileFollowers}
                revalidationPath={`/profiles/${userIdentifier}/following`}
              />
            </div>
          )}
          <div className="mt-8 mb-4">
            <ProfileSwitch
              redirectionDelay={500}
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
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
