import { CircleIcon, StarIcon } from "@radix-ui/react-icons"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-1">
        <div className="space-y-1">
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon
              className="mr-1 h-3 w-3 fill-sky-400 text-sky-400"
              aria-hidden="true"
            />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" aria-hidden="true" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
