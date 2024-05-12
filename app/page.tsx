import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';
import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { NOT_LOGGED_IN_MESSAGE } from '@/utils/constants';

export default function Page() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="global-width mx-auto w-full px-8 py-8 md:px-0">
        <WelcomeTexts title="" description={NOT_LOGGED_IN_MESSAGE} />
      </div>
      <PostsFixLoader
        isLikes={false}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </div>
  );
}
