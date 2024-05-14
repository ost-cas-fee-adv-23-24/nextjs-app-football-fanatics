import { getMumblePostFull } from '@/utils/helpers/posts/getMumblePostFull';
import React from 'react';
import { PostFull } from '@/components/post-full/PostFull';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mumble | Post Full',
  description: 'Mumbles/Likes/Followers/Following/Suggestions',
};

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const path = `/posts/${identifier}`;
  const responseService = await getMumblePostFull({
    identifier,
    includeReplies: true,
    revalidationsPath: path,
  });

  const session = await auth();
  return (
    <div className="bg-slate-100 pt-8">
      <div className="global-width mx-auto py-8 px-8 md:px-0">
        <PostFull
          data={responseService}
          isUserAuthenticated={!!session}
          revalidationPath={path}
        />
      </div>
    </div>
  );
}
