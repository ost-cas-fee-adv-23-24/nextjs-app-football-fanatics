'use client';
import PostsContext, { EPostsActions } from '@/stores/Posts.context';
import { ReactNode, useEffect, useReducer } from 'react';
import {
  IPostItem,
  IPostsApiResponse,
} from '@/utils/interfaces/mumblePost.interface';

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
  creators?: string[];
}

const reducer = (
  state: IPostsProviderState,
  action: { type: EPostsActions; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
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
        creators: payload.creators || undefined,
      };
    case EPostsActions.RESET:
      return {
        userIdentifier: undefined,
        posts: [],
        isLoading: false,
        hasNext: true,
        offset: 0,
        limit: 0,
        isLikes: undefined,
        creators: undefined,
      };
    default:
      return state;
  }
};

const fetchPosts = async ({
  offset,
  limit,
  userIdentifier,
  isLikes = false,
  creators,
}: {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  creators?: string[];
}): Promise<{ posts: IPostItem[]; hasNext: boolean }> => {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (userIdentifier) {
    params.append('userIdentifier', userIdentifier);
    if (isLikes) {
      params.append('likedBy', userIdentifier);
    }
  }

  if (creators && creators.length > 0) {
    params.append('creators', creators.join(','));
  }

  const responseApi = await fetch(`/api/posts?${params.toString()}`, {
    method: 'GET',
  });

  const { data, next } = (await responseApi.json()) as IPostsApiResponse;
  return { posts: data, hasNext: !!next };
};

export const PostsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    isLoading: false,
    hasNext: true,
    offset: 0,
    limit: 0,
    creators: undefined,
  });
  const { offset, hasNext, posts, limit, isLoading, userIdentifier, creators } =
    state;

  useEffect(() => {
    // we dont fetch initially. the first batch is rendered by the server
    if ((offset === 0 && limit === 0) || isLoading || !hasNext) return;

    (async () => {
      try {
        dispatch({
          type: EPostsActions.SET_LOADING,
          payload: true,
        });
        const { posts: postsFetched, hasNext } = await fetchPosts({
          limit: limit,
          offset: offset,
          userIdentifier: userIdentifier,
          creators,
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
  }, [offset, limit, userIdentifier, creators]);

  return (
    <PostsContext.Provider
      value={{
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
