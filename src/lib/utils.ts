import { DecodedToken } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTokenValid(decodedToken: DecodedToken): boolean {
  const now = Date.now() / 1000
  return decodedToken.exp > now
}

export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0
}
