'use client';
import React from 'react';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import {
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import usePosts from '@/hooks/usePosts';

interface IProps {
  userIdentifier: string;
  subscribeToNewestPost?: boolean;
  creators?: string[];
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
  revalidationPath?: string;
  text?: string;
}

const ProfileFeed = ({
  userIdentifier,
  subscribeToNewestPost = false,
  fetchOnlyOneBatch,
  creators,
  isLikes,
  revalidationPath,
  text,
}: IProps) => {
  const { posts } = usePosts();

  return (
    <div>
      {posts.length === 0 && (
        <Paragraph size={EParagraphSizes.MEDIUM} text={text ? text : ''} />
      )}
      <div className="mt-8">
        <PostsLoader
          revalidationPath={revalidationPath}
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
