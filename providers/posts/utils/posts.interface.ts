import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import { Dispatch } from 'react';
import { EPostsActions } from '@/stores/Posts.context';

export interface IPostsProviderState {
  isLoading: boolean;
  posts: IPostItem[];
  nextMumblePostsUrl: string | null;
  userIdentifier?: string;
  isLikes?: boolean;
  creators?: string[];
  newestPost?: IPostItem | null;
  newPostsQueue: IPostItem[];
}

export interface IPostsProviderContextData {
  posts: IPostItem[];
  newestPost: IPostItem | null | undefined;
  isLoading: boolean;
  nextMumblePostsUrl: string | null;
  dispatchPosts: Dispatch<{ type: EPostsActions; payload: any }>;
  fetchPostsBatch: (options: IFetchPostsBatchArgs) => void;
}

export interface IFetchPostsBatchArgs {
  nextUrl?: string;
  userIdentifier?: string;
  creators?: string[];
  isLikes?: boolean;
}
