'use client';

import React from 'react';
import { PostEditor } from '@/components/post-editor/PostEditor';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import usePosts from '@/hooks/usePosts';

interface IProps {
  revalidationsPath: string;
  loggedInUser: string;
  creators: string[];
}

const FeedAuthorized = ({
  revalidationsPath,
  creators,
  loggedInUser,
}: IProps) => {
  const { restartFeedAuthorized } = usePosts();

  return (
    <div className="">
      <PostEditor
        isFeedPage={true}
        title="Hey, What is new?"
        useFloatingAvatar={true}
        revalidationsPath={revalidationsPath} // backend path to revalidate
        onNewPost={() => {
          restartFeedAuthorized(loggedInUser, creators);
        }}
      />
      <PostsLoader
        creators={creators}
        isLikes={false}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </div>
  );
};

export default FeedAuthorized;
