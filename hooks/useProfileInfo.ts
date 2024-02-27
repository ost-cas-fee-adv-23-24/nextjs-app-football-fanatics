import { useContext } from 'react';
import ProfileContext from '@/stores/Profile.context';

const useProfileInfo = () => {
  return useContext(ProfileContext);
};

export default useProfileInfo;
