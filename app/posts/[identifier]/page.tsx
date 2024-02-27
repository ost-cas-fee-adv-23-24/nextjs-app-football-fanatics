import { getMumblePostAction } from '@/utils/helpers/posts/getMumblePost';

import React from 'react';
import { PostFull } from '@/components/post-full/PostFull';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const responseService = await getMumblePostAction(identifier, true);
  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mx-auto py-8">
        <PostFull data={responseService} />
      </div>
    </div>
  );
}
