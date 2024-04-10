import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';

import PostsLoader from '@/components/posts-loader/PostsLoader';

export default async function Page() {
  return (
    <div className="bg-slate-100 pt-8">
      <div className="intro global-width mx-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor."
        />
      </div>
      <PostsLoader
        isLikes={false}
        subscribeToNewestPost={true}
        fetchOnlyOneBatch={false}
      />
    </div>
  );
}
