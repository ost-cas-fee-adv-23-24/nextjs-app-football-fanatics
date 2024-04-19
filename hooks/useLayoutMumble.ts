import { useContext } from 'react';
import LayoutMumbleContext from '@/stores/LayoutMumble.context';

const useLayoutMumble = () => {
  const context = useContext(LayoutMumbleContext);
  if (!context) {
    throw new Error(
      'useLayoutMumble must be used within a LayoutMumbleProvider (see main layout)',
    );
  }

  return context;
};

export default useLayoutMumble;
