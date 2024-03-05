import React, { Suspense } from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import PostText from '@/components/post-text/PostText';

interface IProps extends IPostItemBase {
  parentId?: string;
}

export const PostCard = ({
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
      <PostText text={text} />
      {mediaUrl && (
        <div className="mt-4">
          {mediaType === EMediaTypes.IMAGE ? (
            <Suspense fallback="Loading... place here nice image loading">
              <PostImage src={mediaUrl} alt="test" />
            </Suspense>
          ) : null}
        </div>
      )}
    </div>
  );
};
