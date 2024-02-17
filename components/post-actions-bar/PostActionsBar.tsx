'use client';
import React from 'react';
import {
  ButtonTimed,
  EIConTypes,
  ToggleComment,
  ToggleLike,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  amountLikes: number;
  amountComments: number;
  selfLiked: boolean;
}

const PostActionsBar = ({ amountComments, amountLikes, selfLiked }: IProps) => {
  return (
    <div className="flex flex-col justify-start sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <ToggleLike
          onIncrease={() => {
            alert('Liked');
          }}
          labelLiked={selfLiked ? 'Unliked' : 'Liked'}
          labelSingular="Like"
          labelPlural="Likes"
          amount={amountLikes}
        />
      </div>
      <div className="mb-4 sm:mb-0">
        <ToggleComment
          customClickEvent={() => {
            console.log('show comments');
          }}
          labelSingular="Comment"
          labelPlural="Comments"
          amount={amountComments}
        />
      </div>
      <div>
        <ButtonTimed
          icon={EIConTypes.SHARE}
          clipboardData={'Link to post'}
          clipboardHighlightDelay={300}
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
