import React from 'react';
import { getMumblePostAction } from '@/actions/getMumblePost';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const post = await getMumblePostAction(identifier, true);
  return (
    <div>
      <div className="">{JSON.stringify(post.postData, null, 4)}</div>
      <hr />
      <div className="">
        {post.repliesData?.data?.map((dataReply, index) => {
          return <div key={index}>{JSON.stringify(dataReply, null, 4)}</div>;
        })}
      </div>
    </div>
  );
}
