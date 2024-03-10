import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { frontendConfig } from '@/config';

export default async function Page() {
  const session = await auth();
  const feedData = await getMumblePosts({
    offset: 0,
    limit: frontendConfig.feed.defaultAmount,
  });
  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="global-width mx-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor."
        />
      </div>
      <div className={`global-width mx-auto`}>
        {session && (
          <div>
            <PostEditor isFeedPage={true} />
          </div>
        )}

        <div className="global-width mr-auto ml-auto">
          {/*server side rendered*/}
          <PostFeed
            data={feedData.data}
            next={feedData.next}
            prev={feedData.prev}
            count={feedData.count}
          />
          {/*client side rendered*/}
          <PostsLoader />
        </div>
      </div>
    </div>
  );
}
