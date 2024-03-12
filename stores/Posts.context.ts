import { createContext } from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

export enum EPostsActions {
  SET_LOADING = 'setLoading',
  SET_POSTS_PAYLOAD = 'setPostsPayload',
  SET_OPTIONS = 'setOptions',
}

export const initialValuesPostProvider = {
  posts: [] as IPostItem[],
  isLoading: false,
  hasNext: true,
  offset: 0,
  limit: 0,
  dispatchPosts: (options: { type: EPostsActions; payload: any }) => {},
};

const PostsContext = createContext(initialValuesPostProvider);
PostsContext.displayName = 'PostsContext';

export default PostsContext;
