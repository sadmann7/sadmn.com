import "server-only"

import { allPosts, type Post } from "content-collections"

import { unstable_cache } from "@/lib/unstable-cache"
import { projectSchema } from "@/lib/validations/project"

export async function getProjects({ count }: { count: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return await unstable_cache(
    async () => {
      const res = await fetch(
        `https://api.github.com/users/sadmann7/repos?type=owner&sort=updated&per_page=7`
      )

      if (!res.ok) {
        return []
      }

      const parsedRes = projectSchema.array().safeParse(await res.json())

      if (!parsedRes.success) {
        return []
      }

      const sortedProjects = parsedRes.data
        .sort((a, b) => (a.stargazers_count > b.stargazers_count ? -1 : 1))
        .slice(0, count)
      return sortedProjects
    },
    [`projects-${count}`],
    {
      revalidate: 3600,
      tags: ["projects"],
    }
  )()
}

export async function getPosts({
  published,
  sortBy = "date",
  sortOrder = "desc",
}: {
  published?: boolean
  sortBy?: keyof Pick<Post, "title" | "date">
  sortOrder?: "asc" | "desc"
} = {}) {
  return await unstable_cache(
    async () => {
      let posts = allPosts

      if (published !== undefined) {
        posts = posts.filter((post) => post.published === published)
      }

      posts = posts.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1
        }
        return a[sortBy] < b[sortBy] ? 1 : -1
      })

      return posts
    },
    ["posts", JSON.stringify({ published, sortBy, sortOrder })],
    {
      revalidate: 86400,
      tags: ["posts"],
    }
  )()
}
