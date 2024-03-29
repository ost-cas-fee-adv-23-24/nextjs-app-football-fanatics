export interface IFetchPostsOptions {
  offset: number;
  limit: number;
  userIdentifier?: string;
  isLikes?: boolean;
  newerThan?: string;
  creators?: string[];
}

export interface IParamsOnlyIdentifierCtx {
  params: { identifier: number };
}
