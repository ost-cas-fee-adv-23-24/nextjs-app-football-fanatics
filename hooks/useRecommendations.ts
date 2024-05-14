import { useContext } from 'react';
import RecommendationsContext from '@/stores/Recommendations.context';

const useRecommendations = () => {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error(
      'useModal must be used within a Recommendations Provider (see main layout)',
    );
  }

  return context;
};

export default useRecommendations;
