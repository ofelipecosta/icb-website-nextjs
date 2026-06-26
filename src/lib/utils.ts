import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MONTHS_PT_LOWER = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

/** "2026-06-28" → "28 Jun. 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} ${MONTHS_PT[parseInt(m) - 1]}. ${y}`;
}

/** "2026-06-28" → "28 jun. 2026" (minúsculo — para corpo de texto) */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} de ${MONTHS_PT_LOWER[parseInt(m) - 1]}. de ${y}`;
}

/** "2026-06-28" → "28 Jun" (sem ano — para badges) */
export function formatDateShort(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${parseInt(d)} ${MONTHS_PT[parseInt(m) - 1]}`;
}
