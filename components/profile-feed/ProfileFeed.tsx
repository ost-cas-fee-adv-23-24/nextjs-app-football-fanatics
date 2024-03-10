'use client';
import React from 'react';
import { Tabs } from '@ost-cas-fee-adv-23-24/elbmum-design';
import PostFeed from '@/components/post-feed/PostFeed';
import { IPostsApiResponse } from '@/utils/interfaces/mumblePost.interface';

interface IProps extends IPostsApiResponse {}

const ProfileFeed = ({ data, next, prev, count }: IProps) => {
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
      {/*add post loader*/}
    </>
  );
};

export default ProfileFeed;
