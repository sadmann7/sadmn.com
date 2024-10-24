import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getProjects } from "@/lib/actions/github"
import { LinkBadge } from "@/components/mdx/link-badge"
import { PostCardSkeleton } from "@/components/post-card-skeleton"
import { Posts } from "@/components/posts"
import { ProjectCard } from "@/components/project-card"
import { ProjectCardSkeleton } from "@/components/project-card-skeleton"
import { Shell } from "@/components/shell"

export default function IndexPage() {
  return (
    <Shell variant="markdown" className="gap-12 pb-10 md:pb-12">
      <section className="prose prose-zinc dark:prose-invert">
        <p className="leading-loose">
          {`I'm`} <span className="font-bold">Sadman</span>, building things for
          the web. I enjoy working on open-source projects, playing video games,
          and skateboarding. Currently, {`I'm`} building{" "}
          <Link
            href="https://skateshop.sadmn.com"
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            Skateshop
          </Link>
          , an open-source e-commerce platform built with the latest{" "}
          <LinkBadge aria-label="Next.js" href="https://nextjs.org">
            Next.js
          </LinkBadge>{" "}
          features.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="prose prose-zinc text-xl font-semibold dark:prose-invert">
          <Link
            href={siteConfig.links.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/90 no-underline transition-colors hover:text-foreground"
          >
            Projects
            <span className="sr-only">Projects</span>
          </Link>
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          >
            <Projects />
          </React.Suspense>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="prose prose-zinc text-xl font-semibold dark:prose-invert">
          <Link
            href="/blog"
            className="text-foreground/90 no-underline transition-colors hover:text-foreground"
          >
            Blog
            <span className="sr-only">Blog</span>
          </Link>
        </h2>
        <div className="flex flex-col space-y-6">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          >
            <Posts />
          </React.Suspense>
        </div>
      </section>
    </Shell>
  )
}

async function Projects() {
  const projects = await getProjects({ count: 4 })

  return (
    <>
      {projects?.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </>
  )
}
