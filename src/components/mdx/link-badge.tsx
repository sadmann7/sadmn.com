import Link from "next/link";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function LinkBadge({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      {...props}
      className={cn(
        "rounded-md border border-border bg-muted px-1.5 py-0.5 text-sm no-underline hover:bg-muted/90",
        className,
      )}
    />
  );
}
