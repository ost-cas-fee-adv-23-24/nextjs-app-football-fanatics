'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { frontendConfig } from '@/config';

const PostsLoader = () => {
  const { posts, limit, offset, isLoading, dispatchPosts } = usePosts();

  useEffect(() => {
    dispatchPosts({
      type: EPostsActions.SET_OPTIONS,
      payload: {
        offset: frontendConfig.feed.defaultAmount,
        limit: frontendConfig.feed.defaultAmount,
      },
    });
  }, []);

  const observer = useRef();
  const lastPostRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) {
        // @ts-ignore
        observer.current.disconnect();
      }
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('reached to the last post');
          dispatchPosts({
            type: EPostsActions.SET_OPTIONS,
            payload: {
              offset: offset + frontendConfig.feed.defaultAmount,
              limit,
            },
          });
        }
      });
      if (node) {
        // @ts-ignore
        observer.current.observe(node);
      }
    },
    [isLoading],
  );

  return (
    <>
      <div className="results">
        {posts.map((post: IPostItem, index) => {
          return (
            <div
              ref={posts.length === index + 1 ? lastPostRef : undefined}
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
      </div>
      {isLoading && (
        <div>
          <PostEditorPlaceholder />
        </div>
      )}
    </>
  );
};

export default PostsLoader;
