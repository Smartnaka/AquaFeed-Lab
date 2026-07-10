import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export const formatKg = (value: number) => `${value.toFixed(2)} kg`;
export const formatGram = (value: number) => `${value.toFixed(0)} g`;
