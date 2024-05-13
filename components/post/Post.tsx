import React from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';
import ImageUpdaterWrapper from '@/components/image-updater-wrapper/ImageUpdaterWrapper';

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
      className="bg-white relative py-8 px-12 rounded-2xl mb-6 w-full border-2 border-transparent hover:border-slate-200 hover:border-2 transition-all duration-300"
      key={postData.id}
      data-identifier={postData.id}
    >
      {!postData.mediaUrl && (
        <div className="absolute top-0 right-0 h-16 w-16 rounded-lg overflow-hidden">
          <ImageUpdaterWrapper
            addingPicture={true}
            postIdentifier={postData.id}
            creatorIdentifier={postData.creator.id}
          />
        </div>
      )}
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
      <div className="mt-4 ml-[-12px]">
        <PostActionsBar
          postData={postData}
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
