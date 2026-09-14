export function getClickId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("servy_click") ?? params.get("click_id") ?? params.get("clickid");
}

// Desactivado a petición: no disparar postbacks de ES ni RO hasta que se
// reactive explícitamente (poner de nuevo en true).
const POSTBACKS_ENABLED = false;

export function fireServyPostback(clickId: string, param1: string = "Creditio_score") {
  if (!POSTBACKS_ENABLED) return;

  const url = `https://go.servy.es/postback?cid=${encodeURIComponent(
    clickId,
  )}&payout=0&currency=EUR&param1=${encodeURIComponent(param1)}`;
  // Pixel fire-and-forget: avoids CORS issues and we don't need the response.
  new Image().src = url;
}
