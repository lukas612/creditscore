import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17.4.0";

// Única fuente de verdad de si alguien es Pro: escucha el estado real de la
// suscripción (no solo "pagó una vez"), así que altas, bajas, impagos y
// cancelaciones se reflejan solos en profiles.plan. Sin JWT de Supabase
// (verify_jwt=false) porque Stripe no lo manda - la autenticación real es la
// firma de Stripe verificada más abajo.
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-11-20.acacia",
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!.trim();

const PLAN_ACTIVO_STATUSES = new Set(["active", "trialing"]);

Deno.serve(async (req: Request) => {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!signature) {
    return new Response("Falta stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      WEBHOOK_SECRET,
      undefined,
      cryptoProvider,
    );
  } catch (err) {
    console.error("Firma de Stripe inválida:", err instanceof Error ? err.message : String(err));
    return new Response("Firma inválida", { status: 400 });
  }

  if (!event.type.startsWith("customer.subscription.")) {
    return new Response("ok", { status: 200 });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const nuevoPlan = PLAN_ACTIVO_STATUSES.has(subscription.status) ? "pro" : "free";

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ plan: nuevoPlan })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error actualizando el plan:", error.message);
  }

  return new Response("ok", { status: 200 });
});
