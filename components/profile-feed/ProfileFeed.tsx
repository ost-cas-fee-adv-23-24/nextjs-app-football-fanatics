'use client';
import React from 'react';
import { Tabs } from '@ost-cas-fee-adv-23-24/elbmum-design';
import PostFeed from '@/components/post-feed/PostFeed';
import { IPostsApiResponse } from '@/utils/interfaces/mumblePost.interface';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { IUserMumble } from '@/services/Mumble/MumbleUser';

interface IProps extends IPostsApiResponse {
  userIdentifier: string;
}

const ProfileFeed = ({ data, next, prev, count, userIdentifier }: IProps) => {
  console.log('userIdentifier', userIdentifier);
  return (
    <>
      <div className="mt-8 mb-4">
        <Tabs
          updateSelection={() => {}}
          tabItems={[
            {
              isActive: true,
              text: 'Mumbles',
              identifier: 'tab-1',
            },
            {
              isActive: false,
              text: 'Likes',
              identifier: 'tab-2',
            },
          ]}
        />
      </div>
      <PostFeed data={data} next={next} prev={prev} count={count} />
      <PostsLoader userIdentifier={userIdentifier} />
    </>
  );
};

export default ProfileFeed;
