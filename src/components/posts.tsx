import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/queries";

export async function Posts() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._meta.path} post={post} />
      ))}
    </>
  );
}
