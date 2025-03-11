import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <article className="flex flex-col space-y-1.5">
      <Skeleton className="h-4 w-[30%]" />
      <Skeleton className="h-4 w-full" />
    </article>
  );
}
