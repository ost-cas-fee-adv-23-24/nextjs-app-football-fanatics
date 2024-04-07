import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import ProfileFollow from '@/components/profile-follow/ProfileFollow';

export default async function ProfileLikes(context: IParamsOnlyIdentifierCtx) {
  const userIdentifier = context.params.identifier.toString();
  const session = await auth();

  const userFollowers: IMumbleFollowers[] = await getAllFollowers({
    identifier: userIdentifier,
  });

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
                revalidationPath={`/profiles/${userIdentifier}/likes`}
              />
            </div>
          )}
          <div className="mt-8 mb-4">
            <ProfileSwitch
              redirectionDelay={500}
              selectedTab={1}
              userIdentifier={userIdentifier}
            />
          </div>
          <ProfileFeed
            isLikes={true}
            userIdentifier={userIdentifier}
            subscribeToNewestPost={false}
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
