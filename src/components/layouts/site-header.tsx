import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
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
          <Button variant="ghost" size="icon" className="size-7" asChild>
            <Link
              href={siteConfig.links.githubProfile}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.gitHub className="size-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="size-7">
            <Link href={siteConfig.links.x} target="_blank" rel="noreferrer">
              <Icons.x className="size-3 fill-current" />
              <span className="sr-only">X</span>
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
