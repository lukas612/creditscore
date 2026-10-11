import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.4.0";

// Consulta de solo lectura del estado real de una Checkout Session (usada
// por Scorea Resultado al volver del Embedded Checkout). Nunca marca nada
// como pagado ni envía el PDF - eso sigue siendo responsabilidad exclusiva
// de stripe-webhook. Esto es solo para decidir qué pantalla mostrarle al
// usuario (éxito vs "no se completó"), sin fiarse del query param ?pago=exito
// a secas, que cualquiera podría teclear en la URL.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-11-20.acacia",
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "JSON inválido" }, 400);
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : null;
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return jsonResponse({ error: "sessionId inválido" }, 400);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return jsonResponse({ status: session.status });
  } catch (err) {
    console.error("Error consultando Checkout Session:", err instanceof Error ? err.message : String(err));
    return jsonResponse({ error: "No se pudo consultar el pago" }, 502);
  }
});
