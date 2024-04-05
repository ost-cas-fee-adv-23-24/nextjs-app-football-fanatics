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
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { ERecommendationsActions } from '@/stores/Recommendations.context';
import useRecommendations from '@/hooks/useRecommendations';
import { toast } from 'react-toastify';
import { frontendConfig } from '@/config';

interface IProps {
  profileIdentifier: string;
  loggedInUserIdentifier: string;
  followers: IMumbleFollowers[];
}

const ProfileFollow = ({
  profileIdentifier,
  followers,
  loggedInUserIdentifier,
}: IProps) => {
  const followingCurrentUser = followers.find((follower) => {
    return follower.id === loggedInUserIdentifier;
  });
  const { dispatchRecommendations, followedUsersIdentifiers } =
    useRecommendations();

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
              try {
                await followUserToggle({
                  identifier: profileIdentifier,
                  unfollow: false,
                  revalidationPath: `/profiles/${profileIdentifier}`,
                });
              } catch (error) {
                toast.error('Error following user, please try again later', {
                  autoClose: frontendConfig.notificationDuration,
                });
              }

              dispatchRecommendations({
                type: ERecommendationsActions.SET_ALREADY_FOLLOWED_USERS,
                payload: [...followedUsersIdentifiers, profileIdentifier],
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
              try {
                await followUserToggle({
                  identifier: profileIdentifier,
                  unfollow: true,
                  revalidationPath: `/profiles/${profileIdentifier}`,
                });
              } catch (error) {
                toast.error('Error unfollowing user, please try again later', {
                  autoClose: frontendConfig.notificationDuration,
                });
              }

              const data = followedUsersIdentifiers.filter(
                (userId) => userId !== profileIdentifier,
              );

              dispatchRecommendations({
                type: ERecommendationsActions.SET_ALREADY_FOLLOWED_USERS,
                payload: data,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileFollow;
