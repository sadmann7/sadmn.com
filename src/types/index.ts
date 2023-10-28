import type { z } from "zod"

import type { projectSchema } from "@/lib/validations/project"

export type Project = z.infer<typeof projectSchema>
