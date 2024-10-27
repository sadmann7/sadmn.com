import * as React from "react"
import { type Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { env } from "@/env.js"
import { allPosts } from "content-collections"

import "@/styles/mdx.css"

import { absoluteUrl, formatDate, getReadingTime } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import { Mdx } from "@/components/mdx/mdx-components"
import { PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"

interface PostPageProps {
  params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = (await params).slug?.join("/")
  const post = allPosts.find((post) => post._meta.path === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("title", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: post.title,
    description: post.description,
    authors: [
      {
        name: "sadmann7",
        url: "https://sadmn.com",
      },
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post._meta.path),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <Shell as="article" variant="markdown">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center space-x-1.5 text-sm text-muted-foreground">
          <React.Suspense fallback={<Skeleton className="h-4 w-32" />}>
            <time dateTime={post.date} className="block">
              {formatDate(post.date)}
            </time>
          </React.Suspense>
          <div className="text-[0.6rem]">•</div>
          <React.Suspense fallback={<Skeleton className="h-4 w-10" />}>
            <div>{getReadingTime(post.content)}min</div>
          </React.Suspense>
        </div>
        <PageHeaderHeading size="sm">{post.title}</PageHeaderHeading>
      </div>
      {post.image && (
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-md border bg-muted"
            priority
          />
        </AspectRatio>
      )}
      <React.Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        }
      >
        <Mdx code={post.mdx} />
      </React.Suspense>
    </Shell>
  )
}
