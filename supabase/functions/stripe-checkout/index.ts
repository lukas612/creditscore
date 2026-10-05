import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17.4.0";

// Checkout real de Stripe para "Crédito Claro" (guía PDF, $149 MXN): crea la
// orden en credito_claro_orders como 'pending' y una Checkout Session; el
// pago se confirma de verdad en stripe-webhook (checkout.session.completed),
// nunca aquí - este endpoint solo abre la puerta al pago.
const AMOUNT_CENTS = 14900;
const CURRENCY = "mxn";
const PRODUCT_NAME = "Guía Scorea";
// Qué página de origen recibe la redirección tras el pago - ambas variantes
// del quiz (simple y "pro", para el test A/B) venden la misma guía con el
// mismo checkout, solo cambia a dónde vuelve Stripe. Whitelist cerrada para
// no construir un open redirect a partir de 'origin'.
const ALLOWED_RETURN_PATHS = ["/credito-claro.html", "/credito-claro-pro.html"];
const DEFAULT_RETURN_PATH = "/credito-claro.html";

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

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-11-20.acacia",
});

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const quizSessionId = typeof body.quizSessionId === "string" ? body.quizSessionId : null;
  const origin = typeof body.origin === "string" ? body.origin : null;
  const clickId = typeof body.clickId === "string" ? body.clickId : null;
  const returnPath = ALLOWED_RETURN_PATHS.includes(body.returnPath as string) ? (body.returnPath as string) : DEFAULT_RETURN_PATH;

  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Email inválido" }, 400);
  }
  if (!origin) {
    return jsonResponse({ error: "Falta 'origin'" }, 400);
  }

  const { data: order, error: insertError } = await supabaseAdmin
    .from("credito_claro_orders")
    .insert({
      quiz_session_id: quizSessionId,
      email,
      amount_cents: AMOUNT_CENTS,
      currency: CURRENCY.toUpperCase(),
      status: "pending",
      click_id: clickId,
    })
    .select("id")
    .single();

  if (insertError || !order) {
    console.error("Error creando credito_claro_orders:", insertError?.message);
    return jsonResponse({ error: "No se pudo crear la orden" }, 500);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: AMOUNT_CENTS,
            product_data: {
              name: PRODUCT_NAME,
              description: "Guía educativa en PDF sobre Buró de Crédito y Círculo de Crédito en México (13 páginas, plan de 90 días).",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}${returnPath}?pago=exito&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${returnPath}?pago=cancelado`,
      metadata: {
        order_id: order.id,
        quiz_session_id: quizSessionId ?? "",
      },
    });

    const { error: updateError } = await supabaseAdmin
      .from("credito_claro_orders")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", order.id);
    if (updateError) {
      console.error("Error guardando stripe_checkout_session_id:", updateError.message);
    }

    return jsonResponse({ checkoutUrl: session.url });
  } catch (err) {
    console.error("Error creando Checkout Session de Stripe:", err instanceof Error ? err.message : String(err));
    await supabaseAdmin.from("credito_claro_orders").update({ status: "failed" }).eq("id", order.id);
    return jsonResponse({ error: "No se pudo iniciar el pago" }, 502);
  }
});
