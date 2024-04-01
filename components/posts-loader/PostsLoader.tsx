'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { frontendConfig } from '@/config';
interface IProps {
  userIdentifier?: string;
  isLikes?: boolean;
  creators?: string[];
  isSample?: boolean;
}

const PostsLoader = ({
  userIdentifier,
  isLikes = false,
  creators,
  isSample = false,
}: IProps) => {
  const {
    posts,
    isLoading,
    nextMumblePostsUrl,
    dispatchPosts,
    fetchPostsBatch,
  } = usePosts();

  const renderSinglePost = (post: IPostItem, index: number) => {
    return (
      <div
        ref={posts.length === index + 1 ? lastPostRef : undefined}
        className="bg-white py-8 px-12 relative rounded-2xl mb-6 w-full"
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
  };

  useEffect(() => {
    fetchPostsBatch({
      userIdentifier,
      creators,
      isLikes,
      isSample,
    });
    return () => {
      dispatchPosts({
        type: EPostsActions.RESET,
        payload: null,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observer = useRef();

  const lastPostRef = useCallback(
    (node: any) => {
      if (observer.current) {
        // @ts-ignore
        observer.current.disconnect();
      }
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          if (nextMumblePostsUrl) {
            fetchPostsBatch({
              nextUrl: nextMumblePostsUrl,
              creators,
              isLikes,
            });
          }
        }
      });
      if (node) {
        // @ts-ignore
        observer.current.observe(node);
      }
    },
    [isLoading, nextMumblePostsUrl, creators, isLikes, fetchPostsBatch],
  );

  return (
    <div className="global-width mx-auto">
      {(() => {
        if (posts.length === 0 && !isLoading) {
          const placeholders = Array.from({
            length: frontendConfig.feed.defaultAmount,
          });
          return (
            <>
              {placeholders.map((_, index) => (
                <PostEditorPlaceholder key={index} />
              ))}
            </>
          );
        } else {
          return posts.map((post, index) => renderSinglePost(post, index));
        }
      })()}
    </div>
  );
};

export default PostsLoader;
