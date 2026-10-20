import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.4.0";

// Herramienta de diagnóstico puntual (no se llama desde el frontend): lista
// los PaymentIntents recientes de Scorea Resultado con el motivo real de
// bloqueo/error que da Stripe (Radar outcome, decline_code, etc.), para
// distinguir "card testing" real de un problema de configuración nuestro
// (3DS, billing details, etc.) que esté tumbando pagos legítimos.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-11-20.acacia",
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 50);

  const paymentIntents = await stripe.paymentIntents.list({
    limit,
    expand: ["data.latest_charge"],
  });

  const rows = paymentIntents.data.map((pi) => {
    const charge = pi.latest_charge && typeof pi.latest_charge !== "string" ? pi.latest_charge : null;
    return {
      id: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: pi.status,
      created: new Date(pi.created * 1000).toISOString(),
      last_payment_error: pi.last_payment_error
        ? {
            code: pi.last_payment_error.code,
            decline_code: (pi.last_payment_error as { decline_code?: string }).decline_code,
            message: pi.last_payment_error.message,
          }
        : null,
      charge_outcome: charge?.outcome
        ? {
            network_status: charge.outcome.network_status,
            reason: charge.outcome.reason,
            risk_level: charge.outcome.risk_level,
            risk_score: charge.outcome.risk_score,
            seller_message: charge.outcome.seller_message,
            type: charge.outcome.type,
          }
        : null,
      payment_method_details: charge?.payment_method_details?.card
        ? {
            brand: charge.payment_method_details.card.brand,
            country: charge.payment_method_details.card.country,
            three_d_secure: charge.payment_method_details.card.three_d_secure,
          }
        : null,
    };
  });

  return new Response(JSON.stringify({ rows }, null, 2), {
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
