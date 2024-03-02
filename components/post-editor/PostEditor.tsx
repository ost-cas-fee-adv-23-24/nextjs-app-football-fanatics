'use client';
import React, { useState } from 'react';
import {
  Button,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';
import useUserInfo from '@/hooks/useUserInfo';
import { createPostReply } from '@/actions/createPostReply';
import { createPost } from '@/actions/createPost';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import ImageUploader from '@/components/image-uploader/ImageUploader';

interface IProps {
  identifier?: string;
  isFeedPage: boolean;
}

export const PostEditor = ({ identifier, isFeedPage = false }: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { isLoggedIn } = useUserInfo();
  const { dispatchModal, closeModal } = useModal();
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  if (!isLoggedIn) return null;

  return (
    <>
      <form
        action={async (formData) => {
          if (image) {
            formData.append('media', image);
          }
          if (identifier) {
            await createPostReply(formData, identifier);
          } else {
            await createPost(formData);
          }
          setText('');
          setImage(null);
        }}
      >
        <div
          className={`bg-white py-8  relative rounded-2xl mb-6 ${isFeedPage ? 'px-12' : ''}`}
        >
          <div className="mb-4">
            <PostEditorHeader avatarFloating={isFeedPage} />
          </div>
          <Textarea
            name="text"
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-4 mt-4">
            <Button
              name="picture-upload-trigger"
              fitParent={true}
              icon={EIConTypes.UPLOAD}
              label="Picture Upload"
              onCustomClick={() => {
                dispatchModal({
                  type: EModalActions.SET_CONTENT,
                  payload: {
                    content: <ImageUploader />,
                    title: 'Modal Title super duper',
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
