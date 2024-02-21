import React from 'react';
import {
  Avatar,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  Icon,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { formatDistance } from 'date-fns';

import { IPostItem } from '@/utils/interfaces/mumble.interface';
import { decodeTime } from 'ulidx';
import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import useProfileInfo from '@/hooks/useProfileInfo';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';

export const PostCard = ({
  mediaUrl,
  mediaType,
  text,
  creator,
  id,
}: IPostItem) => {
  return (
    <>
      <PostCardHeader creator={creator} postIdentifier={id} />
      <Paragraph text={text} size={EParagraphSizes.MEDIUM} />
      {mediaUrl && (
        <div className="mt-4">
          {mediaType === EMediaTypes.IMAGE ? (
            <PostImage src={mediaUrl} alt="test" />
          ) : null}
        </div>
      )}
    </>
  );
};
