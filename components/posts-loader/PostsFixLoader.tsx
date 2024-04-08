'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { Post } from '@/components/post/Post';
import { PostFix } from '@/components/post/PostFix';
interface IProps {
  userIdentifier?: string;
  subscribeToNewestPost?: boolean;
  creators?: string[];
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
}

export const PostsFixLoader = ({
  userIdentifier,
  subscribeToNewestPost = false,
  creators,
  fetchOnlyOneBatch = false,
  isLikes = false,
}: IProps) => {
  const {
    posts,
    isLoading,
    nextMumblePostsUrl,
    dispatchPosts,
    fetchPostsBatch,
  } = usePosts();

  const numRows = posts.length;
  const [scrollTop, setScrollTop] = useState(0);
  const [availableHeight, setAvailableHeight] = useState(0);
  const rowHeight = 502.2;
  const totalHeight = rowHeight * numRows;
  const containerRef = useRef(null);
  let startIndex = Math.floor(scrollTop / rowHeight);
  let endIndex = Math.min(
    startIndex + Math.ceil(availableHeight / rowHeight) + 1,
    numRows,
  );

  useEffect(() => {
    // @ts-ignore
    setAvailableHeight(containerRef.current.clientHeight || 0);
  }, []);

  useEffect(() => {
    fetchPostsBatch({
      userIdentifier,
      creators,
      subscribeToNewestPost,
      fetchOnlyOneBatch,
      isLikes,
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
              subscribeToNewestPost,
              fetchOnlyOneBatch,
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
    [
      isLoading,
      userIdentifier,
      nextMumblePostsUrl,
      dispatchPosts,
      creators,
      isLikes,
    ],
  );

  const postsToRender = [];
  let index = startIndex;

  while (index < endIndex) {
    const currentPost = posts[index];
    postsToRender.push(
      <div
        data-identifier={currentPost.id}
        ref={posts.length === index + 1 ? lastPostRef : undefined}
        key={currentPost.id}
      >
        <PostFix postData={currentPost} />
      </div>,
    );
    index++;
  }

  return (
    <div className="posts-container grow overflow-hidden flex flex-col">
      <div
        className="overflow-y-scroll grow"
        ref={containerRef}
        onScroll={(evt) => {
          const target = evt.target as HTMLTextAreaElement;
          setScrollTop(target.scrollTop);
        }}
      >
        <div
          className="global-width mx-auto"
          style={{
            height: totalHeight,
            paddingTop: startIndex * rowHeight,
          }}
        >
          {posts.length === 0 && <PostEditorPlaceholder />}
          {postsToRender}
        </div>
      </div>
    </div>
  );
};
