import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getProjects } from "@/lib/actions/github"
import { ProjectCard } from "@/components/cards/project-card"
import { LinkBadge } from "@/components/link-badge"
import { Posts } from "@/components/posts"
import { Shell } from "@/components/shell"
import { PostCardSkeleton } from "@/components/skeletons/post-card-skeleton"
import { ProjectCardSkeleton } from "@/components/skeletons/project-card-skeleton"

export default function IndexPage() {
  return (
    <Shell variant="markdown" className="gap-12 pb-10 md:pb-12">
      <section className="prose prose-neutral dark:prose-invert">
        <p>
          {`I'm`} <span className="font-bold">Sadman</span>, a software engineer
          building things for the web and mobile.
        </p>
        <p>
          I like building open-source projects. {`I'm`} now building{" "}
          <Link
            href="https://skateshop.sadmn.com"
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            Skateshop
          </Link>
          , an open-source e-commerce platform built with everything new in{" "}
          <LinkBadge aria-label="Next.js" href="https://nextjs.org/">
            Next.js
          </LinkBadge>
          . I also like skating, and playing video games.
        </p>
      </section>
      <section className="space-y-4">
        <Link
          href={siteConfig.links.githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="prose prose-neutral no-underline dark:prose-invert"
        >
          <h3>Projects</h3>
          <span className="sr-only">Projects</span>
        </Link>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <React.Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          >
            <Projects />
          </React.Suspense>
        </div>
      </section>
      <section className="space-y-4">
        <Link
          aria-label="Blog"
          href="/blog"
          className="prose prose-neutral no-underline dark:prose-invert"
        >
          <h3>Blog</h3>
        </Link>
        <div className="flex flex-col space-y-6">
          <React.Suspense
            fallback={Array.from({ length: 3 }).map((_, i) => (
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
