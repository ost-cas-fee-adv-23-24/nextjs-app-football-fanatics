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

interface IProps {
  followees?: string[];
}

const RecommendationsBox = ({ followees }: IProps) => {
  const {
    loadUsers,
    recommendedUsers,
    dispatchRecommendations,
    refreshRecommendations,
    hasMoreRecommendations,
  } = useRecommendations();

  useEffect(() => {
    loadUsers();
    if (followees && followees.length) {
      dispatchRecommendations({
        type: ERecommendationsActions.SET_ALREADY_FOLLOWED_USERS,
        payload: followees,
      });
    }
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
        {recommendedUsers.map((item, index) => {
          return (
            <Recommendation
              onDismiss={(identifier) => {
                dispatchRecommendations({
                  type: ERecommendationsActions.SET_REJECTED_USER,
                  payload: identifier,
                });
              }}
              key={item.id}
              id={item.id}
              username={item.username}
              avatarUrl={item.avatarUrl}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          );
        })}
      </div>

      <div className="mb-4 mt-4 w-full flex justify-center items-center">
        {hasMoreRecommendations ? (
          <Button
            onCustomClick={() => {
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
