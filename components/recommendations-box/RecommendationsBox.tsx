'use client';
import Recommendation from '@/components/recommendation/Recommendation';
import React, { useEffect } from 'react';
import {
  Button,
  EButtonSizes,
  EButtonTypes,
  EIConTypes,
  ETypographyLevels,
  Heading,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import useRecommendations from '@/hooks/useRecommendations';
import { ERecommendationsActions } from '@/stores/Recommendations.context';
import { followUserToggle } from '@/actions/followUser';
import { toast } from 'react-toastify';
import { frontendConfig } from '@/config';

interface IProps {
  userIdentifier: string;
}

const RecommendationsBox = ({ userIdentifier }: IProps) => {
  const {
    loadData,
    refreshRecommendations,
    recommendedUsers,
    dispatchRecommendations,
    hasMoreRecommendations,
    followedUsersIdentifiers,
  } = useRecommendations();

  useEffect(() => {
    (async () => {
      loadData(userIdentifier);
    })();
  }, []);

  return (
    <div className="">
      <div className="mb-4">
        <Heading
          level={ETypographyLevels.THREE}
          text={
            hasMoreRecommendations
              ? 'Recommended users for you'
              : 'You already swiped away all tinder garden!'
          }
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {recommendedUsers.map((user, index) => {
          return (
            <Recommendation
              onFollow={async (identifier) => {
                try {
                  await followUserToggle({
                    identifier,
                    unfollow: false,
                  });
                } catch (error) {
                  toast.warning(
                    'Error following user, please try again later',
                    {
                      autoClose: frontendConfig.notificationDuration,
                    },
                  );
                }

                toast.success(`${user.username} followed successfully`, {
                  autoClose: frontendConfig.notificationDuration,
                });

                // we only update the state if the followUserToggle was successful
                dispatchRecommendations({
                  type: ERecommendationsActions.SET_ALREADY_FOLLOWED_USERS,
                  payload: [...followedUsersIdentifiers, identifier],
                });
              }}
              onDismiss={(identifier) => {
                dispatchRecommendations({
                  type: ERecommendationsActions.SET_REJECTED_USER,
                  payload: identifier,
                });
              }}
              key={user.id}
              id={user.id}
              username={user.username}
              avatarUrl={user.avatarUrl}
              firstname={user.firstname}
              lastname={user.lastname}
            />
          );
        })}
      </div>

      <div className="mb-4 mt-4 w-full flex justify-center items-center">
        {hasMoreRecommendations ? (
          <Button
            onCustomClick={() => {
              console.log('refreshing recommendations');
              refreshRecommendations();
            }}
            size={EButtonSizes.MEDIUM}
            type={EButtonTypes.TERTIARY}
            icon={EIConTypes.TIME}
            label="Refresh"
            name="refresh-recommendations"
          />
        ) : (
          <Button
            onCustomClick={() => {
              dispatchRecommendations({
                type: ERecommendationsActions.RESET_RECOMMENDATIONS,
                payload: null,
              });
            }}
            size={EButtonSizes.MEDIUM}
            type={EButtonTypes.TERTIARY}
            icon={EIConTypes.TIME}
            label="Star all over"
            name="reset-recommendations"
          />
        )}
      </div>
    </div>
  );
};

export default RecommendationsBox;
