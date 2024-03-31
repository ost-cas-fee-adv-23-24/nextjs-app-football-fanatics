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
  isLikes?: boolean;
  creators?: string[];
}

const ProfileFeed = ({ userIdentifier, isLikes = false, creators }: IProps) => {
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
        <PostsLoader
          userIdentifier={userIdentifier}
          isLikes={isLikes}
          creators={creators}
        />
      </div>
    </div>
  );
};

export default ProfileFeed;
