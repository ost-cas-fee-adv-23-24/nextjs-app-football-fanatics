import { EMediaTypes } from '@/utils/enums/general.enum';

export interface IPostItem {
  text: string;
  id: string;
  creator: IPostCreator;
  mediaUrl: string | null;
  mediaType: EMediaTypes | null;
  likes: number;
  replies: number;
  likedBySelf: boolean;
}

export interface IPostCreator {
  id: number;
  username: string;
  avatarUrl: string;
}
