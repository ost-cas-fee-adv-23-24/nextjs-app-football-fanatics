'use client';
import React, { useEffect } from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostCard } from '@/components/post-card/PostCard';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';

const PostsNewLoader = () => {
  const { dispatchPosts, newPostsRendered } = usePosts();

  return (
    <>
      {newPostsRendered.map((post: IPostItem, index) => {
        return (
          <div
            className="bg-white py-8 px-12 relative rounded-2xl mb-6"
            key={post.id}
            data-identifier={post.id}
          >
            <PostCard
              key={`${post.id}`}
              text={post.text}
              id={post.id}
              creator={post.creator}
              mediaUrl={post.mediaUrl}
              mediaType={post.mediaType}
              likes={post.likes}
              replies={post.replies}
              likedBySelf={post.likedBySelf}
            />
            <div className="mt-3 ml-[-12px]">
              <PostActionsBar
                creatorIdentifier={post.creator.id}
                identifier={post.id}
                amountLikes={post.likes}
                amountComments={post.replies}
                selfLiked={post.likedBySelf}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostsNewLoader;
