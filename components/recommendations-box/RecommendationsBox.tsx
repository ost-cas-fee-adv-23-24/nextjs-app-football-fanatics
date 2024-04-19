'use client';
import Recommendation from '@/components/recommendation/Recommendation';
import React, { Suspense, useEffect } from 'react';
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
import { RecommendationPlaceholder } from '@/components/placeholders/RecommendationPlaceholder';

interface IProps {
  userIdentifier: string;
  title: string;
  titleNoMoreRecommendations: string;
  revalidationPath: string;
}

const RecommendationsBox = ({
  userIdentifier,
  title,
  titleNoMoreRecommendations,
  revalidationPath,
}: IProps) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeHolders = new Array(frontendConfig.recommendationsAmount).fill(0);

  return (
    <>
      <Heading
        level={ETypographyLevels.THREE}
        text={hasMoreRecommendations ? title : titleNoMoreRecommendations}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {recommendedUsers.length === 0 &&
          placeHolders.map((_, index) => (
            <RecommendationPlaceholder key={index} />
          ))}
        {recommendedUsers.map((user, index) => {
          return (
            <Recommendation
              onFollow={async (identifier) => {
                try {
                  await followUserToggle({
                    identifier,
                    unfollow: false,
                    revalidationPath,
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
            label="Start all over"
            name="reset-recommendations"
          />
        )}
      </div>
    </>
  );
};

export default RecommendationsBox;
