'use client';
import React from 'react';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { useRouter } from 'next/navigation';

interface IProps {
  postIdentifier: string;
  revalidationsPath: string;
}
// used on the fullPost view. to add replies
export const PostEditorWrapper = ({
  postIdentifier,
  revalidationsPath,
}: IProps) => {
  const router = useRouter();
  return (
    <>
      <PostEditor
        identifier={postIdentifier}
        isFeedPage={false}
        revalidationsPath={revalidationsPath}
        onNewPost={() => {
          router.refresh();
        }}
      />
    </>
  );
};
