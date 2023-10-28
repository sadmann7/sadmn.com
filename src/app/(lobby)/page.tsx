import * as React from "react"
import Link from "next/link"
import type { Project } from "@/types"
import { allPosts } from "contentlayer/generated"

import { siteConfig } from "@/config/site"
import { projectSchema } from "@/lib/validations/project"
import { LinkBadge } from "@/components/link-badge"
import { PostCard } from "@/components/post-card"
import { ProjectCard } from "@/components/project-card"
import { ProjectCardSkeleton } from "@/components/project-card-skeleton"
import { Shell } from "@/components/shell"

export default async function IndexPage() {
  async function getProjects(
    number: 1 | 2 | 3 | 4 | 5 | 6
  ): Promise<Project[]> {
    try {
      const response = await fetch(
        "https://gh-pinned.vercel.app/api/user/sadmann7"
      )

      const projects = projectSchema.array().parse(await response.json())

      return projects.slice(0, number)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const projects = await getProjects(6)

  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return (
    <Shell variant="markdown" className="gap-14">
      <section
        id="about"
        aria-labelledby="about-heading"
        aria-describedby="about-description"
        className="prose prose-neutral dark:prose-invert"
      >
        <p>
          Hi there, {`I'm`} <span className="font-bold">Sadman</span>, a
          software engineer building things for the web and mobile. I currently
          work at{" "}
          <LinkBadge aria-label="Cognosys" href="https://www.cognosys.ai">
            Cognosys
          </LinkBadge>
          , an startup working on AI agents.
        </p>
        <p>
          Currently, I am working on a side project called{" "}
          <Link href="https://skateshop.sadmn.com" className="no-underline">
            Skateshop
          </Link>
          , an open-source e-commerce platform built with everything new in{" "}
          <LinkBadge aria-label="Next.js" href="https://nextjs.org/">
            Next.js
          </LinkBadge>
          .
        </p>
      </section>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        aria-describedby="projects-description"
        className="space-y-4"
      >
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="prose prose-neutral no-underline dark:prose-invert"
        >
          <h3>Projects</h3>
        </Link>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <React.Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          >
            {projects.length > 0
              ? projects.map((project) => (
                  <ProjectCard key={project.repo} project={project} />
                ))
              : null}
          </React.Suspense>
        </div>
      </section>
      <section
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        className="space-y-4"
      >
        <Link
          aria-label="Blog"
          href="/blog"
          className="prose prose-neutral no-underline dark:prose-invert"
        >
          <h3>Blog</h3>
        </Link>
        <div className="flex flex-col space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </Shell>
  )
}
