import { IPostsProviderState } from '@/providers/posts/utils/posts.interface';
import { EPostsActions } from '@/stores/Posts.context';
import { cloneDeep } from 'lodash';

export const reducerPosts = (
  state: IPostsProviderState,
  action: { type: EPostsActions; payload: any },
) => {
  const copyState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case EPostsActions.SET_POSTS_QUEUE:
      copyState.posts = [...copyState.newPostsQueue, ...copyState.posts];
      copyState.newPostsQueue = [];
      return copyState;
    case EPostsActions.SET_NEW_POSTS_QUEUE_PAYLOAD:
      copyState.newPostsQueue = payload;
      return copyState;
    case EPostsActions.SET_NEWEST_POST:
      copyState.newestPost = payload;
      return copyState;
    case EPostsActions.SET_LOADING:
      copyState.isLoading = payload;
      return copyState;
    case EPostsActions.SET_POSTS_PAYLOAD:
      copyState.posts = payload.posts;
      copyState.nextMumblePostsUrl = payload.next;
      return copyState;
    case EPostsActions.SET_OPTIONS:
      copyState.nextMumblePostsUrl = null;
      copyState.userIdentifier = payload.userIdentifier || undefined;
      copyState.isLikes = payload.isLikes || undefined;
      copyState.creators = payload.creators || undefined;
      return copyState;
    case EPostsActions.RESET:
      copyState.posts = [];
      copyState.newPostsQueue = [];
      copyState.userIdentifier = undefined;
      copyState.isLoading = false;
      copyState.nextMumblePostsUrl = null;
      copyState.newestPost = null;
      copyState.isLikes = undefined;
      copyState.creators = undefined;
      return copyState;
    default:
      return copyState;
  }
};
