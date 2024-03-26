export interface IFetchPostsOptions {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  newerThan?: string;
}

export interface IParamsOnlyIdentifierCtx {
  params: { identifier: number };
}
