'use client';
import { useEffect } from 'react';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import usePosts from '@/hooks/usePosts';
import { EPostsActions } from '@/stores/Posts.context';

interface IProps {
  post: IPostItem;
}

export const NewestPost = ({ post }: IProps) => {
  const { dispatchPosts } = usePosts();
  useEffect(() => {
    dispatchPosts({
      type: EPostsActions.SET_NEWEST_POST,
      payload: post,
    });
  }, []);
  return null;
};
