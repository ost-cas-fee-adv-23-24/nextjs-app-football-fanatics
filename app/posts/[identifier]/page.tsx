import React from 'react';
import { getMumblePostAction } from '@/actions/getMumblePost';

import PostFull from '@/components/post-full/PostFull';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const responseService = await getMumblePostAction(identifier, true);
  return (
    <div className="mr-auto ml-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mr-auto ml-auto py-8">
        <PostFull data={responseService} />
      </div>
    </div>
  );
}
