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

export interface IPostReply extends IPostItemBase {
  parentId: string;
  createdTimestamp: number;
}

export interface IPostData {
  count: number;
  data: IPostReply[];
  next: string;
  previous: string;
}

export interface IPostsApiResponse {
  count: number;
  data: IPostItem[];
  next: string | null;
  prev: string | null;
}

export interface IPostLike {
  token: string;
  identifier: string;
}

export interface ICreatePost {
  token: string;
  formData: FormData;
}

export interface IPostCreator {
  id: string;
  username: string;
  avatarUrl: string;
  firstname?: string;
  lastname?: string;
}

export interface IGetPostsParams {
  limit?: number;
  offset?: number;
  newerThanPostId?: string;
  olderThanPostId?: string;
  text?: string;
  likedBy?: string[];
  creators?: string[];
  tags?: string[];
}
