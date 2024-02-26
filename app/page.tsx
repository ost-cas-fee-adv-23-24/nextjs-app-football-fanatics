import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumblePostService } from '@/services/Mumble/MumblePost';
import config from '@/config';

export default async function Page() {
  const session = await auth();
  const dataSrc = new MumblePostService(config.mumble.host);
  const apiResponse = await dataSrc.getPosts({
    token: session ? session.accessToken : '',
    data: { limit: 10, offset: 0 },
  });
  return (
    <div className="mr-auto ml-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mr-auto ml-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction."
        />
      </div>
      {session && (
        <div className="">
          <PostEditor isFeedPage={true} />
        </div>
      )}

      <div className="content-bottom max-w-4xl mr-auto ml-auto">
        <PostFeed posts={apiResponse.data} />
      </div>
      <div>prev: {apiResponse.prev}</div>
      <div>next: {apiResponse.next}</div>
    </div>
  );
}
