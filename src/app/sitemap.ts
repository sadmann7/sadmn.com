import { type MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

import { absoluteUrl } from "@/lib/utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes = allPosts.map((post) => ({
    url: absoluteUrl(`${post.slug}`),
    lastModified: new Date().toISOString(),
  }))

  const routes = ["", "/blog"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...postRoutes]
}
