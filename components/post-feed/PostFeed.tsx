'use client';
import React from 'react';
import { IPostItem } from '@/services/Post/post.interface';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';

interface IProps {
  posts: IPostItem[];
}

const PostFeed = ({ posts }: IProps) => {
  return posts.map((post: IPostItem, index: number) => {
    return (
      <div className="mb-3" key={index}>
        <PostCard
          creator={{
            id: post.creator.id,
            avatarUrl: post.creator.avatarUrl as string,
            username: post.creator.username,
          }}
          mediaUrl={post.mediaUrl ? `${post.mediaUrl}` : null}
          id={post.id}
          likedBySelf={post.likedBySelf ? post.likedBySelf : false}
          likes={post.likes}
          mediaType={EMediaTypes.IMAGE}
          replies={post.replies}
          text={post.text}
          onLike={() => {}}
          onUnlike={() => {}}
        />
      </div>
    );
  });
};

export default PostFeed;
