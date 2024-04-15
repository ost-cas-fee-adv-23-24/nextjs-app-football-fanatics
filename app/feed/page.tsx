import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import { Session } from 'next-auth';

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;
  // lets include also the user itself
  const creators: string[] = [session.user.identifier];

  const allFollowees = await getAllFollowees(session.user.identifier);
  allFollowees.forEach((followee) => {
    creators.push(followee.id);
  });

  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="global-width mx-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor."
        />
      </div>
      <div className="global-width mx-auto">
        <div>
          <PostEditor isFeedPage={true} title="Hey, What is new?" />
        </div>

        <div className="max-w-4xl mr-auto ml-auto">
          <PostsLoader
            creators={creators}
            isLikes={false}
            subscribeToNewestPost={true}
            fetchOnlyOneBatch={false}
          />
        </div>
      </div>
    </div>
  );
}
