import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import { Session } from 'next-auth';
import { PostsFixLoader } from '@/components/posts-loader/PostsFixLoader';
import PostsLoader from '@/components/posts-loader/PostsLoader';

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;
  const creators: string[] = [];

  const allFollowees = await getAllFollowees(session.user.identifier);
  allFollowees.forEach((followee) => {
    creators.push(followee.id);
  });

  // const introTextsContainerCss = 'global-width mx-auto py-8';
  // const postLoaderWrapperCss = 'max-w-4xl mr-auto ml-auto';
  // const topContainerCss = 'mx-auto bg-slate-100 pt-8';
  // const editorAndPostsWrapperCss = 'global-width mx-auto grow overflow-hidden';
  // const postEditorCss = '';

  const topContainerCss =
    'top-container py-8 flex flex-col grow overflow-hidden';
  const introTextsContainerCss = 'global-width mx-auto py-8';
  const editorAndPostsWrapperCss = 'grow flex flex-col overflow-hidden';
  const postEditorCss = 'global-width  mx-auto w-full';
  const postLoaderWrapperCss = 'grow overflow-hidden flex flex-col';

  return (
    <div className={topContainerCss}>
      <div className={introTextsContainerCss}>
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor."
        />
      </div>
      <div className={editorAndPostsWrapperCss}>
        <div className={postEditorCss}>
          <PostEditor isFeedPage={true} title="Hey, What is new?" />
        </div>
        <div className={postLoaderWrapperCss}>
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
