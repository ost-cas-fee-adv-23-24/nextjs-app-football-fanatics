import React from 'react';
import PostFeed from '@/components/post-feed/PostFeed';
import { IPostsApiResponse } from '@/utils/interfaces/mumblePost.interface';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';

interface IProps extends IPostsApiResponse {
  userIdentifier: string;
  isLikes?: boolean;
}

const ProfileFeed = ({
  data,
  next,
  prev,
  count,
  userIdentifier,
  isLikes = false,
}: IProps) => {
  return (
    <>
      <div className="mt-8 mb-4">
        <ProfileSwitch
          selectedTab={isLikes ? 1 : 0}
          userIdentifier={userIdentifier}
        />
      </div>
      <PostFeed data={data} next={next} prev={prev} count={count} />
      <PostsLoader userIdentifier={userIdentifier} isLikes={isLikes} />
    </>
  );
};

export default ProfileFeed;
