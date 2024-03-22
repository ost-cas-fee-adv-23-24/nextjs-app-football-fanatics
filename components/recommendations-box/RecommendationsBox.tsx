'use client';
import Recommendation from '@/components/recommendation/Recommendation';
import React from 'react';
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

interface IProps {}

const RecommendationsBox = ({}: IProps) => {
  const { recommendedUsers, users, dispatchRecommendations } =
    useRecommendations();

  return (
    <div className="flex flex-wrap">
      <div className="mb-4">
        <Heading
          level={ETypographyLevels.THREE}
          text="Recommended users for you"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {recommendedUsers.map((item, index) => {
          return (
            <Recommendation
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
      {users.length !== recommendedUsers.length && (
        <div className="mx-auto mb-4">
          <Button
            onCustomClick={() => {
              dispatchRecommendations({
                type: ERecommendationsActions.LOAD_MORE_RECOMMENDATIONS,
                payload: null,
              });
            }}
            size={EButtonSizes.MEDIUM}
            type={EButtonTypes.TERTIARY}
            icon={EIConTypes.TIME}
            label="Load more"
            name="load-more-recommendations"
          />
        </div>
      )}
    </div>
  );
};

export default RecommendationsBox;
