// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/cards/components/github-card.tsx

import Link from "next/link"
import type { Project } from "@/types"
import { StarIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer">
      <span className="sr-only">{project.repo}</span>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1">{project.repo}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description ?? "No description provided"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icons.circle
                className="mr-1 h-3 w-3 fill-current text-[#3178c6]"
                aria-hidden="true"
              />
              {project.language ?? "Unknown"}
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" aria-hidden="true" />
              {project.stars}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
