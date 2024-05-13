import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import PostText from '@/components/post-text/PostText';
import ImageUpdater from '@/components/image-updater/ImageUpdater';
import { toast } from 'react-toastify';
import ImageUpdaterWrapper from '@/components/image-updater-wrapper/ImageUpdaterWrapper';

interface IProps extends IPostItemBase {
  useFloatingAvatar?: boolean;
  serverRendered?: boolean;
  revalidationsPath?: string;
}

export const PostCard = ({
  mediaUrl,
  mediaType,
  text,
  creator,
  id,
  useFloatingAvatar = false,
  serverRendered = false,
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

      {mediaUrl ? (
        <div className="mt-4">
          {[EMediaTypes.IMAGE, EMediaTypes.PNG, EMediaTypes.WEBP].includes(
            mediaType as EMediaTypes,
          ) ? (
            <PostImage
              serverRendered={serverRendered}
              postIdentifier={id}
              src={mediaUrl}
              alt={text}
              creatorIdentifier={creator.id}
            /> // no image title :-(
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
