import Header from '@/components/header/Header';
import { notFound } from 'next/navigation';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';
import ProfileFollow from '@/components/profile-switch/ProfileFollow';

import { UserCardGroupFollowers } from '@/components/user-card-group/UserCardGroupFollowers';
import { EUserCardGroup } from '@/utils/enums/general.enum';
import { getProfileData } from '@/actions/getProfileData';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export default async function ProfileFollowers(
  context: IParamsOnlyIdentifierCtx,
) {
  const session = await auth();
  const userIdentifier = context.params.identifier.toString();
  try {
    const {
      profileFollowers,
      profileData,
      loggedUserFollowers,
      loggedUserFollowees,
      profileFollowees,
    } = await getProfileData({
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
              loggedInUserIdentifier={session?.user.identifier}
              loggedInUserFollowees={loggedUserFollowees}
              profileFollowees={profileFollowees}
              profileIdentifier={userIdentifier}
              cards={profileFollowers}
              type={EUserCardGroup.FOLLOWING}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
