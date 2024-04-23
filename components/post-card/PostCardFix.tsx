import React from 'react';
import { EAvatarSizes } from '@ost-cas-fee-adv-23-24/elbmum-design';

import PostImage from '@/components/post-image/PostImage';
import { PostCardHeader } from '@/components/post-card-header/PostCardHeader';
import { IPostItemBase } from '@/utils/interfaces/mumblePost.interface';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';
import textTransformer from '@/utils/helpers/posts/textTransformer';

interface IProps extends IPostItemBase {
  useFloatingAvatar?: boolean;
}

export const PostCardFix = ({
  mediaUrl,
  text,
  creator,
  id,
  useFloatingAvatar = false,
}: IProps) => {
  let textTransformed = '';
  if (text && text.trim().length !== 0) {
    textTransformed = textTransformer.replaceAll(text);
  }
  return (
    <div className="post-card">
      <PostCardHeader
        avatarFloating={useFloatingAvatar}
        avatarSize={EAvatarSizes.MD}
        creator={creator}
        postIdentifier={id}
      />
      <div className="grid grid-cols-3 gap-3">
        {textTransformed.trim().length !== 0 ? (
          <div
            className="line-clamp-3 text-slate-600 font-poppins not-italic font-medium text-lg col-span-2"
            dangerouslySetInnerHTML={{
              __html: textTransformed,
            }}
          ></div>
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
