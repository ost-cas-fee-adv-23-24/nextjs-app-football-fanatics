import envVariables from "@/config/env";
import { ApiResponseType, Post } from "@/middleware/types";



async function getPosts() {
  const posts = await fetch(`${envVariables.MUMBLE_API_URL}/posts`)

  if (!posts.ok) throw new Error("Error")

  return posts.json();
}


export default async function Page() {
  const posts: ApiResponseType<Post[]> = await getPosts();
  console.log("data", posts);

  return (
    <>
      {
        posts.data.map(post => (
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
        ))
      }
    </>
  );


}
