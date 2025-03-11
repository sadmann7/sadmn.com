/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/cards/components/github-card.tsx
 */

import type { Project } from "@/types";
import Link from "next/link";

import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { formatNumber } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="rounded-none">
      <Link
        href={project.html_url ?? siteConfig.links.githubProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col transition-colors hover:bg-muted/25"
      >
        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-1">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description ?? "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center">
            <Icons.circle
              className="mr-1 size-3 fill-current text-[#3178c6]"
              aria-hidden="true"
            />
            {project.language ?? "Unknown"}
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="size-3" />
            {formatNumber(project.stargazers_count)}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
