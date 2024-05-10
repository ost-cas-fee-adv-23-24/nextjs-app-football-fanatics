import { useContext } from 'react';
import LayoutContext from '@/stores/Layout.context';

const useLayoutMumble = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      'useLayout must be used within a LayoutProvider (see main layout)',
    );
  }

  return context;
};

export default useLayoutMumble;
