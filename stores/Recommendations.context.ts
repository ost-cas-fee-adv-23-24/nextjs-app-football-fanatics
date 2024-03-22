import { createContext, Dispatch } from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

export enum ERecommendationsActions {
  SET_USERS = 'setUsers',
  SET_RECOMMENDED_USERS = 'setRecommendedUsers',
  LOAD_MORE_RECOMMENDATIONS = 'loadMoreRecommendations',
}
export interface IRecommendationsContextData {
  maxAmount: number;
  users: IMumbleUser[];
  recommendedUsers: IMumbleUser[];
  rejectedUsers: IMumbleUser[];
  dispatchRecommendations: Dispatch<{
    type: ERecommendationsActions;
    payload: any;
  }>;
}

const RecommendationsContext =
  createContext<IRecommendationsContextData | null>(null);
RecommendationsContext.displayName = 'RecommendationsContext';
export default RecommendationsContext;
