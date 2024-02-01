import { allPosts } from "contentlayer/generated"

export function getBlogPosts() {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}
