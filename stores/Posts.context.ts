import { createContext, Dispatch } from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

export enum EPostsActions {
  SET_LOADING = 'setLoading',
  SET_POSTS_PAYLOAD = 'setPostsPayload',
  SET_OPTIONS = 'setOptions',
  RESET = 'reset',
}

export interface IPostsProviderContextData {
  posts: IPostItem[];
  isLoading: boolean;
  hasNext: boolean;
  offset: number;
  limit: number;
  dispatchPosts: Dispatch<{ type: EPostsActions; payload: any }>;
}

const PostsContext = createContext<IPostsProviderContextData | null>(null);
PostsContext.displayName = 'PostsContext';

export default PostsContext;
