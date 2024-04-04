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
import { UserCard } from '@/components/user-card/UserCard';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';

export default async function ProfileFollowers(
  context: IParamsOnlyIdentifierCtx,
) {
  const userIdentifier = context.params.identifier.toString();
  const session = await auth();

  const userFollowers: IMumbleFollowers[] = await getAllFollowers({
    identifier: userIdentifier,
  });

  const userFollowees: IMumbleFollowers[] =
    await getAllFollowees(userIdentifier);

  try {
    const profileData = await getMumbleUserByIdentifier(userIdentifier);

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          {session && (
            <div className="mt-8 mb-4">
              <ProfileFollow
                loggedInUserIdentifier={session.user.identifier}
                profileIdentifier={userIdentifier}
                followers={userFollowers}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {userFollowers.map((follower) => {
                const isFollowee = userFollowees.some(
                  (user) => user.id === follower.id,
                );
                return (
                  <UserCard
                    {...follower}
                    type="followers"
                    key={follower.id}
                    isFollowee={isFollowee}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
