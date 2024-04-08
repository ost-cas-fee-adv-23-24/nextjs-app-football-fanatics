import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';

interface IProps extends IPostItemBase {
  parentId?: string;
}

export const PostCardFix = ({
  mediaUrl,
  mediaType,
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
      {text ? (
        <div className="text-slate-600 font-poppins not-italic font-medium text-lg leading-10 truncate">
          {text}
        </div>
      ) : (
        <div className="bg-slate-100 h-[40px]"></div>
      )}

      {mediaUrl ? (
        <div className="mt-4">
          <PostImage src={mediaUrl} alt={text} />
        </div>
      ) : (
        <PostImagePlaceholder text="No image in post" />
      )}
    </div>
  );
};
