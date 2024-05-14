import { createContext } from 'react';
import { IPostsProviderContextData } from '@/providers/posts/utils/posts.interface';

export enum EPostsActions {
  SET_LOADING = 'setLoading',
  SET_POSTS_PAYLOAD = 'setPostsPayload',
  SET_OPTIONS = 'setOptions',
  RESET = 'reset',
  SET_NEWEST_POST = 'setNewestPost',
  SET_NEW_POSTS_QUEUE_PAYLOAD = 'setNewPostsPayload',
  SET_POSTS_QUEUE = 'setNewPosts',
  DELETE_POST = 'deletePost',
  TOGGLE_LIKE_POST = 'toggleLikePost',
}

export enum ELikeToggleType {
  LIKE = 'like',
  UNLIKE = 'unlike',
}

const PostsContext = createContext<IPostsProviderContextData | null>(null);
PostsContext.displayName = 'PostsContext';

export default PostsContext;
