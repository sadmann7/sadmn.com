import "server-only"

import { unstable_cache as cache } from "next/cache"

import { projectSchema } from "@/lib/validations/project"

export const getProjects = cache(
  async ({ count }: { count: 1 | 2 | 3 | 4 | 5 | 6 }) => {
    try {
      const res = await fetch(
        `https://api.github.com/users/sadmann7/repos?type=owner&sort=updated&per_page=7`
      )

      const projects = projectSchema.array().parse(await res.json())
      const sortedProjects = projects
        .sort((a, b) => (a.stargazers_count > b.stargazers_count ? -1 : 1))
        .slice(0, count)
      return sortedProjects
    } catch (err) {
      console.error(err)
      return []
    }
  },
  ["projects"],
  {
    revalidate: 3600,
  }
)
