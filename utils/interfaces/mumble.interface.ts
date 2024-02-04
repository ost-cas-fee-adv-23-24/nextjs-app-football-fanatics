import { EMediaTypes } from '@/utils/enums/general.enum';

export interface IMumbleItem {
  text: string;
  id: string;
  creator: IMumbleCreator;
  mediaUrl: string | null;
  mediaType: EMediaTypes | null;
  likes: number;
  replies: number;
  likedBySelf: boolean;
}

export interface IMumbleCreator {
  id: number;
  username: string;
  avatarUrl: string;
}
