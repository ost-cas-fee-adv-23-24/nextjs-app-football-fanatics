import { createContext } from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

export enum EPostsActions {
  SET_LOADING = 'setLoading',
  SET_POSTS_PAYLOAD = 'setPostsPayload',
  SET_OPTIONS = 'setOptions',
  RESET = 'reset',
  SET_NEWEST_POST = 'setNewestPost',
  SET_NEW_POSTS_QUEUE_PAYLOAD = 'setNewPostsPayload',
  SET_POSTS_QUEUE = 'setNewPosts',
}

export const initialValuesPostProvider = {
  newestPost: null as IPostItem | null,
  posts: [] as IPostItem[],
  isLoading: false,
  hasNext: true,
  offset: 0,
  limit: 0,
  newPostsRendered: [] as IPostItem[],
  dispatchPosts: (options: { type: EPostsActions; payload: any }) => {},
};

const PostsContext = createContext(initialValuesPostProvider);
PostsContext.displayName = 'PostsContext';

export default PostsContext;
