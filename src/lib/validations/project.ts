import * as z from "zod"

export const projectSchema = z.object({
  name: z.string(),
  html_url: z.string(),
  description: z.string().optional(),
  homepage: z.string().optional(),
  language: z.string().nullable(),
  stargazers_count: z.union([z.string(), z.number()]),
  forks_count: z.number(),
})
