import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const HOME_PAGE_KEY: string = "HOME__PAGE";
