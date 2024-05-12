'use client';
import {
  Button,
  ButtonTimed,
  EButtonTypes,
  EIConTypes,
  ToggleComment,
  ToggleGeneric,
  ToggleLike,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useEffect, useState } from 'react';

import { deletePost } from '@/actions/deletePost';
import { decreasePostLike, increasePostLikes } from '@/actions/updatePostLikes';
import DialogLogin from '@/components/dialog-login/DialogLogin';
import useModal from '@/hooks/useModal';
import usePosts from '@/hooks/usePosts';
import useUserInfo from '@/hooks/useUserInfo';
import { EModalActions } from '@/stores/Modal.context';
import { ELikeToggleType, EPostsActions } from '@/stores/Posts.context';
import { POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_PLURAL, POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR, POST_ACTIONS_BAR_COPY_LINK_BUTTON_LABEL, POST_ACTIONS_BAR_DIALOG_LOGIN_MESSAGE, POST_ACTIONS_BAR_LIKED_BUTTON_LABEL, POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_PLURAL, POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR, POST_ACTIONS_BAR_UNLIKED_BUTTON_LABEL } from '@/utils/constants';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface IProps {
  amountLikes: number;
  amountComments: number;
  selfLiked: boolean;
  identifier: string;
  creatorIdentifier: string;
  revalidationPath?: string;
  renderedInLikeFeed?: boolean;
  parentIdentifier?: string;
}

const PostActionsBar = ({
  amountComments,
  amountLikes,
  selfLiked,
  identifier,
  creatorIdentifier,
  revalidationPath,
  renderedInLikeFeed = false,
  parentIdentifier,
}: IProps) => {
  const router = useRouter();
  const [linkToCopy, setLinkToCopy] = useState<string>('');
  const { identifier: userIdentifier, isLoggedIn } = useUserInfo();
  const { dispatchModal, closeModal } = useModal();
  const { dispatchPosts } = usePosts();
  const notify = () => {
    toast(
      <DialogLogin
        labelButton="Login"
        message={POST_ACTIONS_BAR_DIALOG_LOGIN_MESSAGE}
        icon={EIConTypes.PROFILE}
        customClick={() => {
          signIn('zitadel', { callbackUrl: '/' });
        }}
      />,
      {
        position: 'bottom-left',
      },
    );
  };

  // to avoid hydrate mismatch
  useEffect(() => {
    let urlToCopy = `${window.location.origin}/posts/${identifier}`;
    if (parentIdentifier) {
      urlToCopy = `${window.location.origin}/posts/${parentIdentifier}#${identifier}`;
    }

    setLinkToCopy(urlToCopy);
  }, [identifier, parentIdentifier]);

  useEffect(() => {
    const anchor = window.location.hash.slice(1);

    if (anchor) {
      const anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
            let toggleType: ELikeToggleType = ELikeToggleType.LIKE;
            try {
              if (selfLiked) {
                toggleType = ELikeToggleType.UNLIKE;
                await decreasePostLike({ identifier, revalidationPath });
              } else {
                await increasePostLikes({ identifier, revalidationPath });
              }
              // if no error thrown, we can update the state
              dispatchPosts({
                type: EPostsActions.TOGGLE_LIKE_POST,
                payload: { identifier, toggleType, renderedInLikeFeed },
              });
            } catch (error) {
              toast.warning('Error liking post, please try again later');
              // we could reload the page after toast is gone
            }
          }}
          effectDuration={!isLoggedIn ? 0 : 1000}
          labelLiked={selfLiked ? POST_ACTIONS_BAR_UNLIKED_BUTTON_LABEL : POST_ACTIONS_BAR_LIKED_BUTTON_LABEL}
          labelSingular={POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR}
          labelPlural={POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_PLURAL}
          amount={amountLikes}
        />
      </div>
      {parentIdentifier ? null : (
        <div className="mb-4 sm:mb-0">
          <ToggleComment
            labelSingular={POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR}
            labelPlural={POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_PLURAL}
            amount={amountComments}
            customClickEvent={() => {
              // we could use the linkNext but the missing display set to flex or inline-block
              // causes a beauty problem in small screens
              router.push(`/posts/${identifier}`);
            }}
          />
        </div>
      )}
      <div
        className={creatorIdentifier === userIdentifier ? 'mb-4 sm:mb-0' : ''}
      >
        <ButtonTimed
          name="copy-link"
          icon={EIConTypes.SHARE}
          clipboardData={linkToCopy}
          clipboardHighlightDelay={1000}
          clipboardCopySuccessLabel="Copied"
          onCopyError={(errorMessage) => {
            console.log(errorMessage);
          }}
          label={POST_ACTIONS_BAR_COPY_LINK_BUTTON_LABEL}
        />
      </div>
      {creatorIdentifier === userIdentifier ? (
        <div>
          <ToggleGeneric
            icon={EIConTypes.CANCEL}
            label="Delete"
            labelActive="Deleted"
            effectDuration={0}
            customClickEvent={async () => {
              dispatchModal({
                type: EModalActions.SET_CONTENT,
                payload: {
                  title: 'Delete Post?',
                  content: (
                    <Button
                      name="delete-post"
                      icon={EIConTypes.EDIT}
                      label="Delete"
                      type={EButtonTypes.TERTIARY}
                      onCustomClick={async () => {
                        await deletePost({ postIdentifier: identifier });
                        dispatchPosts({
                          type: EPostsActions.DELETE_POST,
                          payload: {
                            identifier,
                          },
                        });
                        closeModal();
                        router.refresh();
                      }}
                    />
                  ),
                },
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PostActionsBar;
