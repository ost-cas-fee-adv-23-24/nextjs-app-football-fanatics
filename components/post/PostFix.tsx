import React from 'react';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import { PostCardFix } from '@/components/post-card/PostCardFix';

interface IProps {
  postData: IPostItem;
  useFloatingAvatar?: boolean;
}

export const PostFix = ({ postData, useFloatingAvatar = false }: IProps) => {
  return (
    <div
      className="bg-white relative rounded-2xl w-full p-6 md:py-8 md:px-12 border-2 border-transparent hover:border-slate-200 hover:border-2 transition-all duration-300"
      key={postData.id}
    >
      <PostCardFix
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
      <div className="mt-4 ml-[-12px]">
        <PostActionsBar
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
