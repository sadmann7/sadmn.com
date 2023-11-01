import { env } from "@/env.mjs"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function formatNumber(
  num: number | string,
  options?: Intl.NumberFormatOptions
) {
  const {
    notation = "compact",
    compactDisplay = "short",
    style = "decimal",
  } = options ?? {}

  const formatedNumber = new Intl.NumberFormat("en-US", {
    notation,
    compactDisplay,
    style,
  }).format(Number(num))

  return formatedNumber
}
