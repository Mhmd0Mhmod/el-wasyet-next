import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaults = {
  pageSize: parseInt(process.env.NEXT_PUBLIC_API_PAGE_SIZE || "10", 10),
};
