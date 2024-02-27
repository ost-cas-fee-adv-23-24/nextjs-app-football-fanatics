import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export default async function Page() {
  const session = await auth();
  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mx-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction."
        />
      </div>
      <div className="">
        <PostEditor isFeedPage={true} />
      </div>
      <div className="content-bottom max-w-4xl mx-auto">
        {session && (
          <div className="">
            <PostEditor isFeedPage={true} />
          </div>
        )}

        <div className="content-bottom max-w-4xl mr-auto ml-auto">
          <PostFeed />
        </div>
      </div>
    </div>
  );
}
