'use client';
import React, { useEffect } from 'react';
import { IPostItem } from '@/services/Post/post.interface';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';

const PostFeed = () => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('api/feed', { method: 'GET' });
      const data = await response.json();
      setPosts(data.data);
    })();
  }, []);
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
