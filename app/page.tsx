import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';
import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { NOT_LOGGED_IN_MESSAGE } from '@/utils/constants';

export default function Page() {
  return (
    <div className="flex flex-col h-[100%]">
      <div className="global-width mx-auto w-full px-8 py-8 md:px-0">
        <WelcomeTexts
          title=""
          description="DO NOT LOGIN. STAY ON THIS FEED. you will be loading 500k posts it will take a while but it will work"
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
