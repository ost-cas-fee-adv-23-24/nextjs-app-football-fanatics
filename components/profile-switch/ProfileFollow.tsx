'use client';
import React from 'react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { followUserToggle } from '@/actions/followUser';

interface IProps {
  profileIdentifier: string;
  loggedInUserIdentifier: string;
  followers: string[];
}

const ProfileFollow = ({
  profileIdentifier,
  followers,
  loggedInUserIdentifier,
}: IProps) => {
  const followingCurrentUser = followers.includes(loggedInUserIdentifier);
  return (
    <div className="flex justify-end items-center">
      <div className={followingCurrentUser ? 'text-violet-700' : ''}>
        <Paragraph
          inheritColor={true}
          size={EParagraphSizes.MEDIUM}
          text={
            followingCurrentUser
              ? 'You are following this user'
              : 'You are not following this user'
          }
        />
      </div>
      <div className="ml-4">
        {!followingCurrentUser && (
          <Button
            icon={EIConTypes.MUMBLE}
            label="Follow"
            name="user-follow"
            type={EButtonTypes.SECONDARY}
            onCustomClick={async () => {
              await followUserToggle({
                identifier: profileIdentifier,
                unfollow: false,
              });
            }}
          />
        )}
        {followingCurrentUser && (
          <Button
            icon={EIConTypes.MUMBLE}
            label="Unfollow"
            name="user-unfollow"
            type={EButtonTypes.TERTIARY}
            onCustomClick={async () => {
              await followUserToggle({
                identifier: profileIdentifier,
                unfollow: true,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileFollow;
