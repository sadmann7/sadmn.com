import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton() {
  return (
    <Card className="flex h-full flex-col rounded-none">
      <CardHeader className="flex-1">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="flex space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Skeleton className="mr-1 size-3.5" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex items-center">
          <Skeleton className="mr-1 size-3.5" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardContent>
    </Card>
  )
}
