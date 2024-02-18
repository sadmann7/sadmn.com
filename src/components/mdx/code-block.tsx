"use client"

/** Originally from `t3-env-docs`
 * @link https://github.com/t3-oss/t3-env/blob/main/docs/src/components/mdx/code-block.tsx
 */
import * as React from "react"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"

import { Icons } from "@/components/icons"

import { Button } from "../ui/button"

type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  // set by `rehype-pretty-code`
  "data-language"?: string
  // set by `rehype-pretty-code`
  "data-theme"?: string
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const language = props["data-language"] as string
  const theme = props["data-theme"] as string
  const Icon = {
    js: Icons.javascript,
    ts: Icons.typescript,
    bash: Icons.bash,
  }[language]

  const ref = React.useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <div className="relative">
      {Icon && (
        <Icon
          data-language-icon
          data-theme={theme}
          className="absolute left-5 top-4 z-20 size-5 text-foreground"
        />
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-5 top-4 z-20 size-6 hover:bg-zinc-700 hover:text-zinc-50"
        onClick={() => {
          if (typeof window === "undefined") return
          setIsCopied(true)
          void window.navigator.clipboard.writeText(
            ref.current?.innerText ?? ""
          )
          setTimeout(() => setIsCopied(false), 2000)
        }}
      >
        {isCopied ? (
          <CheckIcon className="size-3" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-3" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isCopied ? "Copied" : "Copy to clipboard"}
        </span>
      </Button>
      <pre
        ref={ref}
        className="relative my-4 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm font-semibold text-muted-foreground"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
