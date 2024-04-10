import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import React from 'react';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import ProfileFollow from '@/components/profile-follow/ProfileFollow';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';

export default async function Profile(context: IParamsOnlyIdentifierCtx) {
  const currentProfileUserIdentifier = context.params.identifier.toString();

  const session = await auth();

  const userFollowers: IMumbleFollowers[] = await getAllFollowers({
    identifier: currentProfileUserIdentifier,
  });

  try {
    const profileData = await getMumbleUserByIdentifier(
      currentProfileUserIdentifier,
    );

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          {session && (
            <div className="mt-8 mb-4">
              <ProfileFollow
                loggedInUserIdentifier={session.user.identifier}
                profileIdentifier={currentProfileUserIdentifier}
                followers={userFollowers}
                revalidationPath={`/profiles/${currentProfileUserIdentifier}`}
              />
            </div>
          )}
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
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
