import { createContext } from 'react';

const UserInfoContext = createContext({
  avatarUrl: '',
  firstName: '',
  lastName: '',
  userName: '',
  identifier: '' as string | undefined,
  token: '' as string | undefined,
  zitadelName: '' as string | null | undefined,
  isLoggedIn: false,
  setUserAvatar: (avatarUrl: string) => {},
});
UserInfoContext.displayName = 'ProfileContext';
export default UserInfoContext;
