import { ProfileHeaderPlaceholder } from '@/components/placeholders/ProfileHeaderPlaceholder';
import { PostEditorPlaceholder } from '@/components/placeholders/PostEditorPlaceholder';
import React from 'react';

export default function Loading() {
  return (
    <div className="global-width mx-auto w-full">
      <div className="px-8 md:py-8 md:px-0">
        <div className="-mx-8 md:mx-auto">
          <ProfileHeaderPlaceholder />
        </div>
      </div>
      <div className="mt-8">
        <PostEditorPlaceholder />
      </div>
    </div>
  );
}
