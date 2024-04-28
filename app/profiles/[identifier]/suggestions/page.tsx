import { IParamsOnlyIdentifierCtx } from '@/utils/interfaces/general';
import { notFound } from 'next/navigation';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import RecommendationsBox from '@/components/recommendations-box/RecommendationsBox';
import TabDispatcher from '@/components/tab-dispatcher/TabDispatcher';

export default async function ProfileFollowers(
  context: IParamsOnlyIdentifierCtx,
) {
  const session = await auth();
  const userIdentifier = context.params.identifier.toString();

  if (session) {
    return (
      <>
        <TabDispatcher selectedTab={4} />
        <div className="mt-8 mb-4">
          <RecommendationsBox
            userIdentifier={session?.user.identifier}
            revalidationPath={`/profiles/${userIdentifier}/suggestions`}
            title="Suggestions"
            titleNoMoreRecommendations="No more suggestions"
          />
        </div>
      </>
    );
  } else {
    return notFound();
  }
}
