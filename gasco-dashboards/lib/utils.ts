import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Función principal para combinar clases - usar esta en nuevos componentes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Alias para compatibilidad con componentes existentes
export const cx = cn
