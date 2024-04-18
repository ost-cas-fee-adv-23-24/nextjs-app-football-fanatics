'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { PostFix } from '@/components/post/PostFix';
import useLayoutMumble from '@/hooks/useLayoutMumble';
import { ELayoutKind } from '@/providers/LayoutMumble.provider';
import { frontendConfig } from '@/config';

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
  const customAmountPosts = frontendConfig.feed.fixed.defaultAmount;
  const initialApproxHeight = 277;
  const [scrollTop, setScrollTop] = useState(0);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [rowHeight, setRowHeight] = useState(initialApproxHeight);
  const [totalHeight, setTotalHeight] = useState(rowHeight * customAmountPosts);
  const containerRef = useRef(null);
  const { setLayoutKind } = useLayoutMumble();
  setLayoutKind(ELayoutKind.SCROLLABLE);

  let startIndex = Math.floor(scrollTop / rowHeight);
  let endIndex = Math.min(
    startIndex + Math.ceil(availableHeight / rowHeight) + 1,
    numRows,
  );

  const getNewSizes = useCallback(
    (amountPosts: number) => {
      const myElementReference = document.querySelector('.post-wrapper');
      // intelliJ is not able to resolve the clientHeight
      // @ts-ignore
      const availableHeight = containerRef.current?.clientHeight;

      const totalHeight =
        // intelliJ is not able to resolve the offsetHeight
        // @ts-ignore
        (myElementReference?.offsetHeight || initialApproxHeight) * amountPosts;
      return {
        totalHeight,
        // intelliJ is not able to resolve the offsetHeight
        // @ts-ignore
        row: myElementReference?.offsetHeight || initialApproxHeight,
        availableHeight,
      };
    },
    [containerRef.current],
  );

  useEffect(() => {
    const resizeListener = () => {
      const newData = getNewSizes(
        posts.length === 0 ? customAmountPosts : posts.length,
      );
      setRowHeight(newData.row);
      setTotalHeight(newData.totalHeight);
      setAvailableHeight(newData.availableHeight);
    };

    // try to avoid adding the listener multiple times
    window.addEventListener('resize', resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [getNewSizes, posts.length]);

  useEffect(() => {
    // @ts-ignore
    fetchPostsBatch({
      userIdentifier,
      creators,
      subscribeToNewestPost,
      fetchOnlyOneBatch,
      isLikes,
      customAmount: customAmountPosts,
    });

    const newData = getNewSizes(customAmountPosts);
    setRowHeight(newData.row);
    setTotalHeight(newData.totalHeight);
    setAvailableHeight(newData.availableHeight);

    return () => {
      setLayoutKind(ELayoutKind.DEFAULT);
      dispatchPosts({
        type: EPostsActions.RESET,
        payload: null,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: any) => {
      if (observer.current) {
        observer.current.disconnect();
      }

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
        className="post-wrapper px-10 lg:px-0"
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
    <div className="grow overflow-hidden flex flex-col">
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
          {posts.length === 0 && (
            <>
              <PostEditorPlaceholder />
              <PostEditorPlaceholder />
              <PostEditorPlaceholder />
            </>
          )}
          {postsToRender}
        </div>
      </div>
    </div>
  );
};
