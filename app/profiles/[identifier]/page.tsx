import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileFollow from '@/components/profile-switch/ProfileFollow';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';

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

    const userMumbles = await getMumblePosts({
      creators: [profileData.id],
      offset: 0,
      limit: frontendConfig.feed.defaultAmount,
    });

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
              />
            </div>
          )}
          <div className="mt-8 mb-4">
            <ProfileSwitch
              redirectionDelay={500}
              selectedTab={0}
              userIdentifier={currentProfileUserIdentifier}
            />
          </div>
          <ProfileFeed
            userIdentifier={currentProfileUserIdentifier}
            count={userMumbles.count}
            data={userMumbles.data}
            next={userMumbles.next}
            prev={userMumbles.prev}
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
