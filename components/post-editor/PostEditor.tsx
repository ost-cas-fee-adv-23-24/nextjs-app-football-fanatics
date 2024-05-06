'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';
import { createPostReply } from '@/actions/createPostReply';
import { createPost } from '@/actions/createPost';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import ImageUploader from '@/components/image-uploader/ImageUploader';
import ImagePreview, {
  TFireReaderResult,
} from '@/components/image-preview/ImagePreview';
import { getRecommendationsData } from '@/utils/helpers/recommendations/getRecommendationsData';
import useUserInfo from '@/hooks/useUserInfo';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import PostEditorText from '@/components/post-editor-text/PostEditorText';
import { useRouter } from 'next/navigation';
import frontendConfig from '@/config/configFrontend';

interface IProps {
  identifier?: string;
  isFeedPage: boolean;
  title?: string;
  subTitle?: string;
  useFloatingAvatar?: boolean;
  revalidationsPath?: string;
  onNewPost?: () => void;
}

export interface IMentionsProps {
  id: string;
  display: string;
}

export const PostEditor = ({
  identifier,
  isFeedPage = false,
  title,
  subTitle,
  useFloatingAvatar = false,
  revalidationsPath,
  onNewPost,
}: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageInMemory, setImageInMemory] = useState<TFireReaderResult>(null);
  const { identifier: loggedInUserIdentifier } = useUserInfo();
  const [users, setUsers] = useState<IMumbleUser[]>([]);
  const { dispatchModal, closeModal } = useModal();
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  const router = useRouter();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageInMemory(evt.target?.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImageInMemory(null);
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      if (loggedInUserIdentifier) {
        const { users: usersFetched } = await getRecommendationsData(
          loggedInUserIdentifier,
        );
        setUsers(usersFetched);
      }
    })();
  }, [loggedInUserIdentifier]);

  useEffect(() => {
    return () => {
      setImage(null);
      setImageInMemory(null);
    };
  }, []);

  return (
    <>
      <form
        action={async (formData) => {
          formData.append('text', text);
          if (image) {
            formData.append('media', image);
          }
          if (revalidationsPath) {
            formData.append('revalidationsPath', revalidationsPath);
          }
          try {
            if (identifier) {
              await createPostReply({ formData, identifier });
            } else {
              await createPost(formData);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setText('');
            setImage(null);
            if (onNewPost) {
              onNewPost();
            }
          }
        }}
      >
        <div
          className={`bg-white py-8  relative rounded-2xl mb-6 ${isFeedPage ? 'px-12' : ''}`}
        >
          <div className="mb-4">
            <PostEditorHeader
              avatarFloating={useFloatingAvatar}
              title={title}
              subTitle={subTitle}
            />
          </div>
          {frontendConfig.enableMentions ? (
            <PostEditorText
              text={text}
              placeholder={placeholder}
              notifyValueChange={setText}
              users={users.map((user) => {
                return {
                  id: user.id,
                  display: user.username,
                };
              })}
            />
          ) : (
            <Textarea
              name="text"
              placeholder={placeholder}
              value={text}
              onChange={(evt) => setText(evt.target.value)}
            />
          )}
          {imageInMemory && (
            <ImagePreview
              imageInMemory={imageInMemory}
              onCancel={() => {
                setImage(null);
              }}
            />
          )}
          <div className="flex gap-4 mt-4 flex-col md:flex-row">
            <Button
              name="picture-upload-trigger"
              fitParent={true}
              icon={EIConTypes.UPLOAD}
              label="Picture Upload"
              onCustomClick={() => {
                dispatchModal({
                  type: EModalActions.SET_CONTENT,
                  payload: {
                    content: (
                      <ImageUploader
                        onCancel={() => {
                          setImage(null);
                          closeModal();
                        }}
                        onSuccess={(image) => {
                          setImage(image);
                          closeModal();
                        }}
                      />
                    ),
                    title: 'Add an image to your post',
                  },
                });
              }}
            />
            <Button
              name="post-submit"
              disabled={text.trim().length === 0}
              fitParent={true}
              icon={EIConTypes.SEND}
              label="Send"
              type={EButtonTypes.SECONDARY}
              htmlType={EButtonKinds.SUBMIT}
            />
          </div>
        </div>
      </form>
    </>
  );
};
