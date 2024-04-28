import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';

export default function Page() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="global-width mx-auto w-full px-8 py-8 md:px-0">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Login to have a full experience!"
        />
      </div>
      <PostsFixLoader
        isLikes={false}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </div>
  );
}
