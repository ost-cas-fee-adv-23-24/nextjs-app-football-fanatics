import React from 'react';
import {
  EAvatarSizes,
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { EMediaTypes } from '@/utils/enums/general.enum';
import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import Link from 'next/link';

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
  const getAndRenderHashTags = (text: string) => {
    const regexExp = /#[\p{L}\p{M}0-9_]+/gu;
    const matches = text.match(regexExp);
    if (!matches) return null;
    return (
      <div className="mt-6 mb-6 gap-2 flex flex-wrap">
        {matches?.map((match, index) => {
          return (
            <Link
              href={`/posts/tags/${match.replace('#', '')}`}
              className="text-violet-600 text-xl leading-[1.40] font-bold"
              key={`${match}-${index}`}
            >
              {match}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="post-card">
      <PostCardHeader
        avatarFloating={!parentId}
        avatarSize={EAvatarSizes.MD}
        creator={creator}
        postIdentifier={id}
      />
      {/*if we want to highlight hashtags, we need to create a new component to*/}
      {/*enrich the text with html*/}
      <Paragraph text={text} size={EParagraphSizes.MEDIUM} />
      {getAndRenderHashTags(text)}
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
