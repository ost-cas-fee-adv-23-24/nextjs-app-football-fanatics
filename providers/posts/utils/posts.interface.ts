import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import { Dispatch } from 'react';
import { EPostsActions } from '@/stores/Posts.context';

export interface IPostsProviderState {
  isLoading: boolean;
  posts: IPostItem[];
  nextMumblePostsUrl: string | null;
  subscribeToNewestPost?: boolean;
  isLikes?: boolean;
  fetchOnlyOneBatch?: boolean;
  newestPost?: IPostItem | null;
  newPostsQueue: IPostItem[];
  creators?: string[];
}

export interface IPostsProviderContextData {
  posts: IPostItem[];
  newestPost: IPostItem | null | undefined;
  isLoading: boolean;
  nextMumblePostsUrl: string | null;
  dispatchPosts: Dispatch<{ type: EPostsActions; payload: any }>;
  fetchPostsBatch: (options: IFetchPostsBatchArgs) => void;
  restartFeedAuthorized: (userIdentifier: string, creators?: string[]) => void;
  restartFeedAuthorizedLikes: (userIdentifier: string) => void;
  getPostByIdentifier: (postIdentifier: string) => IPostItem | undefined;
}

export interface IFetchPostsBatchArgs {
  nextUrl?: string;
  userIdentifier?: string;
  creators?: string[];
  subscribeToNewestPost?: boolean;
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
  customAmount?: number;
}
