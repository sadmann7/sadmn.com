import { type MetadataRoute } from "next"
import { allPosts } from "content-collections"

import { absoluteUrl } from "@/lib/utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes = allPosts.map((post) => ({
    url: absoluteUrl(post._meta.path),
    lastModified: new Date().toISOString(),
  }))

  const routes = ["", "/blog"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...postRoutes]
}
