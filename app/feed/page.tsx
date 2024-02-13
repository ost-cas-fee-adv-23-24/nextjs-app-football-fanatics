import { getPosts } from '@/services/post';
import { TPost } from '@/utils/types';

export default async function Page() {
  const { data } = await getPosts();

  return (
    <>
      {data.map((post: TPost) => (
        <div key={post.id}>
          <p>Post ID: {post.id}</p>
          <p>Text: {post.text}</p>
          <p>Replies: {post.replies}</p>
          <p>Likes: {post.likes}</p>
          <p>Liked by self: {post.likedBySelf}</p>
          <p>media type: {post.mediaType}</p>
          <p>media url: {post.mediaUrl}</p>
          <p>Creator ID:{post.creator.id}</p>
          <p>username: {post.creator.username}</p>
          <p>avatar url: {post.creator.avatarUrl}</p>
        </div>
      ))}
    </>
  );
}
