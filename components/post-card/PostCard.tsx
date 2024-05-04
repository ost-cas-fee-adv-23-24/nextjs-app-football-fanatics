import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import PostText from '@/components/post-text/PostText';

interface IProps extends IPostItemBase {
  useFloatingAvatar?: boolean;
}

export const PostCard = ({
  mediaUrl,
  mediaType,
  text,
  creator,
  id,
  useFloatingAvatar = false,
}: IProps) => {
  return (
    <div className="post-card">
      <PostCardHeader
        avatarFloating={useFloatingAvatar}
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
