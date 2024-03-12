'use client';
import PostsContext, {
  EPostsActions,
  initialValuesPostProvider,
} from '@/stores/Posts.context';
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
      return { ...state, offset: payload.offset, limit: payload.limit };
    default:
      return state;
  }
};

const fetchPosts = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<{ posts: IPostItem[]; hasNext: boolean }> => {
  const responseApi = await fetch(
    `/api/posts?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
    },
  );

  const { data, next } = (await responseApi.json()) as IPostsApiResponse;
  return { posts: data, hasNext: !!next };
};

export const PostsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialValuesPostProvider,
  });
  const { offset, hasNext, posts, limit, isLoading } = state;

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
  }, [offset, limit]);

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
