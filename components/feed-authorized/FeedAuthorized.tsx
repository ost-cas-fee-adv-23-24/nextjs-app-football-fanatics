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

const FeedAuthorized = ({ creators, loggedInUser }: IProps) => {
  const { restartFeedAuthorized } = usePosts();

  return (
    <>
      <PostEditor
        isFeedPage={true}
        title="Hey, What is new?"
        useFloatingAvatar={true}
        // revalidationsPath={revalidationsPath} // backend path to revalidate -- page flashes. better to
        // to fetch the data again only ... use onNewPost
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
    </>
  );
};

export default FeedAuthorized;
