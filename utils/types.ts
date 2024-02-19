export type TApiResponseType<T> = {
  count: number;
  data: T;
  next?: string;
  previous?: string;
};

export type TPost = {
  id: string;
  replies: number;
  creator: TUser;
  text: string;
  mediaUrl?: string;
  mediaType?: string;
  likes: number;
  likedBySelf?: boolean;
  createdTimestamp: number;
};

export type TUser = {
  id: string;
  username: string;
  avatarUrl?: string;
  firstname?: string;
  lastname?: string;
};
