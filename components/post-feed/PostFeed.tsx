import React from 'react';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { IPostItem } from '@/utils/interfaces/mumblePost.interface';

const PostFeed = async () => {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);
  const apiResponse = await dataSrc.getPosts({
    // @ts-ignore
    token: session ? session.accessToken : '',
    data: { limit: 50, offset: 0 },
  });

  return apiResponse.data.map((post: IPostItem, index: number) => {
    return (
      <div
        className="bg-white py-8 px-12 relative rounded-2xl mb-6"
        key={index}
        data-identifier={post.id}
      >
        <PostCard
          creator={post.creator}
          mediaUrl={post.mediaUrl ? `${post.mediaUrl}` : null}
          id={post.id}
          likedBySelf={post.likedBySelf ? post.likedBySelf : false}
          likes={post.likes}
          mediaType={EMediaTypes.IMAGE}
          replies={post.replies}
          text={post.text}
        />
        <div className="mt-3 ml-[-12px]">
          <PostActionsBar
            identifier={post.id}
            amountLikes={post.likes}
            amountComments={post.replies}
            selfLiked={post.likedBySelf}
          />
        </div>
      </div>
    );
  });
};

export default PostFeed;
