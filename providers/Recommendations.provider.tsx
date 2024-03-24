'use client';
import { ReactNode, useEffect, useReducer } from 'react';
import RecommendationsContext, {
  ERecommendationsActions,
} from '@/stores/Recommendations.context';
import { getAllUsers } from '@/utils/helpers/users/getUsers';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';
import { cloneDeep } from 'lodash';
import {
  completeRecommendations,
  getSelectableUsers,
} from '@/utils/helpers/recommendations';
import { frontendConfig } from '@/config';

interface IProps {
  children: ReactNode;
}

const reducer = (state: IRecommendationsProviderState, action: any) => {
  const copyState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case ERecommendationsActions.RESET_RECOMMENDATIONS:
      copyState.rejectedUsersIdentifiers = [];
      copyState.noMoreRecommendations = false;
      copyState.currentRecommendations = completeRecommendations({
        maxAmount: copyState.maxAmount,
        rawUsers: copyState.rawUsers,
        currentRecommendations: [],
        followedUsersIdentifiers: copyState.followedUsersIdentifiers,
        rejectedUsersIdentifiers: [],
      });
      return copyState;
    case ERecommendationsActions.SET_USERS:
      copyState.rawUsers = payload;
      return copyState;
    case ERecommendationsActions.SET_REJECTED_USER:
      copyState.rejectedUsersIdentifiers.push(payload);
      const recommendationWithoutRejected =
        copyState.currentRecommendations.filter(
          (recommendation) =>
            !copyState.rejectedUsersIdentifiers.includes(recommendation.id),
        );
      copyState.currentRecommendations = recommendationWithoutRejected;
      return copyState;
    case ERecommendationsActions.SET_ALREADY_FOLLOWED_USERS:
      copyState.followedUsersIdentifiers = payload;
      const recommendationWithoutFollowed =
        copyState.currentRecommendations.filter(
          (recommendation) =>
            !copyState.followedUsersIdentifiers.includes(recommendation.id),
        );
      copyState.currentRecommendations = recommendationWithoutFollowed;
      return copyState;
    case ERecommendationsActions.SET_RECOMMENDED_USERS:
      copyState.currentRecommendations = payload;
      return copyState;
    case ERecommendationsActions.SET_LOADED:
      copyState.loaded = true;
      return copyState;
    case ERecommendationsActions.SET_NO_MORE_RECOMMENDATIONS:
      copyState.noMoreRecommendations = true;
      return copyState;
    default:
      return state;
  }
};

export interface IRecommendationsProviderState {
  maxAmount: number;
  rawUsers: IMumbleUser[];
  currentRecommendations: IMumbleUser[];
  followedUsersIdentifiers: string[];
  rejectedUsersIdentifiers: string[];
  loaded: boolean;
  noMoreRecommendations: boolean;
}

export const RecommendationsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    maxAmount: frontendConfig.recommendationsAmount,
    rawUsers: [],
    followedUsersIdentifiers: [],
    currentRecommendations: [],
    rejectedUsersIdentifiers: [],
    loaded: false,
    noMoreRecommendations: false,
  });
  const {
    maxAmount,
    currentRecommendations,
    rawUsers,
    followedUsersIdentifiers,
    rejectedUsersIdentifiers,
    loaded,
    noMoreRecommendations,
  } = state;

  const loadUsers = async () => {
    if (!loaded) {
      try {
        const users = await getAllUsers();
        dispatch({
          type: ERecommendationsActions.SET_USERS,
          payload: users,
        });

        const newRecommendations = completeRecommendations({
          maxAmount: maxAmount,
          rawUsers: users,
          currentRecommendations: [],
          followedUsersIdentifiers: followedUsersIdentifiers,
          rejectedUsersIdentifiers: rejectedUsersIdentifiers,
        });
        dispatch({
          type: ERecommendationsActions.SET_RECOMMENDED_USERS,
          payload: newRecommendations,
        });
      } catch (error) {
        console.error('Error fetching users, no recommendations available.');
      } finally {
        dispatch({
          type: ERecommendationsActions.SET_LOADED,
          payload: true,
        });
      }
    }
  };

  const refreshRecommendations = () => {
    currentRecommendations.forEach((user: IMumbleUser) => {
      if (rejectedUsersIdentifiers.includes(user.id)) return;
      dispatch({
        type: ERecommendationsActions.SET_REJECTED_USER,
        payload: user.id,
      });
    });
  };

  useEffect(() => {
    if (loaded) {
      const selectableUsers = getSelectableUsers({
        rawUsers: rawUsers,
        followedUsersIdentifiers: followedUsersIdentifiers,
        rejectedUsersIdentifiers: rejectedUsersIdentifiers,
      });
      if (selectableUsers.length > 0) {
        if (
          currentRecommendations.length < maxAmount &&
          !noMoreRecommendations
        ) {
          if (selectableUsers.length > maxAmount) {
            const newRecommendations = completeRecommendations({
              maxAmount: maxAmount,
              rawUsers: rawUsers,
              currentRecommendations: currentRecommendations,
              followedUsersIdentifiers: followedUsersIdentifiers,
              rejectedUsersIdentifiers: rejectedUsersIdentifiers,
            });
            dispatch({
              type: ERecommendationsActions.SET_RECOMMENDED_USERS,
              payload: newRecommendations,
            });
          } else {
            dispatch({
              type: ERecommendationsActions.SET_RECOMMENDED_USERS,
              payload: [...selectableUsers],
            });
            dispatch({
              type: ERecommendationsActions.SET_NO_MORE_RECOMMENDATIONS,
              payload: null,
            });
          }
        }
      }
    }
  }, [
    followedUsersIdentifiers,
    currentRecommendations,
    loaded,
    maxAmount,
    rawUsers,
    noMoreRecommendations,
  ]);

  return (
    <RecommendationsContext.Provider
      value={{
        followedUsersIdentifiers,
        loadUsers,
        dispatchRecommendations: dispatch,
        maxAmount: state.maxAmount,
        users: state.rawUsers,
        recommendedUsers: state.currentRecommendations,
        rejectedUsers: state.rejectedUsersIdentifiers,
        refreshRecommendations,
        hasMoreRecommendations:
          rawUsers.length >
          rejectedUsersIdentifiers.length + followedUsersIdentifiers.length,
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
};
