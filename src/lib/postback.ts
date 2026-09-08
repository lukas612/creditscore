export function getClickId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("servy_click") ?? params.get("click_id") ?? params.get("clickid");
}

export function fireServyPostback(clickId: string) {
  const url = `https://go.servy.es/postback?cid=${encodeURIComponent(
    clickId,
  )}&payout=0&currency=EUR&param1=Creditio_score`;
  // Pixel fire-and-forget: avoids CORS issues and we don't need the response.
  new Image().src = url;
}
