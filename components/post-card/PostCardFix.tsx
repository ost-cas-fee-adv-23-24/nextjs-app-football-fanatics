import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';

interface IProps extends IPostItemBase {
  parentId?: string;
}

export const PostCardFix = ({
  mediaUrl,
  text,
  creator,
  id,
  parentId,
}: IProps) => {
  return (
    <div className="post-card">
      <PostCardHeader
        avatarFloating={!parentId}
        avatarSize={EAvatarSizes.MD}
        creator={creator}
        postIdentifier={id}
      />
      <div className="grid grid-cols-3 gap-3">
        {text ? (
          <div className="line-clamp-3 text-slate-600 font-poppins not-italic font-medium text-lg col-span-2">
            {text}
          </div>
        ) : (
          <div className="col-span-2 line-clamp-3">
            <div className="bg-slate-100 h-[20px] mb-1 col-span-2"></div>
            <div className="bg-slate-100 h-[20px] mb-1 col-span-2 text-center text-slate-600 font-poppins not-italic font-medium text-xs lg:text-md">
              No text in post
            </div>
            <div className="bg-slate-100 h-[20px] col-span-2"></div>
          </div>
        )}

        {mediaUrl ? (
          <div>
            <PostImage src={mediaUrl} alt={text} />
          </div>
        ) : (
          <PostImagePlaceholder pulse={false} text="No image in post" />
        )}
      </div>
    </div>
  );
};
