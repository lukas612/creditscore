import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17.4.0";

// Checkout de Stripe para el plan Pro de MSI Tracker (suscripción mensual o
// anual). El plan en profiles.plan se activa/desactiva solo en
// msi-stripe-webhook, nunca aquí - este endpoint solo abre la puerta al pago.
const CURRENCY = "mxn";
const PRODUCT_NAME = "MSI Tracker Pro";
const PRICE_CENTS: Record<"month" | "year", number> = { month: 4900, year: 39900 };

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return jsonResponse({ error: "Falta sesión" }, 401);
  }

  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(authHeader.replace("Bearer ", ""));
  if (userError || !user) {
    return jsonResponse({ error: "Sesión inválida" }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "JSON inválido" }, 400);
  }

  const interval = body.interval === "year" ? "year" : "month";
  const origin = typeof body.origin === "string" ? body.origin : null;
  if (!origin) {
    return jsonResponse({ error: "Falta 'origin'" }, 400);
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: PRICE_CENTS[interval as "month" | "year"],
            recurring: { interval: interval as "month" | "year" },
            product_data: { name: PRODUCT_NAME },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/plan/?pago=exito`,
      cancel_url: `${origin}/plan/?pago=cancelado`,
      metadata: { user_id: user.id },
    });

    return jsonResponse({ checkoutUrl: session.url });
  } catch (err) {
    console.error("Error creando Checkout Session:", err instanceof Error ? err.message : String(err));
    return jsonResponse({ error: "No se pudo iniciar el pago" }, 502);
  }
});
