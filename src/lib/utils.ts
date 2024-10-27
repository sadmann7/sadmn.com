import { env } from "@/env.js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
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
  options: Intl.NumberFormatOptions = {}
) {
  const formatedNumber = new Intl.NumberFormat("en-US", {
    notation: options?.notation ?? "compact",
    compactDisplay: options?.compactDisplay ?? "short",
    style: options?.style ?? "decimal",
    ...options,
  }).format(Number(num))

  return formatedNumber
}

/**
 * Calculates the reading time of a given text in minutes.
 * @param text The text to calculate reading time for
 * @param opts.wordsPerMinute The average reading speed (default: 200)
 * @returns The estimated reading time in minutes (rounded up)
 */
export function getReadingTime(
  text: string,
  opts: {
    wpm: number
  } = {
    wpm: 200,
  }
): number {
  const words = text.trim().split(/\s+/).length
  const minutes = words / opts.wpm
  return Math.ceil(minutes)
}
