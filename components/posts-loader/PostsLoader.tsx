'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { Post } from '@/components/post/Post';
import useBreakpoints from '@/hooks/useBreakpoints';
import frontendConfig from '@/config/configFrontend';
interface IProps {
  userIdentifier?: string;
  subscribeToNewestPost?: boolean;
  creators?: string[];
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
  revalidationPath?: string;
}

const PostsLoader = ({
  userIdentifier,
  subscribeToNewestPost = false,
  creators,
  fetchOnlyOneBatch = false,
  isLikes = false,
  revalidationPath,
}: IProps) => {
  const { posts, nextMumblePostsUrl, dispatchPosts, fetchPostsBatch } =
    usePosts();
  const { isBpMDDown } = useBreakpoints();

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

  const observer = useRef<IntersectionObserver | null>();

  const lastPostRef = useCallback(
    (node: any) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
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
        },
        { rootMargin: frontendConfig.feed.observerRootMargin },
      );
      if (node) {
        observer.current.observe(node);
      }
    },
    [
      nextMumblePostsUrl,
      creators,
      subscribeToNewestPost,
      fetchPostsBatch,
      fetchOnlyOneBatch,
      isLikes,
    ],
  );

  return (
    <div className="global-width mx-auto">
      {(() => {
        if (posts.length === 0) {
          return <PostEditorPlaceholder />;
        } else {
          return posts.map((post, index) => {
            return (
              <div
                data-identifier={post.id}
                ref={posts.length === index + 1 ? lastPostRef : undefined}
                key={post.id}
              >
                <Post
                  useFloatingAvatar={!isBpMDDown}
                  postData={post}
                  revalidationPath={revalidationPath}
                  renderedInLikeFeed={isLikes}
                />
              </div>
            );
          });
        }
      })()}
    </div>
  );
};

export default PostsLoader;
