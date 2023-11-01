import * as React from "react"
import Link from "next/link"
import type { Project } from "@/types"
import { allPosts } from "contentlayer/generated"

import { siteConfig } from "@/config/site"
import { projectSchema } from "@/lib/validations/project"
import { PostCard } from "@/components/cards/post-card"
import { ProjectCard } from "@/components/cards/project-card"
import { LinkBadge } from "@/components/link-badge"
import { Shell } from "@/components/shell"
import { ProjectCardSkeleton } from "@/components/skeletons/project-card-skeleton"

export const revalidate = 3600

export default async function IndexPage() {
  async function getProjects(
    number: 1 | 2 | 3 | 4 | 5 | 6
  ): Promise<Project[]> {
    try {
      const response = await fetch(
        `https://api.github.com/users/sadmann7/repos?type=owner&sort=updated&per_page=7`
      )

      const projects = projectSchema.array().parse(await response.json())
      const sortedProjects = projects
        .sort((a, b) => (a.stargazers_count > b.stargazers_count ? -1 : 1))
        .slice(0, number)
      return sortedProjects
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
    <Shell variant="markdown" className="gap-12 pb-10 md:pb-12">
      <section
        id="about"
        aria-labelledby="about-heading"
        aria-describedby="about-description"
        className="prose prose-neutral dark:prose-invert"
      >
        <p>
          {`I'm`} <span className="font-bold">Sadman</span>, a software engineer
          building things for the web and mobile. I currently work at{" "}
          <LinkBadge aria-label="Cognosys" href="https://www.cognosys.ai">
            Cognosys
          </LinkBadge>
          , a startup working on AI agents.
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
      <section
        id="projects"
        aria-labelledby="projects-heading"
        aria-describedby="projects-description"
        className="space-y-4"
      >
        <Link
          aria-label="Projects"
          href={siteConfig.links.githubProfile}
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
                  <ProjectCard key={project.name} project={project} />
                ))
              : null}
          </React.Suspense>
        </div>
      </section>
      <section
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        aria-describedby="blog-posts-description"
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
