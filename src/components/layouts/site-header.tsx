import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/layouts/mode-toggle"

export function SiteHeader() {
  return (
    <header className="w-full bg-background pt-4">
      <div className="container flex h-16 max-w-3xl items-center justify-between">
        <Link href="/" className="font-bold">
          {siteConfig.name}
          <span className="sr-only">Home</span>
        </Link>
        <nav className="flex items-center space-x-1">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
              })
            )}
          >
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
              })
            )}
          >
            <Icons.twitter className="h-3 w-3 fill-current" />
            <span className="sr-only">Twitter</span>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
