'use client';
import React from 'react';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import {
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import usePosts from '@/hooks/usePosts';
import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';

interface IProps {
  userIdentifier: string;
  subscribeToNewestPost?: boolean;
  creators?: string[];
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
}

const ProfileFeed = ({
  userIdentifier,
  subscribeToNewestPost = false,
  fetchOnlyOneBatch,
  creators,
  isLikes,
}: IProps) => {
  const { posts } = usePosts();

  return (
    <div>
      {posts.length === 0 && (
        <Paragraph
          size={EParagraphSizes.MEDIUM}
          text="No Likes yet, Hurry up! like some posts!"
        />
      )}
      <div className="mt-8">
        <PostsFixLoader
          isLikes={isLikes}
          userIdentifier={userIdentifier}
          subscribeToNewestPost={subscribeToNewestPost}
          creators={creators}
          fetchOnlyOneBatch={fetchOnlyOneBatch}
        />
      </div>
    </div>
  );
};

export default ProfileFeed;
