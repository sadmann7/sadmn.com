import Link from "next/link"
import type { Post } from "contentlayer/generated"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link aria-label={post.title} href={post.slug}>
      <article className="flex flex-col space-y-1.5">
        <h2 className="line-clamp-1 font-semibold">{post.title}</h2>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {post.description}
        </p>
      </article>
    </Link>
  )
}
