import { getBlogPosts } from "@/lib/actions/blog"
import { PostCard } from "@/components/cards/post-card"

export function Posts() {
  const posts = getBlogPosts()

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}
