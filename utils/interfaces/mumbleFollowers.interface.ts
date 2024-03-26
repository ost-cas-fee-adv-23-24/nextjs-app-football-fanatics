export interface IMumbleFollowers {
  id: string;
  username: string;
  avatarUrl: string;
  firstname: string;
  lastname: string;
}

export interface IMumbleFollowersApiResponse {
  count: number;
  data: IMumbleFollowers[];
  next: string | null;
  prev: string | null;
}
