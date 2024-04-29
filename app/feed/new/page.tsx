import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import RecommendationsBox from '@/components/recommendations-box/RecommendationsBox';
import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { Session } from 'next-auth';
import React from 'react';
import {
  ETypographyLevels,
  Heading,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import PostsLoader from '@/components/posts-loader/PostsLoader';

// Is new user if the user is not following anyone.
// We could also check if the user has any posts.
// see middleware.ts

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;

  const profileData = await getMumbleUserByIdentifier({
    identifier: session.user.identifier,
  });

  return (
    <div className="mx-auto">
      <div className="global-width mx-auto pb-8 md:py-8">
        <Header user={profileData} />
      </div>
      <div className="global-width mx-auto px-8 md:px-0">
        <PostEditor
          isFeedPage={true}
          title="All is too empty over here"
          subTitle="Start following people to see their posts"
        />

        <div className="max-w-4xl mr-auto ml-auto">
          <div className="mb-8">
            <RecommendationsBox
              userIdentifier={session.user.identifier}
              titleNoMoreRecommendations="No more suggestions"
              title="Recommended users"
              revalidationPath={'/feed/new'}
            />
          </div>
          <div className="mb-4">
            <Heading
              level={ETypographyLevels.THREE}
              text="Recommended mumbles"
            />
          </div>
          <PostsLoader
            subscribeToNewestPost={false}
            isLikes={false}
            fetchOnlyOneBatch={true}
          />
        </div>
      </div>
    </div>
  );
}
