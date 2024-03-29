import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { notFound } from 'next/navigation';
import ProfileFeed from '@/components/profile-feed/ProfileFeed';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';
import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import React from 'react';

export default async function ProfileLikes(context: IParamsOnlyIdentifierCtx) {
  const userIdentifier = context.params.identifier.toString();

  try {
    const profileData = await getMumbleUserByIdentifier(userIdentifier);

    const userMumbleLikes = await getMumblePosts({
      likedBy: [userIdentifier],
      offset: 0,
      limit: frontendConfig.feed.defaultAmount,
    });

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
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
            count={userMumbleLikes.count}
            data={userMumbleLikes.data}
            next={userMumbleLikes.next}
            prev={userMumbleLikes.prev}
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
