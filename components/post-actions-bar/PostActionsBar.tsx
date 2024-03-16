'use client';
import React from 'react';
import {
  ButtonTimed,
  EIConTypes,
  ToggleComment,
  ToggleLike,
  ToggleGeneric,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { decreasePostLike, increasePostLikes } from '@/actions/updatePostLikes';
import useUserInfo from '@/hooks/useUserInfo';

interface IProps {
  amountLikes: number;
  amountComments: number;
  selfLiked: boolean;
  identifier: string;
  creatorIdentifier: string;
}

const PostActionsBar = ({
  amountComments,
  amountLikes,
  selfLiked,
  identifier,
  creatorIdentifier,
}: IProps) => {
  const router = useRouter();
  const linkToCopy = `${window.location.origin}/posts/${identifier}`;
  const { identifier: userIdentifier } = useUserInfo();
  return (
    <div className="flex flex-col justify-start sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <ToggleLike
          onIncrease={async () => {
            if (selfLiked) {
              await decreasePostLike(identifier);
            } else {
              await increasePostLikes(identifier);
            }
            router.refresh();
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
          // @ts-ignore
          NextLinkComponent={Link}
          href={`/posts/${identifier}`}
          labelSingular="Comment"
          labelPlural="Comments"
          amount={amountComments}
        />
      </div>
      <div>
        <ButtonTimed
          name="copy-link"
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
      {creatorIdentifier === userIdentifier ? (
        <div>
          <ToggleGeneric
            icon={EIConTypes.CANCEL}
            label="Delete"
            labelActive="Deleted"
            effectDuration={300}
            customClickEvent={() => {
              alert('delete post');
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PostActionsBar;
