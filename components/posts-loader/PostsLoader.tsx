'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  offset: number;
  limit: number;
}

const PostsLoader = ({ offset, limit }: IProps) => {
  const [limitIntern, setLimitIntern] = useState(limit);
  const [offsetIntern, setOffsetIntern] = useState(offset);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const responseApi = await fetch(
        `/api/posts?offset=${offsetIntern}&limit=${limitIntern}`,
        {
          method: 'GET',
        },
      );
      const { count, data } = await responseApi.json();
      setCount(count);
      setPosts((prevState) => [...prevState, ...data]);
      setLoading(false);
    })();
  }, [limitIntern, offsetIntern]);

  const observer = useRef();
  const placeholderRef = useCallback((node: any) => {
    if (loading) return;
    console.log(node);
  }, []);

  return (
    <div className="">
      <div className="results">
        {posts.map((post: IPostItem, index) => {
          return (
            <div
              ref={posts.length === index + 1 ? placeholderRef : undefined}
              className="bg-white py-8 px-12 relative rounded-2xl mb-6"
              key={post.id}
              data-identifier={post.id}
            >
              <PostCard
                key={`${post.id}--loaded`}
                text={post.text}
                id={post.id}
                creator={post.creator}
                mediaUrl={post.mediaUrl}
                mediaType={post.mediaType}
                likes={post.likes}
                replies={post.replies}
                likedBySelf={post.likedBySelf}
              />
            </div>
          );
        })}
      </div>
      {loading && (
        <div>
          <PostEditorPlaceholder />
        </div>
      )}
    </div>
  );
};

export default PostsLoader;
