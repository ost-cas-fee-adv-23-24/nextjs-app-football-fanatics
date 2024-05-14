import { RecommendationPlaceholder } from '@/components/placeholders/RecommendationPlaceholder';
import frontendConfig from '@/config/configFrontend';

export default function Loading() {
  const amount = new Array(frontendConfig.recommendationsAmount).fill(null);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      {amount.map((_, index) => (
        <RecommendationPlaceholder key={index} />
      ))}
    </div>
  );
}
