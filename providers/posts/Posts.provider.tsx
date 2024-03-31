'use client';
import PostsContext, { EPostsActions } from '@/stores/Posts.context';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import {
  fetchPostsFrontend,
  fetchPostsFrontendByMumbleNextUrl,
} from '@/utils/helpers/posts/getMumblePostsFrontend';
import { Id, toast } from 'react-toastify';
import {
  EIConTypes,
  EParagraphSizes,
  Paragraph,
  ToggleGeneric,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { frontendConfig } from '@/config';
import { reducerPosts } from '@/providers/posts/reducer';
import { IFetchPostsBatchArgs } from '@/providers/posts/utils/posts.interface';

interface IProps {
  children: ReactNode;
}

export const PostsProvider = ({ children }: IProps) => {
  const currentNotification = useRef<null | Id>(null);
  // remaining time interval makes that the whole component re-renders every 30 seconds ... i dont like it
  const [remainingTime, setRemainingTime] = useState(0);
  const [state, dispatch] = useReducer(reducerPosts, {
    posts: [],
    newPostsRendered: [],
    newPostsQueue: [],
    userIdentifier: undefined,
    isLoading: false,
    nextMumblePostsUrl: null,
    newestPost: null,
    isLikes: undefined,
    creators: undefined,
  });

  const {
    nextMumblePostsUrl,
    posts,
    isLoading,
    userIdentifier,
    newestPost,
    newPostsRendered,
    newPostsQueue,
    creators,
    isLikes,
  } = state;

  const interval = useRef();
  const fetchedUrls = useRef<string[]>([]);

  const fetchPostsBatch = useCallback(
    async ({
      nextUrl,
      userIdentifier,
      creators,
      isLikes = false,
    }: IFetchPostsBatchArgs) => {
      dispatch({
        type: EPostsActions.SET_LOADING,
        payload: true,
      });

      dispatch({
        type: EPostsActions.SET_OPTIONS,
        payload: {
          creators,
          isLikes,
        },
      });
      if (!nextUrl) {
        const { posts: postsFetched, next } = await fetchPostsFrontend({
          limit: frontendConfig.feed.defaultAmount,
          offset: 0,
          userIdentifier: userIdentifier,
          creators: creators,
          isLikes,
        });
        dispatch({
          type: EPostsActions.SET_NEWEST_POST,
          payload: postsFetched[0],
        });
        dispatch({
          type: EPostsActions.SET_POSTS_PAYLOAD,
          payload: { posts: postsFetched, next },
        });
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: false,
        });
      } else if (nextUrl && !isLoading) {
        if (fetchedUrls.current.includes(nextUrl)) return; // overreacting to not fetch the same url twice
        fetchedUrls.current.push(nextUrl); // guard to fetch only once
        const { posts: postsFetched, next } =
          await fetchPostsFrontendByMumbleNextUrl(nextUrl);

        const newPosts = [...posts, ...postsFetched];

        dispatch({
          type: EPostsActions.SET_POSTS_PAYLOAD,
          payload: { posts: newPosts, next },
        });
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: false,
        });
      }
    },
    [posts, userIdentifier, creators, nextMumblePostsUrl],
  );

  const fetchNewestPosts = useCallback(
    async (postIdentifier: string, creators?: string[]) => {
      console.log('fetchNewestPosts', postIdentifier, creators);
      const { posts: newestPostsFetched } = await fetchPostsFrontend({
        limit: 20,
        offset: 0,
        newerThan: postIdentifier,
        creators,
      });

      if (newestPostsFetched.length === 0) return;

      const newNewestPost = newestPostsFetched[0];
      dispatch({ type: EPostsActions.SET_NEWEST_POST, payload: newNewestPost });
      dispatch({
        type: EPostsActions.SET_NEW_POSTS_QUEUE_PAYLOAD,
        payload: [...newestPostsFetched, ...newPostsQueue],
      });
    },
    [newPostsQueue, creators],
  );

  useEffect(() => {
    if (newPostsQueue.length === 0) return;
    currentNotification.current = toast(
      <div className="flex flex-col text-center">
        <Paragraph size={EParagraphSizes.MEDIUM} text="New Posts Available" />
        <ToggleGeneric
          icon={EIConTypes.TIME}
          label={`Load posts (${newPostsQueue.length})`}
          labelActive="Loading..."
          effectDuration={300}
          customClickEvent={() => {
            dispatch({
              type: EPostsActions.SET_POSTS_QUEUE,
              payload: null,
            });
            toast.dismiss(currentNotification.current as Id);
            // scroll to top in posts Wrapper?
          }}
        />
      </div>,
      {
        position: 'bottom-right',
        autoClose: false,
      },
    );
  }, [newPostsQueue]);

  useEffect(() => {
    if (remainingTime !== 0) return;
    setTimer();
    if (newestPost && newestPost.id) {
      if (isLikes) return;
      fetchNewestPosts(newestPost.id, creators);
    }
  }, [newestPost, remainingTime, isLikes, creators]);

  const setTimer = () => {
    setRemainingTime((prev) => {
      return frontendConfig.newPostsRequestInterval;
    });
    clearInterval(interval.current);

    // @ts-ignore
    interval.current = setInterval(() => {
      setRemainingTime((prev) => {
        return prev - frontendConfig.newPostsRequestInterval / 2;
      });
    }, frontendConfig.newPostsRequestInterval / 2);
  };

  return (
    <PostsContext.Provider
      value={{
        nextMumblePostsUrl,
        newPostsRendered,
        newestPost,
        isLoading,
        posts,
        dispatchPosts: dispatch,
        fetchPostsBatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
