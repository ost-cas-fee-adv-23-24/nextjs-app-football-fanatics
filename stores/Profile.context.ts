import { createContext } from 'react';
import { IProfileData } from '@/providers/Profile.provider';

const ProfileContext = createContext({
  avatarUrl: '',
  firstName: '',
  lastName: '',
  userName: '',
  identifier: '',
  setProfileInfo: (options: IProfileData) => {},
});
ProfileContext.displayName = 'ProfileContext';
export default ProfileContext;
