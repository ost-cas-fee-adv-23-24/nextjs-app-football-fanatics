export interface IFetchPostsOptions {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  newerThan?: string;
}
