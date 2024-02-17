import { EMediaTypes } from '@/utils/enums/general.enum';

export interface IPostItemBase {
  text: string;
  id: string;
  creator: IPostCreator;
  mediaUrl: string | null;
  mediaType: EMediaTypes | null;
  likes: number;
  replies: number;
  likedBySelf: boolean;
}

export interface IPostItem extends IPostItemBase {
  createdTimestamp: number;
}

export interface IPostLike {
  token: string;
  identifier: string;
}

export interface IPostsApiResponse {
  count: number;
  data: IPostItem[];
  next: string | null;
  previous: string | null;
}

export interface IPostCreator {
  id: number;
  username: string;
  avatarUrl: string;
}

export type IGetPostsParams = {
  limit?: number;
  offset?: number;
  newerThanPostId?: string;
  olderThanPostId?: string;
  text?: string;
  likedBy?: string[];
  creators?: string[];
  tags?: string[];
};