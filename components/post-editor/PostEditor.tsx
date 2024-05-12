'use client';

import { createPost } from '@/actions/createPost';
import { createPostReply } from '@/actions/createPostReply';
import ImagePreview, {
  TFireReaderResult,
} from '@/components/image-preview/ImagePreview';
import ImageUploader from '@/components/image-uploader/ImageUploader';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';
import PostEditorText from '@/components/post-editor-text/PostEditorText';
import frontendConfig from '@/config/configFrontend';
import useModal from '@/hooks/useModal';
import useUserInfo from '@/hooks/useUserInfo';
import { EModalActions } from '@/stores/Modal.context';
import { POST_EDITOR_GENERAL_POST_PLACEHOLDER_TEXT, POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL, POST_EDITOR_SEND_BUTTON_LABEL, POST_EDITOR_SEND_BUTTON_NAME, POST_EDITOR_SPECIFIC_POST_PLACEHOLDER_TEXT } from '@/utils/constants';
import { getRecommendationsData } from '@/utils/helpers/recommendations/getRecommendationsData';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import {
  Button,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    ? POST_EDITOR_SPECIFIC_POST_PLACEHOLDER_TEXT
    : POST_EDITOR_GENERAL_POST_PLACEHOLDER_TEXT;

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
              label={POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL}
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
              name={POST_EDITOR_SEND_BUTTON_NAME}
              disabled={text.trim().length === 0}
              fitParent={true}
              icon={EIConTypes.SEND}
              label={POST_EDITOR_SEND_BUTTON_LABEL}
              type={EButtonTypes.SECONDARY}
              htmlType={EButtonKinds.SUBMIT}
            />
          </div>
        </div>
      </form>
    </>
  );
};
