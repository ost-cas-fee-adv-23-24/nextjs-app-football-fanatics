import { useContext } from 'react';
import UserInfoContext from '@/stores/UserInfo.context';

const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};

export default useUserInfo;
