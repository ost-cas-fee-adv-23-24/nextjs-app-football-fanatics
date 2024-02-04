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
  onLike: () => void;
}

const ActionsBar = ({
  amountComments,
  amountLikes,
  selfLiked,
  onLike,
}: IProps) => {
  return (
    <div className="flex">
      <ToggleLike
        onIncrease={() => {
          onLike();
        }}
        labelLiked="Liked"
        labelSingular="Like"
        labelPlural="Likes"
        amount={amountLikes}
      />
      <ToggleComment
        customClickEvent={() => {
          console.log('show comments');
        }}
        labelSingular="Comment"
        labelPlural="Comments"
        amount={amountComments}
      />
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
  );
};

export default ActionsBar;
