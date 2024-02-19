'use client';
import React from 'react';
import {
  ButtonTimed,
  EIConTypes,
  ToggleComment,
  ToggleLike,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { useRouter } from 'next/navigation';

interface IProps {
  amountLikes: number;
  amountComments: number;
  selfLiked: boolean;
  identifier: string;
}

const PostActionsBar = ({
  amountComments,
  amountLikes,
  selfLiked,
  identifier,
}: IProps) => {
  const router = useRouter();
  const linkToCopy = `${typeof window !== 'undefined' ? window.location.origin : ''}/posts/${identifier}`;
  return (
    <div className="flex flex-col justify-start sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <ToggleLike
          onIncrease={async () => {
            const method = selfLiked ? `DELETE` : `PUT`;
            await fetch(`api/posts/${identifier}/likes`, {
              method,
            })
              .then((res) => {
                console.log(res);
                router.refresh();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          effectDuration={1000}
          labelLiked={selfLiked ? 'Unliked' : 'Liked'}
          labelSingular="Like"
          labelPlural="Likes"
          amount={amountLikes}
        />
      </div>
      <div className="mb-4 sm:mb-0">
        <ToggleComment
          customClickEvent={() => {
            router.push(`/posts/${identifier}?includeReplies=true`);
          }}
          labelSingular="Comment"
          labelPlural="Comments"
          amount={amountComments}
        />
      </div>
      <div>
        <ButtonTimed
          icon={EIConTypes.SHARE}
          clipboardData={linkToCopy}
          clipboardHighlightDelay={1000}
          clipboardCopySuccessLabel="Copied"
          onCopyError={(errorMessage) => {
            console.log(errorMessage);
          }}
          label="Copy Link"
        />
      </div>
    </div>
  );
};

export default PostActionsBar;
