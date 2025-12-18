import type { Metadata } from "next";
import * as React from "react";
import { PageHeaderHeading } from "@/components/page-header";
import { PostCardSkeleton } from "@/components/post-card-skeleton";
import { Posts } from "@/components/posts";
import { Shell } from "@/components/shell";
import { env } from "@/env.js";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "My blog posts",
};

export default function BlogPage() {
  return (
    <Shell variant="markdown">
      <PageHeaderHeading size="sm">Blog</PageHeaderHeading>
      <section className="flex flex-col space-y-6">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          <Posts />
        </React.Suspense>
      </section>
    </Shell>
  );
}
