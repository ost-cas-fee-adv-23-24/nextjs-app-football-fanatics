import React from 'react';
import PostFeed from '@/components/post-feed/PostFeed';
import { IPostsApiResponse } from '@/utils/interfaces/mumblePost.interface';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import {
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

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
      {data.length === 0 ? (
        <Paragraph
          size={EParagraphSizes.MEDIUM}
          text="No Likes yet, Hurry up! like some posts!"
        />
      ) : (
        <>
          <PostFeed data={data} next={next} prev={prev} count={count} />
          <PostsLoader userIdentifier={userIdentifier} isLikes={isLikes} />
        </>
      )}
    </>
  );
};

export default ProfileFeed;
