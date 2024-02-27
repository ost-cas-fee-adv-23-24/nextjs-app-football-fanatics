'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  EAvatarSizes,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  Modal,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';
import { createPost } from '@/actions/createPost';
import { createPostReply } from '@/actions/createPostReply';

interface IProps {
  identifier?: string;
  isFeedPage: boolean;
}

export const PostEditor = ({ identifier, isFeedPage = false }: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  const [isModalOpen, setIsModalOpen] = useState(false);

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
              name="picture-upload"
              fitParent={true}
              icon={EIConTypes.UPLOAD}
              label="Picture Upload"
              onCustomClick={() => {
                setIsModalOpen(true);
              }}
            />
            <Button
              disabled={text.trim().length === 0}
              fitParent={true}
              icon={EIConTypes.SEND}
              label="Send"
              type={EButtonTypes.SECONDARY}
              name="send-post"
              htmlType={EButtonKinds.SUBMIT}
            />
          </div>
        </div>
      </form>
      <Modal
        onSave={() => {}}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        active={isModalOpen}
        title="Updoad your image"
      >
        <h1>
          {/*TODO we need a new component for picture upload*/}
          <Avatar
            nameHtml="avatar"
            size={EAvatarSizes.XL}
            editable={true}
            onSuccess={(file) => {
              if (file) {
                // @ts-ignore
                setImage(file);
                setIsModalOpen(false);
              }
            }}
          />
          <button onClick={() => {}}>Select Image</button>
        </h1>
      </Modal>
    </>
  );
};
