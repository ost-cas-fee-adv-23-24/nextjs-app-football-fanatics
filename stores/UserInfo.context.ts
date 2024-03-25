import { createContext } from 'react';

export interface IUserInfoContextData {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userName: string;
  zitadelName: string | null | undefined;
  identifier?: string;
  token?: string;
  isLoggedIn: boolean;
  setUserAvatar: (avatarUrl: string) => void;
}

const UserInfoContext = createContext<IUserInfoContextData | null>(null);
UserInfoContext.displayName = 'ProfileContext';
export default UserInfoContext;
