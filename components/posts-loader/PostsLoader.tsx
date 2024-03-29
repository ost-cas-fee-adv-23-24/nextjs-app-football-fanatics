'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { frontendConfig } from '@/config';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';

interface IProps {
  userIdentifier?: string;
  isLikes?: boolean;
}

const PostsLoader = ({ userIdentifier, isLikes = false }: IProps) => {
  const { posts, limit, offset, isLoading, hasNext, dispatchPosts } =
    usePosts();

  // fire only once
  useEffect(() => {
    dispatchPosts({
      type: EPostsActions.SET_OPTIONS,
      payload: {
        offset: frontendConfig.feed.defaultAmount,
        limit: frontendConfig.feed.defaultAmount,
        userIdentifier,
        isLikes,
      },
    });
    return () => {
      dispatchPosts({
        type: EPostsActions.RESET,
        payload: null,
      });
    };
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
        if (entries[0].isIntersecting && hasNext) {
          dispatchPosts({
            type: EPostsActions.SET_OPTIONS,
            payload: {
              offset: offset + frontendConfig.feed.defaultAmount,
              limit,
              userIdentifier,
              isLikes,
            },
          });
        }
      });
      if (node) {
        // @ts-ignore
        observer.current.observe(node);
      }
    },
    [
      isLoading,
      userIdentifier,
      offset,
      limit,
      hasNext,
      frontendConfig.feed.defaultAmount,
      dispatchPosts,
    ],
  );

  return (
    <>
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
      {isLoading && <PostEditorPlaceholder />}
    </>
  );
};

export default PostsLoader;
