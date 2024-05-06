import { LegacyRef } from 'react';

export type TNodeObservedRef = LegacyRef<HTMLDivElement> | undefined;
export type TNodeObserved = HTMLDivElement | undefined;

export interface IPostLoaderPropsBase {
  userIdentifier?: string;
  subscribeToNewestPost?: boolean;
  creators?: string[];
  fetchOnlyOneBatch?: boolean;
  isLikes?: boolean;
}

export interface IPostLoaderDefaultProps extends IPostLoaderPropsBase {
  revalidationPath?: string;
}
