import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Avisos por email antes de cada pago (solo plan Pro, con avisos_activos).
// Pensado para ejecutarse a diario vía pg_cron + pg_net (ver migración
// 0002_reminders_cron.sql). verify_jwt=true: solo el propio proyecto, con su
// service_role key guardada en Vault, puede llamar a este endpoint.
const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "MSI Tracker <onboarding@resend.dev>";
const DIAS_AVISO = 3;

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Misma lógica de fechas que lib/msi.ts, duplicada a propósito: esta función
// corre en Deno, aparte del bundle de Next, y no comparte build con él.
function daysInMonth(year: number, m0: number): number {
  return new Date(Date.UTC(year, m0 + 1, 0)).getUTCDate();
}
function clampDay(day: number, year: number, m0: number): number {
  return Math.min(day, daysInMonth(year, m0));
}
function addMonths(year: number, m0: number, delta: number) {
  const total = m0 + delta;
  return { year: year + Math.floor(total / 12), m0: ((total % 12) + 12) % 12 };
}
function parseISO(iso: string) {
  const parts = iso.split("-");
  return { year: Number(parts[0]), m0: Number(parts[1]) - 1, day: Number(parts[2]) };
}
function formatISO(year: number, m0: number, day: number): string {
  return `${year}-${String(m0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface Cuota {
  fechaVencimiento: string;
  monto: number;
}

function calcularCuotas(
  importe: number,
  meses: number,
  fechaCompra: string,
  liquidadaEn: string | null,
  diaCorte: number,
  diaLimitePago: number,
): Cuota[] {
  const p = parseISO(fechaCompra);
  const purchaseTime = Date.UTC(p.year, p.m0, p.day);

  let corte = { year: p.year, m0: p.m0 };
  let cDay = clampDay(diaCorte, corte.year, corte.m0);
  let cTime = Date.UTC(corte.year, corte.m0, cDay);
  if (cTime < purchaseTime) {
    corte = addMonths(corte.year, corte.m0, 1);
    cDay = clampDay(diaCorte, corte.year, corte.m0);
    cTime = Date.UTC(corte.year, corte.m0, cDay);
  }

  let pago = { year: corte.year, m0: corte.m0 };
  const pDay = clampDay(diaLimitePago, pago.year, pago.m0);
  const pTime = Date.UTC(pago.year, pago.m0, pDay);
  if (pTime <= cTime) {
    pago = addMonths(pago.year, pago.m0, 1);
  }

  const importeCents = Math.round(importe * 100);
  const baseCents = Math.floor(importeCents / meses);
  const lastCents = importeCents - baseCents * (meses - 1);
  const liqKey = liquidadaEn
    ? (() => {
        const l = parseISO(liquidadaEn);
        return `${l.year}-${String(l.m0 + 1).padStart(2, "0")}`;
      })()
    : null;

  const cuotas: Cuota[] = [];
  let cur = { year: pago.year, m0: pago.m0 };
  for (let i = 1; i <= meses; i++) {
    const key = `${cur.year}-${String(cur.m0 + 1).padStart(2, "0")}`;
    if (liqKey !== null && key >= liqKey) break;
    const day = clampDay(diaLimitePago, cur.year, cur.m0);
    const cents = i === meses ? lastCents : baseCents;
    cuotas.push({ fechaVencimiento: formatISO(cur.year, cur.m0, day), monto: cents / 100 });
    cur = addMonths(cur.year, cur.m0, 1);
  }
  return cuotas;
}

interface Aviso {
  descripcion: string;
  monto: number;
  fecha: string;
  cardId: string;
  mes: string;
}

async function sendReminderEmail(toEmail: string, items: Aviso[]): Promise<boolean> {
  const filas = items
    .map((i) => `<li>${i.descripcion}: $${i.monto.toFixed(2)} MXN — vence ${i.fecha}</li>`)
    .join("");

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [toEmail],
      subject: "Pagos de tus MSI que vencen pronto",
      html: `<p>Estos pagos vencen en los próximos ${DIAS_AVISO} días:</p><ul>${filas}</ul>`,
    }),
  });

  return res.ok;
}

Deno.serve(async (_req: Request) => {
  const hoy = new Date();
  const limite = new Date(hoy.getTime() + DIAS_AVISO * 24 * 3600 * 1000);
  const hoyISO = hoy.toISOString().slice(0, 10);
  const limiteISO = limite.toISOString().slice(0, 10);

  const { data: perfiles, error: perfilesError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("plan", "pro")
    .eq("avisos_activos", true);

  if (perfilesError) {
    console.error("Error leyendo perfiles:", perfilesError.message);
    return new Response(JSON.stringify({ error: perfilesError.message }), { status: 500 });
  }

  let enviados = 0;

  for (const perfil of perfiles ?? []) {
    const [{ data: cards }, { data: purchases }, { data: userData }] = await Promise.all([
      supabaseAdmin.from("cards").select("*").eq("user_id", perfil.id),
      supabaseAdmin.from("purchases").select("*").eq("user_id", perfil.id).is("liquidada_en", null),
      supabaseAdmin.auth.admin.getUserById(perfil.id),
    ]);

    const email = userData?.user?.email;
    if (!email || !cards || !purchases) continue;

    const cardsPorId = new Map(cards.map((c) => [c.id, c]));
    const candidatos: Aviso[] = [];

    for (const compra of purchases) {
      const tarjeta = cardsPorId.get(compra.card_id);
      if (!tarjeta) continue;

      const cuotas = calcularCuotas(
        compra.importe,
        compra.meses,
        compra.fecha_compra,
        compra.liquidada_en,
        tarjeta.dia_corte,
        tarjeta.dia_limite_pago,
      );

      for (const c of cuotas) {
        if (c.fechaVencimiento >= hoyISO && c.fechaVencimiento <= limiteISO) {
          candidatos.push({
            descripcion: compra.descripcion,
            monto: c.monto,
            fecha: c.fechaVencimiento,
            cardId: compra.card_id,
            mes: c.fechaVencimiento.slice(0, 7),
          });
        }
      }
    }

    if (candidatos.length === 0) continue;

    // Un aviso por (tarjeta, mes) como mucho - si ya se registró en
    // reminders_log, no se repite aunque el cron corra varias veces.
    const pendientes: Aviso[] = [];
    for (const item of candidatos) {
      const { data: yaEnviado } = await supabaseAdmin
        .from("reminders_log")
        .select("id")
        .eq("user_id", perfil.id)
        .eq("card_id", item.cardId)
        .eq("mes", `${item.mes}-01`)
        .maybeSingle();
      if (!yaEnviado) pendientes.push(item);
    }

    if (pendientes.length === 0) continue;

    const ok = await sendReminderEmail(email, pendientes);
    if (!ok) {
      console.error("Error enviando recordatorio a", email);
      continue;
    }

    enviados++;
    const combosUnicos = new Map(pendientes.map((p) => [`${p.cardId}-${p.mes}`, p]));
    for (const p of combosUnicos.values()) {
      await supabaseAdmin
        .from("reminders_log")
        .insert({ user_id: perfil.id, card_id: p.cardId, mes: `${p.mes}-01` });
    }
  }

  return new Response(JSON.stringify({ enviados }), {
    headers: { "Content-Type": "application/json" },
  });
});
