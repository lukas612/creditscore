import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17.4.0";

// Webhook de Stripe para "Crédito Claro": única fuente de verdad de que un
// pago se completó de verdad (stripe-checkout solo abre la puerta, nunca
// marca nada como pagado). Sin JWT de Supabase (verify_jwt=false) porque
// Stripe no lo manda - la autenticación real es la firma de Stripe
// verificada más abajo.
const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "Scorea <onboarding@resend.dev>";
const PDF_FILENAME = "Scorea-Guia-Buro-Credito-Mexico.pdf";
// El PDF se sirve como asset estático del propio sitio (public/credito-claro-guia.pdf,
// desplegado junto al resto del frontend) y se descarga aquí en el momento de
// enviarlo - así no hace falta empotrar un blob base64 de 70K+ caracteres en
// el código de la función ni depender de un bucket de Storage aparte.
const PDF_SOURCE_URL = "https://creditscore.creditio.es/credito-claro-guia.pdf";

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function fetchPdfBase64(): Promise<string> {
  const res = await fetch(PDF_SOURCE_URL);
  if (!res.ok) {
    throw new Error(`No se pudo descargar el PDF (${res.status}) desde ${PDF_SOURCE_URL}`);
  }
  const bytes = new Uint8Array(await res.arrayBuffer());
  return toBase64(bytes);
}

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-11-20.acacia",
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

async function sendGuideEmail(toEmail: string): Promise<{ ok: boolean; messageId: string | null; error: string | null }> {
  let pdfBase64: string;
  try {
    pdfBase64 = await fetchPdfBase64();
  } catch (err) {
    return { ok: false, messageId: null, error: err instanceof Error ? err.message : String(err) };
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [toEmail],
      subject: "Tu guía Scorea",
      html: `
        <p>¡Gracias por tu compra!</p>
        <p>Aquí tienes tu guía <strong>Scorea</strong> en PDF, adjunta a este correo.</p>
        <p>Recuerda: es contenido educativo independiente, no afiliado a Buró de Crédito, Círculo de Crédito ni CONDUSEF.</p>
      `,
      attachments: [
        {
          filename: PDF_FILENAME,
          content: pdfBase64,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, messageId: null, error: `Resend ${res.status}: ${text}` };
  }
  const data = await res.json();
  return { ok: true, messageId: typeof data?.id === "string" ? data.id : null, error: null };
}

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
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider,
    );
  } catch (err) {
    console.error("Firma de Stripe inválida:", err instanceof Error ? err.message : String(err));
    return new Response("Firma inválida", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("ok", { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return new Response("ok", { status: 200 });
  }

  const { data: order, error: fetchError } = await supabaseAdmin
    .from("credito_claro_orders")
    .select("id, email, status")
    .eq("stripe_checkout_session_id", session.id)
    .single();

  if (fetchError || !order) {
    console.error("No se encontró la orden para la sesión:", session.id, fetchError?.message);
    // 200 igualmente: si devolvemos error, Stripe reintentará el webhook
    // indefinidamente por una orden que nunca va a aparecer.
    return new Response("ok", { status: 200 });
  }

  // Idempotencia: Stripe puede reenviar el mismo evento más de una vez.
  if (order.status === "paid") {
    return new Response("ok", { status: 200 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("credito_claro_orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
    })
    .eq("id", order.id);
  if (updateError) {
    console.error("Error marcando la orden como pagada:", updateError.message);
  }

  const emailResult = await sendGuideEmail(order.email);

  const { error: deliveryError } = await supabaseAdmin.from("credito_claro_deliveries").insert({
    order_id: order.id,
    email: order.email,
    pdf_sent_at: emailResult.ok ? new Date().toISOString() : null,
    resend_message_id: emailResult.messageId,
    error: emailResult.error,
  });
  if (deliveryError) {
    console.error("Error registrando credito_claro_deliveries:", deliveryError.message);
  }
  if (!emailResult.ok) {
    console.error("Error enviando el PDF por email:", emailResult.error);
  }

  return new Response("ok", { status: 200 });
});
