import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';
import ProfileFollow from '@/components/profile-switch/ProfileFollow';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import { UserCardGroupFollowers } from '@/components/user-card-group/UserCardGroupFollowers';
import { EUserCardGroup } from '@/utils/enums/general.enum';
import { getProfileData } from '@/actions/getProfileData';
import { UserCardGroupFollowing } from '@/components/user-card-group/UserCardGroupFollowing';

export default async function ProfileFollowers(
  context: IParamsOnlyIdentifierCtx,
) {
  const session = await auth();
  const userIdentifier = context.params.identifier.toString();
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
              selectedTab={3}
              userIdentifier={userIdentifier}
            />
          </div>
          <div className="mt-8 mb-4">
            <UserCardGroupFollowing
              loggedInUserIdentifier={session?.user.identifier}
              loggedInUserFollowees={loggedUserFollowees}
              profileIdentifier={userIdentifier}
              cards={profileFollowees}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
