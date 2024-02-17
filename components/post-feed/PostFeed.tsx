import React from 'react';
import { IPostItem } from '@/services/Post/post.interface';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';
import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

const PostFeed = async () => {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);
  const apiResponse = await dataSrc.getPosts({
    // @ts-ignore
    token: session ? session.accessToken : '',
    data: { limit: 30, offset: 0 },
  });

  return apiResponse.data.map((post: IPostItem, index: number) => {
    return (
      <div className="mb-3" key={index}>
        <PostCard
          creator={{
            id: post.creator.id,
            avatarUrl: post.creator.avatarUrl as string,
            username: post.creator.username,
          }}
          mediaUrl={post.mediaUrl ? `${post.mediaUrl}` : null}
          id={post.id}
          likedBySelf={post.likedBySelf ? post.likedBySelf : false}
          likes={post.likes}
          mediaType={EMediaTypes.IMAGE}
          replies={post.replies}
          text={post.text}
        />
        <div className="mt-6">
          <PostActionsBar
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
