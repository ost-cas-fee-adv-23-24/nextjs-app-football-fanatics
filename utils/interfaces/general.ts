export interface IFetchPostsOptions {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  newerThan?: string;
  creators?: string[];
  isRecommended?: boolean;
}

export interface IParamsOnlyIdentifierCtx {
  params: { identifier: number };
}
