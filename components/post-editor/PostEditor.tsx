'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  Paragraph,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';

interface IProps {
  avatarSrc: string;
}

export const PostEditor = ({ avatarSrc }: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  return (
    <div className="bg-white py-8 px-12 relative rounded-2xl mb-6">
      <div className="mb-4">
        <Paragraph size={EParagraphSizes.LARGE} text="What's up Doc!" />
      </div>
      <div className="absolute left-[-38px] top-[24px]">
        <Avatar
          size={EAvatarSizes.MD}
          imgSrc={avatarSrc}
          editable={false}
          onSuccess={() => {}}
          onError={() => {}}
        />
      </div>
      <Textarea
        placeholder="What? tell it louder"
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
              await fetch('/api/posts', {
                method: 'POST',
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
