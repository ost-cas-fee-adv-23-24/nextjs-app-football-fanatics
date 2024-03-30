import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import { frontendConfig } from '@/config';
import RecommendationsBox from '@/components/recommendations-box/RecommendationsBox';
import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { Session } from 'next-auth';
import React from 'react';
import {
  ETypographyLevels,
  Heading,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;

  const options = {
    offset: 0,
    limit: frontendConfig.feed.defaultAmount,
  };

  const profileData = await getMumbleUserByIdentifier(session.user.identifier);
  const feedData = await getMumblePosts(options);

  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="global-width mx-auto py-8">
        <Header user={profileData} />
      </div>
      <div className="global-width mx-auto">
        <div>
          <PostEditor
            isFeedPage={true}
            title="All is too empty over here"
            subTitle="Start following people to see their posts"
          />
        </div>
        <div className="max-w-4xl mr-auto ml-auto">
          <div className="mb-8">
            <RecommendationsBox
              userIdentifier={session.user.identifier}
              titleNoMoreRecommendations="No more suggestions"
              title="Recommended users"
            />
          </div>
          <div className="mb-4">
            <Heading
              level={ETypographyLevels.THREE}
              text="Recommended mumbles"
            />
          </div>
          <PostFeed
            data={feedData.data}
            next={feedData.next}
            prev={feedData.prev}
            count={feedData.count}
          />
        </div>
      </div>
    </div>
  );
}
