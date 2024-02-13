export type TApiResponseType<T> = {
  count: number;
  data: T;
  next: string | null;
  previous: string | null;
};

export type TPost = {
  id: string;
  replies: number;
  creator: TUser;
  text: string;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  createdTimestamp: number;
};

export type TUser = {
  id: string;
  username: string;
  avatarUrl: string | null;
  firstname?: string;
  lastname?: string,
};
