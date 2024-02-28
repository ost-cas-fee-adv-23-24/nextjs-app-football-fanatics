import { useContext } from 'react';
import UserInfoContext from '@/stores/UserInfo.context';

const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export default useUserInfo;
