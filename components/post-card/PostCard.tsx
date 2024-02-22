import React from 'react';
import {
  EAvatarSizes,
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { IPostItem } from '@/utils/interfaces/mumble.interface';
import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';

export const PostCard = ({
  mediaUrl,
  mediaType,
  text,
  creator,
  id,
}: IPostItem) => {
  return (
    <div className="post-card">
      <PostCardHeader
        avatarSize={EAvatarSizes.MD}
        creator={creator}
        postIdentifier={id}
      />
      {/*TODO extend to support creator and have only one headerCard*/}
      <PostEditorHeader avatarFloating={false} />
      <Paragraph text={text} size={EParagraphSizes.MEDIUM} />
      {mediaUrl && (
        <div className="mt-4">
          {mediaType === EMediaTypes.IMAGE ? (
            <PostImage src={mediaUrl} alt="test" />
          ) : null}
        </div>
      )}
    </div>
  );
};
