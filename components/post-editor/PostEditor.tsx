'use client';
import React, { useState } from 'react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';
import { EApiMethods } from '@/utils/enums/general.enum';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';

interface IProps {
  identifier?: string;
  isFeedPage: boolean;
}
export const PostEditor = ({ identifier, isFeedPage = false }: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const url = identifier ? `/api/posts/${identifier}/replies` : '/api/posts';
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  return (
    <div
      className={`bg-white py-8  relative rounded-2xl mb-6 ${isFeedPage ? 'px-12' : ''}`}
    >
      <div className="mb-4">
        <PostEditorHeader avatarFloating={isFeedPage} />
      </div>
      <Textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-4 mt-4">
        <Button
          fitParent={true}
          icon={EIConTypes.UPLOAD}
          label="Picture Upload"
        />
        <Button
          disabled={text.trim().length === 0}
          fitParent={true}
          icon={EIConTypes.SEND}
          label="Send"
          type={EButtonTypes.SECONDARY}
          onCustomClick={async () => {
            try {
              const formData = new FormData();
              formData.append('text', text);
              if (image) {
                // to add in overlay
                formData.append('image', image);
              }
              await fetch(url, {
                method: EApiMethods.POST,
                body: formData,
              });
              setText('');
              router.refresh();
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </div>
  );
};
