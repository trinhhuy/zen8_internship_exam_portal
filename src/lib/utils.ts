import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
}
