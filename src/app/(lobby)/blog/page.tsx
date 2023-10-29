import * as React from "react"
import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"

import { PostCard } from "@/components/cards/post-card"
import { PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { PostCardSkeleton } from "@/components/skeletons/post-card-skeleton"

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
    <Shell variant="markdown">
      <PageHeaderHeading size="sm">Blog</PageHeaderHeading>
      <section
        id="blog-page"
        aria-labelledby="blog-page-heading"
        aria-describedby="blog-page-description"
        className="flex flex-col space-y-6"
      >
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  )
}
