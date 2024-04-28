import React from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  postData: IPostItem;
  revalidationPath?: string;
  renderedInLikeFeed?: boolean;
  useFloatingAvatar?: boolean;
}

export const Post = ({
  postData,
  revalidationPath,
  renderedInLikeFeed = false,
  useFloatingAvatar = false,
}: IProps) => {
  return (
    <div
      className="bg-white py-8 px-12 relative rounded-2xl mb-6 w-full"
      key={postData.id}
      data-identifier={postData.id}
    >
      <PostCard
        useFloatingAvatar={useFloatingAvatar}
        key={`${postData.id}`}
        text={postData.text}
        id={postData.id}
        creator={postData.creator}
        mediaUrl={postData.mediaUrl}
        mediaType={postData.mediaType}
        likes={postData.likes}
        replies={postData.replies}
        likedBySelf={postData.likedBySelf}
      />
      <div className="mt-3 ml-[-12px]">
        <PostActionsBar
          renderedInLikeFeed={renderedInLikeFeed}
          revalidationPath={revalidationPath}
          creatorIdentifier={postData.creator.id}
          identifier={postData.id}
          amountLikes={postData.likes}
          amountComments={postData.replies}
          selfLiked={postData.likedBySelf}
        />
      </div>
    </div>
  );
};
