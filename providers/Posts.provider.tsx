'use client';
import PostsContext, { EPostsActions } from '@/stores/Posts.context';
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import { fetchPostsFrontend } from '@/utils/helpers/posts/getMumblePostsFrontend';
import { toast } from 'react-toastify';
import {
  EIConTypes,
  EParagraphSizes,
  Paragraph,
  ToggleGeneric,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  children: ReactNode;
}
export interface IPostsProviderState {
  isLoading: boolean;
  posts: IPostItem[];
  offset: number;
  limit: number;
  hasNext: boolean;
  userIdentifier?: string;
  isLikes?: boolean;
  newestPost?: IPostItem | null;
  newPostsQueue: IPostItem[];
  newPostsRendered: IPostItem[];
}

const reducer = (
  state: IPostsProviderState,
  action: { type: EPostsActions; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case EPostsActions.SET_POSTS_QUEUE:
      return {
        ...state,
        newPostsRendered: [...state.newPostsQueue, ...state.newPostsRendered],
        newPostsQueue: [],
      };
    case EPostsActions.SET_NEW_POSTS_QUEUE_PAYLOAD:
      return { ...state, newPostsQueue: payload };
    case EPostsActions.SET_NEWEST_POST:
      return { ...state, newestPost: payload };
    case EPostsActions.SET_LOADING:
      return { ...state, isLoading: payload };
    case EPostsActions.SET_POSTS_PAYLOAD:
      return { ...state, posts: payload.posts, hasNext: payload.hasNext };
    case EPostsActions.SET_OPTIONS:
      return {
        ...state,
        offset: payload.offset,
        limit: payload.limit,
        userIdentifier: payload.userIdentifier || undefined,
        isLikes: payload.isLikes || undefined,
      };
    case EPostsActions.RESET:
      return {
        userIdentifier: undefined,
        posts: [],
        newPostsRendered: [],
        newPostsQueue: [],
        isLoading: false,
        hasNext: true,
        offset: 0,
        limit: 0,
        isLikes: undefined,
      };
    default:
      return state;
  }
};

export const PostsProvider = ({ children }: IProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    isLoading: false,
    hasNext: true,
    offset: 0,
    limit: 0,
    newestPost: null,
    newPostsRendered: [],
    newPostsQueue: [],
  });
  const {
    offset,
    hasNext,
    posts,
    limit,
    isLoading,
    userIdentifier,
    newestPost,
    newPostsRendered,
    newPostsQueue,
  } = state;

  const interval = useRef();

  useEffect(() => {
    // we dont fetch initially. the first batch is rendered by the server
    if ((offset === 0 && limit === 0) || isLoading || !hasNext) return;

    (async () => {
      try {
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: true,
        });
        const { posts: postsFetched, hasNext } = await fetchPostsFrontend({
          limit: limit,
          offset: offset,
          userIdentifier: userIdentifier,
        });
        dispatch({
          type: EPostsActions.SET_POSTS_PAYLOAD,
          payload: { posts: [...posts, ...postsFetched], hasNext },
        });
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: false,
        });
      } catch (error) {}
    })();
  }, [offset, limit, userIdentifier]);

  const fetchNewestPosts = async (postIdentifier: string) => {
    const { posts: newestPostsFetched } = await fetchPostsFrontend({
      limit: 20,
      offset: 0,
      newerThan: postIdentifier,
    });

    if (newestPostsFetched.length === 0) return;

    const newNewestPost = newestPostsFetched[0];
    dispatch({ type: EPostsActions.SET_NEWEST_POST, payload: newNewestPost });
    dispatch({
      type: EPostsActions.SET_NEW_POSTS_QUEUE_PAYLOAD,
      payload: [...newestPostsFetched, ...newPostsQueue],
    });
  };

  useEffect(() => {
    if (newPostsQueue.length === 0) return;
    toast(
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
    if (remainingTime === 0) {
      setTimer();
      if (newestPost && newestPost.id) {
        fetchNewestPosts(newestPost.id);
      }
    }
  }, [remainingTime, newestPost]);

  const setTimer = () => {
    setRemainingTime(1000 * 10);
    clearInterval(interval.current);
    // @ts-ignore
    interval.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
    }, 1000);
  };

  return (
    <PostsContext.Provider
      value={{
        newPostsRendered,
        newestPost,
        isLoading,
        posts,
        offset,
        limit,
        hasNext,
        dispatchPosts: dispatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
