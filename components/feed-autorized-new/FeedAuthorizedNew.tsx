'use client';
import React from 'react';
import { PostEditor } from '@/components/post-editor/PostEditor';
import RecommendationsBox from '@/components/recommendations-box/RecommendationsBox';
import {
  ETypographyLevels,
  Heading,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { useRouter } from 'next/navigation';

interface IProps {
  userIdentifier: string;
}

const FeedAuthorizedNew = ({ userIdentifier }: IProps) => {
  const router = useRouter();
  return (
    <div className="">
      <PostEditor
        revalidationsPath="/feed/new"
        isFeedPage={true}
        title="All is too empty over here"
        subTitle="Start following people to see their posts"
        onNewPost={() => {
          router.push(`/profiles/${userIdentifier}`);
        }}
      />

      <div className="max-w-4xl mr-auto ml-auto">
        <div className="mb-8">
          <RecommendationsBox
            userIdentifier={userIdentifier}
            titleNoMoreRecommendations="No more suggestions"
            title="Recommended users"
            revalidationPath={'/feed/new'}
          />
        </div>
        <div className="mb-4">
          <Heading level={ETypographyLevels.THREE} text="Recommended mumbles" />
        </div>
        <PostsLoader
          subscribeToNewestPost={false}
          isLikes={false}
          fetchOnlyOneBatch={true}
        />
      </div>
    </div>
  );
};

export default FeedAuthorizedNew;
