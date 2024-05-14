import { BreakpointsContext } from '@/stores/Breakpoints.context';
import { useContext } from 'react';

const useBreakpoints = () => {
  const context = useContext(BreakpointsContext);
  if (!context) {
    throw new Error(
      'useBreakpoints must be used within a BreakpointsProvider (see main layout)',
    );
  }
  return context;
};

export default useBreakpoints;
