// Meta Pixel: no hace nada si no hay NEXT_PUBLIC_META_PIXEL_ID configurado,
// así que es seguro importar y llamar a trackPixelEvent en cualquier sitio
// sin comprobar antes si el pixel está activo.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPixelEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", eventName, params);
}
