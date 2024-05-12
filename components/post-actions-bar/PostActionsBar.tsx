'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonTimed,
  EButtonTypes,
  EIConTypes,
  ToggleComment,
  ToggleGeneric,
  ToggleLike,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import { useRouter } from 'next/navigation';
import { decreasePostLike, increasePostLikes } from '@/actions/updatePostLikes';
import useUserInfo from '@/hooks/useUserInfo';
import { toast } from 'react-toastify';
import DialogLogin from '@/components/dialog-login/DialogLogin';
import { signIn } from 'next-auth/react';
import { deletePost } from '@/actions/deletePost';
import usePosts from '@/hooks/usePosts';
import { ELikeToggleType, EPostsActions } from '@/stores/Posts.context';
import useLayout from '@/hooks/useLayout';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { IPostItem, IPostReply } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  amountLikes: number;
  amountComments: number;
  selfLiked: boolean;
  identifier: string;
  creatorIdentifier: string;
  revalidationPath?: string;
  renderedInLikeFeed?: boolean;
  parentIdentifier?: string;
  postData: IPostItem | IPostReply;
  serverRendered?: boolean;
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
  postData,
  serverRendered = false,
}: IProps) => {
  const router = useRouter();
  const [linkToCopy, setLinkToCopy] = useState<string>('');
  const { identifier: userIdentifier, isLoggedIn } = useUserInfo();
  const { dispatchLayout, closeModal, currentTabProfile } = useLayout();
  const { dispatchPosts, restartFeedAuthorized, restartFeedAuthorizedLikes } =
    usePosts();
  const notify = () => {
    toast(
      <DialogLogin
        labelButton="Login"
        message="You need to be logged in to like a post"
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
          labelLiked={selfLiked ? 'Unliked' : 'Liked'}
          labelSingular="Like"
          labelPlural="Likes"
          amount={amountLikes}
        />
      </div>
      {parentIdentifier ? null : (
        <div className="mb-4 sm:mb-0">
          <ToggleComment
            labelSingular="Comment"
            labelPlural="Comments"
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
          label="Copy Link"
        />
      </div>
      {creatorIdentifier === userIdentifier ? (
        <div
          className={creatorIdentifier === userIdentifier ? 'mb-4 sm:mb-0' : ''}
        >
          <ToggleGeneric
            icon={EIConTypes.CANCEL}
            label="Delete"
            labelActive="Deleted"
            effectDuration={0}
            customClickEvent={async () => {
              dispatchLayout({
                type: ELayoutActions.SET_OVERLAY_CONTENT,
                payload: {
                  overlayTitle: 'Delete Post?',
                  overlayContent: (
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
      {creatorIdentifier === userIdentifier ? (
        <div>
          <ToggleGeneric
            icon={EIConTypes.EDIT}
            label="Edit"
            labelActive="Editing"
            effectDuration={0}
            customClickEvent={async () => {
              const isReply = (postData as IPostReply).parentId;
              // post full is rendered in the server.
              // feeds are rendered in the client.
              const redirectionPath = isReply
                ? `/posts/${identifier}`
                : `/posts/${(postData as IPostReply).parentId}#${identifier}`;

              dispatchLayout({
                type: ELayoutActions.SET_OVERLAY_CONTENT,
                payload: {
                  overlayTitle: 'Post Editor',
                  overlayContent: (
                    <PostEditor
                      postData={postData}
                      revalidationsPath={
                        serverRendered ? redirectionPath : undefined
                      }
                      isFeedPage={false}
                      useFloatingAvatar={false}
                      identifier={identifier}
                      onNewPost={() => {
                        closeModal();
                        if (!serverRendered) {
                          if (currentTabProfile === 1) {
                            restartFeedAuthorizedLikes(creatorIdentifier);
                          } else {
                            restartFeedAuthorized(creatorIdentifier);
                          }
                        }
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
