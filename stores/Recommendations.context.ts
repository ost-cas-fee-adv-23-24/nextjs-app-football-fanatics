import { createContext, Dispatch } from 'react';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

export enum ERecommendationsActions {
  SET_USERS = 'setUsers',
  SET_LOADED = 'setLoaded',
  SET_REJECTED_USER = 'setRejectedUser',
  SET_ALREADY_FOLLOWED_USERS = 'setAlreadyFollowedUsers',
  SET_RECOMMENDED_USERS = 'setRecommendedUsers',
  RESET_RECOMMENDATIONS = 'refreshRecommendations',
  SET_NO_MORE_RECOMMENDATIONS = 'setNoMoreRecommendations',
}
export interface IRecommendationsContextData {
  hasMoreRecommendations: boolean;
  maxAmount: number;
  users: IMumbleUser[];
  recommendedUsers: IMumbleUser[];
  rejectedUsers: string[];
  dispatchRecommendations: Dispatch<{
    type: ERecommendationsActions;
    payload: any;
  }>;
  refreshRecommendations: () => void;
  loadUsers: () => void;
}

const RecommendationsContext =
  createContext<IRecommendationsContextData | null>(null);
RecommendationsContext.displayName = 'RecommendationsContext';
export default RecommendationsContext;
