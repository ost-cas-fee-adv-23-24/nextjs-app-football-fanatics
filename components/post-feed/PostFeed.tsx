import React from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  data: IPostItem[];
}

const PostFeed = async ({ data }: IProps) => {
  return data.map((post: IPostItem) => {
    return (
      <div
        className="bg-white py-8 px-12 relative rounded-2xl mb-6"
        key={post.id}
        data-identifier={post.id}
      >
        <PostCard
          creator={post.creator}
          mediaUrl={post.mediaUrl ? `${post.mediaUrl}` : null}
          id={post.id}
          likedBySelf={post.likedBySelf ? post.likedBySelf : false}
          likes={post.likes}
          mediaType={EMediaTypes.IMAGE}
          replies={post.replies}
          text={post.text}
          useFloatingAvatar={true}
        />
        <div className="mt-3 ml-[-12px]">
          <PostActionsBar
            postData={post}
            creatorIdentifier={post.creator.id}
            identifier={post.id}
            amountLikes={post.likes}
            amountComments={post.replies}
            selfLiked={post.likedBySelf}
          />
        </div>
      </div>
    );
  });
};

export default PostFeed;
