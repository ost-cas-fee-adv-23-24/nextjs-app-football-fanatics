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
import useProfileInfo from '@/hooks/useProfileInfo';
import { EApiMethods } from '@/utils/enums/general.enum';
import Link from 'next/link';

interface IProps {
  identifier?: string;
}
export const PostEditor = ({ identifier }: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { avatarUrl, identifier: userIdentifier } = useProfileInfo();
  const url = identifier ? `/api/posts/${identifier}/replies` : '/api/posts';
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  return (
    <div className="bg-white py-8 px-12 relative rounded-2xl mb-6">
      <div className="mb-4">
        {/* post header */}
        {/* reply header */}
        {!identifier && (
          <Paragraph size={EParagraphSizes.LARGE} text="What's up Doc!" />
        )}
      </div>
      <div className="absolute left-[-38px] top-[24px]">
        <Link href={`/profiles/${userIdentifier}`}>
          <Avatar size={EAvatarSizes.MD} imgSrc={avatarUrl} />
        </Link>
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
