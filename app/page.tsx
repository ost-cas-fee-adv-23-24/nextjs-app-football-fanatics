import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';

export default function Page() {
  return (
    <div className="pt-8 flex flex-col overflow-hidden">
      <div className="intro global-width mx-auto py-2">
        <WelcomeTexts title="Welcome to Mumble" description="" />
      </div>
      <PostsFixLoader
        isLikes={false}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </div>
  );
}
