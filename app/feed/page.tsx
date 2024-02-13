import { getPosts } from '@/services/Post/post';
import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';
import { PostCard } from '@/components/post-card/PostCard';
import { EMediaTypes } from '@/utils/enums/general.enum';
import { IPostItem } from '@/services/Post/post.interface';

export default async function Page() {
  const { data } = await getPosts();

  return (
    <div className="mr-auto ml-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mr-auto ml-auto py-8">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction."
        />
      </div>
      <div className="content-bottom max-w-4xl mr-auto ml-auto">
        {(() => {
          return data.map((post: IPostItem, index: number) => {
            return (
              <div className="mb-3" key={index}>
                <PostCard
                  creator={{
                    id: post.creator.id,
                    avatarUrl: post.creator.avatarUrl as string,
                    username: post.creator.username,
                  }}
                  mediaUrl={post.mediaUrl ? `${post.mediaUrl}` : null}
                  id={post.id}
                  likedBySelf={post.likedBySelf ? post.likedBySelf : false}
                  likes={post.likes}
                  mediaType={EMediaTypes.IMAGE}
                  replies={post.replies}
                  text={post.text}
                  onLike={() => {}}
                  onUnlike={() => {}}
                />
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
