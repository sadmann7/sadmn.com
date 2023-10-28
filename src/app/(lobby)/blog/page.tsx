import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"

import { PageHeaderHeading } from "@/components/page-header"
import { PostCard } from "@/components/post-card"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "My blog posts",
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return (
    <Shell variant="markdown" className="md:pb-10">
      <PageHeaderHeading size="sm">Blog</PageHeaderHeading>
      <section
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        className="flex flex-col space-y-6"
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </Shell>
  )
}
