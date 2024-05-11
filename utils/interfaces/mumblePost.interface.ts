import { EMediaTypes, EResponseMumbleStatus } from '@/utils/enums/general.enum';

// response mumble api
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

// response mumble api
export interface IPostReplyItemBase extends IPostItemBase {
  parentId: string;
}

// used within the app. enriched with date
export interface IPostItem extends IPostItemBase {
  createdTimestamp: number;
}

// used within the app. enriched with dat
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
  avatarUrl: string | null;
  firstname?: string;
  lastname?: string;
}

export interface IGetPostsParams {
  limit?: number;
  offset?: number;
  newerThan?: string;
  olderThan?: string;
  text?: string;
  likedBy?: string[];
  creators?: string[];
  tags?: string[];
  mumbleNextUrl?: string;
}

export interface IServerActionResponse<T> {
  status: EResponseMumbleStatus;
  message?: string;
  data?: T;
}
