export type ApiResponseType<T> = {
  count: number;
  data: T;
  next: string | null;
  previous: string | null;
};

export type Post = {
  id: string;
  replies: number;
  creator: Creator;
  text: string;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  createdTimestamp: number;
};

type Creator = {
  id: string;
  username: string;
  avatarUrl: string | null;
};
