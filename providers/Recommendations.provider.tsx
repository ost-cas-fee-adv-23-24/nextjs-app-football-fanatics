'use client';
import { ReactNode, useEffect, useReducer } from 'react';
import RecommendationsContext, {
  ERecommendationsActions,
} from '@/stores/Recommendations.context';
import { getAllUsers } from '@/utils/helpers/users/getUsers';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

interface IProps {
  children: ReactNode;
}

const reducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ERecommendationsActions.SET_USERS:
      return { ...state, users: payload };
    case ERecommendationsActions.SET_RECOMMENDED_USERS:
      return { ...state, recommendedUsers: payload };
    case ERecommendationsActions.LOAD_MORE_RECOMMENDATIONS:
      const recommendedUsers = state.users.slice(
        state.recommendedUsers.length,
        state.recommendedUsers.length + state.maxAmount,
      );
      return {
        ...state,
        recommendedUsers: [...state.recommendedUsers, ...recommendedUsers],
      };
    default:
      return state;
  }
};

export const RecommendationsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    maxAmount: 3,
    users: [],
    recommendedUsers: [],
    rejectedUsers: [], // to push on the local storage... and avoid showing them again in the future
  });

  useEffect(() => {
    (async () => {
      try {
        const users = await getAllUsers();
        dispatch({
          type: ERecommendationsActions.SET_USERS,
          payload: users,
        });

        const recommendedUsers = users.slice(0, state.maxAmount);
        dispatch({
          type: ERecommendationsActions.SET_RECOMMENDED_USERS,
          payload: recommendedUsers,
        });
      } catch (error) {
        console.error('Error fetching users');
      }
    })();
  }, []);
  return (
    <RecommendationsContext.Provider
      value={{
        dispatchRecommendations: dispatch,
        maxAmount: state.maxAmount,
        users: state.users,
        recommendedUsers: state.recommendedUsers,
        rejectedUsers: state.rejectedUsers,
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
};
