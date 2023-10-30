import type { Metadata } from "next"
import { env } from "@/env.mjs"

import "@/styles/globals.css"

import { siteConfig } from "@/config/site"
import { fontHeading, fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/layouts/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "RSC",
    "sadmn.com",
    "sadmann7",
    "sadmann17",
    "sadman",
    "sadmn",
    "Sadman Sakib",
  ],
  authors: [
    {
      name: "sadmann7",
      url: "https://sadmn.com",
    },
  ],
  creator: "sadmann7",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@sadmann17",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
            <TailwindIndicator />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
