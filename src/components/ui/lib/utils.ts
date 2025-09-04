import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToAmericanDate(isoString: string): string {
  const date = new Date(isoString);

  // Using Intl.DateTimeFormat for consistent locale formatting
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Example: "September 3, 2025"
  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  // Rearrange to "3 September, 2025"
  const [month, day, year] = formatted.replace(",", "").split(" ");
  return `${day} ${month}, ${year}`;
}
