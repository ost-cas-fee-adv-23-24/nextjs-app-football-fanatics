'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
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
  const customAmountPosts = 100;
  const [scrollTop, setScrollTop] = useState(0);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [rowHeight, setRowHeight] = useState(277);
  const [totalHeight, setTotalHeight] = useState(rowHeight * customAmountPosts);
  const containerRef = useRef(null);

  let startIndex = Math.floor(scrollTop / rowHeight);
  let endIndex = Math.min(
    startIndex + Math.ceil(availableHeight / rowHeight) + 1,
    numRows,
  );

  const getNewSizes = useCallback(
    (amountPosts: number) => {
      const myElementReference = document.querySelector('.post-wrapper');
      // @ts-ignore
      const availableHeight = containerRef.current?.clientHeight;

      const totalHeight =
        // @ts-ignore
        (myElementReference?.offsetHeight || 277) * amountPosts;
      return {
        totalHeight,
        // @ts-ignore
        row: myElementReference?.offsetHeight || 277,
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
      console.log('resize fired: ', newData);
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
          {posts.length === 0 && <PostEditorPlaceholder />}
          {postsToRender}
        </div>
      </div>
    </div>
  );
};
