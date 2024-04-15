import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import { truncate as _truncate } from 'lodash';
import PostText from '@/components/post-text/PostText';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';

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
          {[EMediaTypes.IMAGE, EMediaTypes.PNG].includes(
            mediaType as EMediaTypes,
          ) ? (
            <PostImage src={mediaUrl} alt={text} /> // no image title :-(
          ) : null}
        </div>
      )}
    </div>
  );
};
