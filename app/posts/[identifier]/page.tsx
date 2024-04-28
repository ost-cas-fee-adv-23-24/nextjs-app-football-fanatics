import { getMumblePostAction } from '@/utils/helpers/posts/getMumblePost';

import React from 'react';
import { PostFull } from '@/components/post-full/PostFull';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const responseService = await getMumblePostAction(identifier, true);
  const session = await auth();
  return (
    <div className="bg-slate-100 pt-8">
      <div className="global-width mx-auto py-8 px-8 md:px-0">
        <PostFull
          data={responseService}
          isUserAuthenticated={!!session}
          revalidationPath={`/posts/${identifier}`}
        />
      </div>
    </div>
  );
}
