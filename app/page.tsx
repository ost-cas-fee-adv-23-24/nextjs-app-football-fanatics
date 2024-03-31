import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { frontendConfig } from '@/config';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import RecommendationsBox from '@/components/recommendations-box/RecommendationsBox';
import PostsNewLoader from '@/components/posts-new-loader/PostsNewLoader';

export default async function Page() {
  return (
    <div className="bg-slate-100 pt-8">
      <div className="intro global-width mx-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor."
        />
      </div>
      <PostsLoader />
    </div>
  );
}
