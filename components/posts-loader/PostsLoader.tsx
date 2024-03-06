'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import { PostCard } from '@/components/post-card/PostCard';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import _ from 'lodash';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { frontendConfig } from '@/config';

interface IProps {
  offset: number;
  limit: number;
  hasNext: boolean;
}

const PostsLoader = ({ offset, limit, hasNext }: IProps) => {
  const [offsetIntern, setOffsetIntern] = useState(offset);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<any>>([]);
  const [hasNextIntern, setHasNextIntern] = useState(hasNext);

  useEffect(() => {
    (async () => {
      if (hasNextIntern) {
        setLoading(true);
        // can we use a server action here?
        const responseApi = await fetch(
          `/api/posts?offset=${offsetIntern}&limit=${limit}`,
          {
            method: 'GET',
          },
        );
        const { data, next } = await responseApi.json();
        const postsUnique = _.uniqBy([...posts, ...data], 'id'); // to avoid strict mode 2x loading ... not needed in prod
        setPosts(postsUnique);
        setHasNextIntern(!!next);
        setLoading(false);
      } else {
        console.log('no more posts to load');
      }
    })();
  }, [offsetIntern, hasNext]);

  const observer = useRef();
  const lastPostRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) {
        // @ts-ignore
        observer.current.disconnect();
      }
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('reached to the last post');
          setOffsetIntern(
            (prevState) => prevState + frontendConfig.feed.defaultAmount,
          );
        }
      });
      if (node) {
        // @ts-ignore
        observer.current.observe(node);
      }
    },
    [loading],
  );

  return (
    <>
      <div className="results">
        {posts.map((post: IPostItem, index) => {
          return (
            <div
              ref={posts.length === index + 1 ? lastPostRef : undefined}
              className="bg-white py-8 px-12 relative rounded-2xl mb-6"
              key={post.id}
              data-identifier={post.id}
            >
              <PostCard
                key={`${post.id}`}
                text={post.text}
                id={post.id}
                creator={post.creator}
                mediaUrl={post.mediaUrl}
                mediaType={post.mediaType}
                likes={post.likes}
                replies={post.replies}
                likedBySelf={post.likedBySelf}
              />
              <div className="mt-3 ml-[-12px]">
                <PostActionsBar
                  creatorIdentifier={post.creator.id}
                  identifier={post.id}
                  amountLikes={post.likes}
                  amountComments={post.replies}
                  selfLiked={post.likedBySelf}
                />
              </div>
            </div>
          );
        })}
      </div>
      {loading && (
        <div>
          <PostEditorPlaceholder />
        </div>
      )}
    </>
  );
};

export default PostsLoader;
