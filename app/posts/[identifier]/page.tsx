import React from 'react';
import { getMumblePostAction } from '@/actions/getMumblePost';
import { PostCard } from '@/components/post-card/PostCard';
import { PostEditor } from '@/components/post-editor/PostEditor';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { identifier } = params;
  const responseService = await getMumblePostAction(identifier, true);
  const { postData, repliesData } = responseService;
  return (
    <div className="mr-auto ml-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mr-auto ml-auto py-8">
        <div className="bg-white py-8 px-12 relative rounded-2xl mb-6">
          <PostCard
            text={postData.text}
            id={postData.id}
            creator={postData.creator}
            mediaUrl={postData.mediaUrl}
            mediaType={postData.mediaType}
            likes={postData.likes}
            replies={postData.replies}
            likedBySelf={postData.likedBySelf}
          />

          <div className="mt-3">
            <PostActionsBar
              identifier={postData.id}
              amountLikes={postData.likes}
              amountComments={postData.replies}
              selfLiked={postData.likedBySelf}
            />
          </div>
          <div className="mt-3">
            <PostEditor identifier={postData.id} />
          </div>
          {repliesData?.data?.map((dataReply, index) => {
            return (
              <React.Fragment key={index}>
                <PostCard
                  text={dataReply.text}
                  id={dataReply.id}
                  likedBySelf={dataReply.likedBySelf}
                  likes={dataReply.likes}
                  mediaUrl={dataReply.mediaUrl}
                  mediaType={dataReply.mediaType}
                  replies={dataReply.replies}
                  creator={dataReply.creator}
                />
                <div className="mt-3">
                  <PostActionsBar
                    identifier={dataReply.id}
                    amountLikes={dataReply.likes}
                    amountComments={dataReply.replies}
                    selfLiked={dataReply.likedBySelf}
                  />
                </div>
                <hr />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
