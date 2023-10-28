import * as z from "zod"

export const projectSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  link: z.string(),
  description: z.string().optional(),
  image: z.string(),
  website: z.string().optional(),
  language: z.string(),
  languageColor: z.string(),
  stars: z.string(),
  forks: z.number(),
})
