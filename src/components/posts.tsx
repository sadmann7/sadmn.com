import { allPosts } from "contentlayer/generated"

import { PostCard } from "@/components/post-card"

export function Posts() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}
