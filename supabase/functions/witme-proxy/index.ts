import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const WITME_BASE_URL = "https://gestion.servy.es/api/partners";
const PARTNER_ID = 94;
const WITME_TIMEOUT_MS = 20_000;

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

function sqlDatetime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const token = Deno.env.get("WITME_API_TOKEN");
  if (!token) {
    return jsonResponse({ error: "WITME_API_TOKEN no configurado en los secretos del proyecto" }, 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "JSON inválido" }, 400);
  }

  if (body.action === "catalog") {
    const paramName = typeof body.paramName === "string" ? body.paramName : null;
    const url = paramName
      ? `${WITME_BASE_URL}/catalog/${encodeURIComponent(paramName)}`
      : `${WITME_BASE_URL}/catalog`;
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(WITME_TIMEOUT_MS),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  if (body.action === "submit") {
    const data = body.data;
    if (!data || typeof data !== "object") {
      return jsonResponse({ error: "Falta 'data'" }, 400);
    }

    const ipFrom =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "0.0.0.0";
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const now = new Date();

    const payload = {
      partnerId: PARTNER_ID,
      externalId: typeof body.externalId === "string" || typeof body.externalId === "number" ? body.externalId : null,
      country: "ES",
      // Producción confirmada. Nunca controlable por el cliente que llama a
      // esta función.
      sandbox: false,
      meta: {
        landedAt: typeof body.landedAt === "string" ? body.landedAt : sqlDatetime(now),
        sentAt: sqlDatetime(now),
        sentFrom: typeof body.sentFrom === "string" ? body.sentFrom : "unknown",
        userAgent,
        ipFrom,
      },
      data,
      tracking: typeof body.tracking === "object" && body.tracking !== null ? body.tracking : {},
    };

    // De momento no cortamos la llamada a Witme con un timeout propio - no
    // tenemos datos reales de cuánto tarda normalmente, así que primero
    // medimos y guardamos witme_response_ms en cada intento (éxito o error)
    // para poder decidir con datos si merece la pena cortar, y en cuánto.
    const startedAt = Date.now();
    let upstream: Response;
    try {
      upstream = await fetch(`${WITME_BASE_URL}/leads/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      const responseMs = Date.now() - startedAt;
      const message = `Error contactando con Witme: ${err instanceof Error ? err.message : String(err)}`;

      const { error: logError } = await supabaseAdmin.from("witme_applications").insert({
        click_id: typeof body.clickId === "string" ? body.clickId : null,
        utm_source: typeof body.utmSource === "string" ? body.utmSource : null,
        request_payload: payload,
        witme_id: null,
        witme_status: "error",
        witme_message: message,
        witme_redirect_url: null,
        witme_response_ms: responseMs,
      });
      if (logError) {
        console.error("Error logging witme_applications:", logError.message);
      }

      return jsonResponse({ error: message }, 502);
    }
    const responseMs = Date.now() - startedAt;
    const text = await upstream.text();

    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // seguimos igualmente para al menos dejar constancia del intento
    }

    const { error: logError } = await supabaseAdmin.from("witme_applications").insert({
      click_id: typeof body.clickId === "string" ? body.clickId : null,
      utm_source: typeof body.utmSource === "string" ? body.utmSource : null,
      request_payload: payload,
      witme_id: typeof parsed.id === "number" ? parsed.id : null,
      witme_status: typeof parsed.status === "string" ? parsed.status : null,
      witme_message: parsed.message ?? null,
      witme_redirect_url: typeof parsed.redirectUrl === "string" ? parsed.redirectUrl : null,
      witme_response_ms: responseMs,
    });
    if (logError) {
      console.error("Error logging witme_applications:", logError.message);
    }

    return new Response(text, {
      status: upstream.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  return jsonResponse({ error: "Acción desconocida. Usa 'catalog' o 'submit'." }, 400);
});
