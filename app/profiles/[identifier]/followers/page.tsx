import Header from '@/components/header/Header';
import { notFound } from 'next/navigation';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';

import { UserCardGroupFollowers } from '@/components/user-card-group/UserCardGroupFollowers';
import { getProfileData } from '@/actions/getProfileData';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import ProfileFollow from '@/components/profile-follow/ProfileFollow';

export default async function ProfileFollowers(
  context: IParamsOnlyIdentifierCtx,
) {
  const session = await auth();
  const userIdentifier = context.params.identifier.toString();
  try {
    const { profileFollowers, profileData, loggedUserFollowees } =
      await getProfileData({
        profileIdentifier: userIdentifier,
        loggedInUserIdentifier: session?.user.identifier,
      });

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          {session && (
            <div className="mt-8 mb-4">
              <ProfileFollow
                loggedInUserIdentifier={session.user.identifier}
                profileIdentifier={userIdentifier}
                followers={profileFollowers}
                revalidationPath={`/profiles/${userIdentifier}/followers`}
              />
            </div>
          )}
          <div className="mt-8 mb-4">
            <ProfileSwitch
              redirectionDelay={500}
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
              cards={profileFollowers}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
