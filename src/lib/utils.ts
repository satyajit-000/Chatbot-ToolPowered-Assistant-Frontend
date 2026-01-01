import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SetStateAction } from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const handleCopy = async (value: string, setCopied: (value: SetStateAction<boolean>) => void, duration = 1500) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), duration);
};