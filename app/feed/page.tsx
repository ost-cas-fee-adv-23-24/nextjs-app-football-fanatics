import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import PostFeed from '@/components/post-feed/PostFeed';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import PostsLoader from '@/components/posts-loader/PostsLoader';
import { frontendConfig } from '@/config';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import PostsNewLoader from '@/components/posts-new-loader/PostsNewLoader';
import { Session } from 'next-auth';

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;
  const creators: string[] = [];

  const options = {
    offset: 0,
    limit: frontendConfig.feed.defaultAmount,
    creators: undefined as string[] | undefined,
  };

  const allFollowees = await getAllFollowees(session.user.identifier);
  allFollowees.forEach((followee) => {
    creators.push(followee.id);
  });
  options.creators = creators;

  const feedData = await getMumblePosts(options);
  const newestPost = feedData.data[0];
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
          {/*if loggedIn restrict newest posts only to followees posts*/}
          <PostsNewLoader newestPost={newestPost} />
          <PostFeed
            data={feedData.data}
            next={feedData.next}
            prev={feedData.prev}
            count={feedData.count}
          />
          <PostsLoader creators={creators} />
        </div>
      </div>
    </div>
  );
}
