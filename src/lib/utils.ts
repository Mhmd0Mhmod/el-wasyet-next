import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaults = {
  pageSize: parseInt(process.env.NEXT_PUBLIC_API_PAGE_SIZE || "0", 0),
};

// Utility function to restrict input to digits only
export const handleNumberKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  // Allow: digits (0-9), backspace, delete, tab, enter, decimal point for floats
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
  ];
  const isDigit = /[0-9]/.test(e.key);
  const isDecimal = e.key === "." && !e.currentTarget.value.includes(".");

  if (!isDigit && !allowedKeys.includes(e.key) && !isDecimal) {
    e.preventDefault();
  }
};
