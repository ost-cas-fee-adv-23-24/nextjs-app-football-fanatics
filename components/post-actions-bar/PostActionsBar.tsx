'use client';
import React, { useEffect, useState } from 'react';
import {
  ButtonTimed,
  EIConTypes,
  ToggleComment,
  ToggleGeneric,
  ToggleLike,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { decreasePostLike, increasePostLikes } from '@/actions/updatePostLikes';
import useUserInfo from '@/hooks/useUserInfo';
import { toast } from 'react-toastify';
import DialogLogin from '@/components/dialog-login/DialogLogin';
import { signIn } from 'next-auth/react';

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
  const [linkToCopy, setLinkToCopy] = useState<string>('');
  const { identifier: userIdentifier, isLoggedIn } = useUserInfo();
  const notify = () => {
    toast(
      <DialogLogin
        labelButton="Login"
        message="You need to be logged in to like a post"
        icon={EIConTypes.PROFILE}
        customClick={() => {
          signIn('zitadel');
        }}
      />,
      {
        position: 'bottom-left',
      },
    );
  };

  // to avoid hydrate mismatch
  useEffect(() => {
    setLinkToCopy(`${window.location.origin}/posts/${identifier}`);
  }, []);

  return (
    <div className="flex flex-col justify-start sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <ToggleLike
          onIncrease={async () => {
            if (!isLoggedIn) {
              notify();
              return;
            }
            if (selfLiked) {
              await decreasePostLike(identifier);
            } else {
              await increasePostLikes(identifier);
            }
            router.refresh();
          }}
          effectDuration={!isLoggedIn ? 0 : 1000}
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
