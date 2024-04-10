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
import _orderBy from 'lodash/orderBy';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  children: ReactNode;
}

export const PostsProvider = ({ children }: IProps) => {
  const currentNotification = useRef<null | Id>(null);
  // remaining time interval makes that the whole component re-renders every 30 seconds ... i dont like it
  const [remainingTime, setRemainingTime] = useState(0);
  const [state, dispatch] = useReducer(reducerPosts, {
    posts: [],
    newPostsQueue: [],
    isLoading: false,
    nextMumblePostsUrl: null,
    newestPost: null,
    subscribeToNewestPost: undefined,
    fetchOnlyOneBatch: false,
  });

  const interval = useRef();

  const fetchPostsBatch = useCallback(
    async ({
      nextUrl,
      userIdentifier,
      creators,
      subscribeToNewestPost = false,
      fetchOnlyOneBatch = false,
      isLikes = false,
      customAmount,
    }: IFetchPostsBatchArgs) => {
      dispatch({
        type: EPostsActions.SET_LOADING,
        payload: true,
      });

      dispatch({
        type: EPostsActions.SET_OPTIONS,
        payload: {
          creators,
          subscribeToNewestPost,
          fetchOnlyOneBatch,
          isLikes,
        },
      });

      if (!nextUrl) {
        const { posts: postsFetched, next } = await fetchPostsFrontend({
          limit: customAmount
            ? customAmount
            : fetchOnlyOneBatch
              ? frontendConfig.feed.sample.toFetch
              : frontendConfig.feed.defaultAmount,
          offset: 0,
          userIdentifier,
          creators,
          isLikes,
        });
        dispatch({
          type: EPostsActions.SET_NEWEST_POST,
          payload: postsFetched[0],
        });

        dispatch({
          type: EPostsActions.SET_POSTS_PAYLOAD,
          payload: {
            posts: fetchOnlyOneBatch
              ? _orderBy(postsFetched, ['likes'], ['desc']).slice(
                  0,
                  frontendConfig.feed.sample.toPick,
                )
              : postsFetched,
            next: fetchOnlyOneBatch ? null : next,
          },
        });
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: false,
        });
      } else if (nextUrl && !state.isLoading) {
        const { posts: postsFetched, next } =
          await fetchPostsFrontendByMumbleNextUrl(nextUrl);

        const newPosts = [...state.posts, ...postsFetched];

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
    [state.posts, state.isLoading],
  );

  const fetchNewestPosts = useCallback(
    async (
      postIdentifier: string,
      creators?: string[],
    ): Promise<IPostItem[]> => {
      const responseApi = await fetchPostsFrontend({
        limit: 20,
        offset: 0,
        newerThan: postIdentifier,
        creators,
      });
      return responseApi.posts;
    },
    [state.newPostsQueue],
  );

  useEffect(() => {
    if (state.newPostsQueue.length === 0) return;
    toast.dismiss();
    currentNotification.current = toast(
      <div className="flex flex-col text-center">
        <Paragraph size={EParagraphSizes.MEDIUM} text="New Posts Available" />
        <ToggleGeneric
          icon={EIConTypes.TIME}
          label={`Load posts (${state.newPostsQueue.length})`}
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
  }, [state.newPostsQueue]);

  useEffect(() => {
    if (remainingTime === 0) {
      setTimer();

      if (state.newestPost && state.newestPost.id) {
        if (!state.subscribeToNewestPost) {
          return; // no newest check on likes only feed. neither for sample for new users
        }

        fetchNewestPosts(state.newestPost.id, state.creators).then(
          (newestPostsFetched) => {
            if (newestPostsFetched.length === 0) return;

            const newNewestPost = newestPostsFetched[0];
            dispatch({
              type: EPostsActions.SET_NEWEST_POST,
              payload: newNewestPost,
            });
            dispatch({
              type: EPostsActions.SET_NEW_POSTS_QUEUE_PAYLOAD,
              payload: [...newestPostsFetched, ...state.newPostsQueue],
            });
          },
        );
      }
    }
  }, [
    state.newestPost,
    remainingTime,
    state.subscribeToNewestPost,
    state.creators,
    fetchNewestPosts,
  ]);

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
        nextMumblePostsUrl: state.nextMumblePostsUrl,
        newestPost: state.newestPost,
        isLoading: state.isLoading,
        posts: state.posts,
        dispatchPosts: dispatch,
        fetchPostsBatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
