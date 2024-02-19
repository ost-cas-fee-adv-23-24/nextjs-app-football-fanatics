import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);
  const apiResponse = await dataSrc.getPostById({
    // @ts-ignore
    token: session ? session.accessToken : '',
    includeReplies: true,
    identifier,
  });
  return (
    <div>
      <div className="">{JSON.stringify(apiResponse.postData, null, 4)}</div>
      <hr />
      <div className="">
        {apiResponse.repliesData?.data?.map((dataReply, index) => {
          return <div key={index}>{JSON.stringify(dataReply, null, 4)}</div>;
        })}
      </div>
    </div>
  );
}
