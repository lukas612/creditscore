import { createClient } from "@supabase/supabase-js";
import { CREDIT_OFFERS } from "../data/offers";
import { WITME_QUESTIONS } from "../data/witmeQuestions";
import "./admin.css";

const OFFER_LABELS: Record<string, string> = {
  witme_featured: "Witme (oferta destacada)",
  ...Object.fromEntries(CREDIT_OFFERS.map((o) => [o.id, o.name])),
};

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anonKey) throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
const supabase = createClient(url, anonKey);

const SESSION_KEY = "cs_admin_pw";
const root = document.getElementById("admin-root")!;

interface Stats {
  total_leads: number;
  period_leads: number;
  period_sessions: number;
  period_conversion_rate: number;
  avg_score: number | null;
  band_excelente: number;
  band_bueno: number;
  band_regular: number;
  band_bajo: number;
}

type PresetKey = "today" | "7d" | "all" | "custom";

interface Period {
  since: string;
  until: string;
}

function toDateInputValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const today = new Date();
let currentPreset: PresetKey = "all";
let customFrom = toDateInputValue(today);
let customTo = toDateInputValue(today);

type SourceKey = "all" | "quiz" | "solicitud";
let currentSource: SourceKey = "all";

const LEADS_PAGE_SIZE = 25;
let currentLeadsPage = 0;

const SOURCE_LABELS: Record<SourceKey, string> = {
  all: "Todos",
  quiz: "Quiz corto",
  solicitud: "Solicitud completa",
};

function periodFor(preset: PresetKey): Period {
  const now = new Date();
  if (preset === "today") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    return { since: start.toISOString(), until: now.toISOString() };
  }
  if (preset === "7d") {
    const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return { since: start.toISOString(), until: now.toISOString() };
  }
  if (preset === "custom") {
    const from = new Date(`${customFrom}T00:00:00`);
    const to = new Date(`${customTo}T23:59:59.999`);
    if (from.getTime() > to.getTime()) {
      return { since: to.toISOString(), until: from.toISOString() };
    }
    return { since: from.toISOString(), until: to.toISOString() };
  }
  return { since: "2000-01-01T00:00:00.000Z", until: now.toISOString() };
}

const periodDateFmt = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" });

function periodLabel(preset: PresetKey, period: Period): string {
  if (preset === "all") return "Todo el histórico";
  return `${periodDateFmt.format(new Date(period.since))} – ${periodDateFmt.format(new Date(period.until))}`;
}

interface FunnelOverview {
  total_visits: number;
  engaged_visits: number;
  bounce_rate: number;
  total_quiz_completed: number;
  total_leads: number;
  visit_to_quiz_rate: number;
  visit_to_lead_rate: number;
  engaged_to_quiz_rate: number;
  engaged_to_lead_rate: number;
  quiz_to_lead_rate: number;
}

interface FunnelStepRow {
  question_key: string;
  reached: number;
}

interface StepDef {
  key: string;
  label: string;
  conditional?: boolean;
}

// Orden y etiquetas reflejan src/data/questions.ts. Si cambia el orden o las
// preguntas del quiz, hay que actualizar esta lista a mano.
const STEP_DEFS: StepDef[] = [
  { key: "fecha_de_nacimiento", label: "Fecha de nacimiento" },
  { key: "codigo_postal", label: "Código postal" },
  { key: "fuente_principal_de_ingreso", label: "Fuente de ingresos" },
  { key: "antiguedad_laboral", label: "Antigüedad laboral", conditional: true },
  { key: "tienes_vivienda_en_propiedad", label: "Vivienda en propiedad" },
  { key: "ingreso_mensual", label: "Ingreso mensual" },
  { key: "esta_en_asnef", label: "Asnef" },
  { key: "tienes_otros_creditos", label: "Otros créditos" },
  { key: "importe_total_de_la_deuda", label: "Importe de la deuda", conditional: true },
  { key: "proposito_del_prestamo", label: "Propósito del préstamo" },
  { key: "creditos_cantidad_a_solicitar", label: "Importe a solicitar" },
  { key: "en_cuantos_meses_deseas_devolverlo", label: "Plazo de devolución" },
];

// Deriva las preguntas de la solicitud larga directamente de
// src/data/witmeQuestions.ts (misma fuente que usa el formulario), en vez de
// mantener otra lista a mano.
const STEP_DEFS_SOLICITUD: StepDef[] = WITME_QUESTIONS.map((q) => ({
  key: q.key,
  label: q.label,
  conditional: !!q.condition,
}));

interface Lead {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  zip_code: string | null;
  score: number | null;
  score_band: string | null;
  status: string;
  source: string;
  quiz_session_id: string;
  offer_clicks: string[] | null;
  total_count: number;
}

const dateFmt = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function escapeHtml(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function sourceParam(source: SourceKey): string | null {
  return source === "all" ? null : source;
}

async function fetchStats(password: string, period: Period, source: SourceKey): Promise<Stats> {
  const { data, error } = await supabase
    .rpc("admin_get_stats", {
      p_password: password,
      p_since: period.since,
      p_until: period.until,
      p_source: sourceParam(source),
    })
    .single<Stats>();
  if (error || !data) throw error ?? new Error("No data");
  return data;
}

async function fetchFunnelOverview(password: string, period: Period, source: SourceKey): Promise<FunnelOverview> {
  const { data, error } = await supabase
    .rpc("admin_get_funnel_overview", {
      p_password: password,
      p_since: period.since,
      p_until: period.until,
      p_source: sourceParam(source),
    })
    .single<FunnelOverview>();
  if (error || !data) throw error ?? new Error("No data");
  return data;
}

async function fetchFunnelSteps(password: string, period: Period, source: SourceKey): Promise<FunnelStepRow[]> {
  const { data, error } = await supabase.rpc("admin_get_funnel_steps", {
    p_password: password,
    p_since: period.since,
    p_until: period.until,
    p_source: sourceParam(source),
  });
  if (error) throw error;
  return (data ?? []) as FunnelStepRow[];
}

async function fetchLeads(password: string, period: Period, source: SourceKey, page: number): Promise<Lead[]> {
  const { data, error } = await supabase.rpc("admin_list_leads", {
    p_password: password,
    p_limit: LEADS_PAGE_SIZE,
    p_offset: page * LEADS_PAGE_SIZE,
    p_since: period.since,
    p_until: period.until,
    p_source: sourceParam(source),
  });
  if (error) throw error;
  return (data ?? []) as Lead[];
}

interface WitmeApplication {
  id: string;
  created_at: string;
  click_id: string | null;
  utm_source: string | null;
  witme_id: number | null;
  witme_status: string | null;
  witme_message: unknown;
  name: string | null;
  last_name: string | null;
  email: string | null;
  requested_amount: number | null;
}

async function fetchWitmeApplications(password: string): Promise<WitmeApplication[]> {
  const { data, error } = await supabase.rpc("admin_get_witme_applications", {
    p_password: password,
    p_limit: 100,
    p_offset: 0,
  });
  if (error) throw error;
  return (data ?? []) as WitmeApplication[];
}

interface OfferClickRow {
  offer_id: string;
  clicks: number;
}

async function fetchOfferClicks(password: string, period: Period, source: SourceKey): Promise<OfferClickRow[]> {
  const { data, error } = await supabase.rpc("admin_get_offer_clicks", {
    p_password: password,
    p_since: period.since,
    p_until: period.until,
    p_source: sourceParam(source),
  });
  if (error) throw error;
  return (data ?? []) as OfferClickRow[];
}

function renderLogin(errorMsg?: string) {
  root.innerHTML = `
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${errorMsg ? `<p class="admin-error">${escapeHtml(errorMsg)}</p>` : ""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `;

  document.getElementById("login-form")!.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = (document.getElementById("pw-input") as HTMLInputElement).value;
    try {
      await fetchStats(password, periodFor("all"), "all");
      sessionStorage.setItem(SESSION_KEY, password);
      renderDashboard(password);
    } catch {
      renderLogin("Contraseña incorrecta.");
    }
  });
}

function statCard(label: string, value: string) {
  return `<div class="admin-stat"><span class="admin-stat-value">${value}</span><span class="admin-stat-label">${label}</span></div>`;
}

function bandRow(label: string, count: number, total: number, cls: string) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return `
    <div class="admin-band-row">
      <span class="admin-band-label">${label}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="admin-band-count">${count}</span>
    </div>
  `;
}

function funnelStepsHtml(overview: FunnelOverview, steps: FunnelStepRow[], stepDefs: StepDef[]): string {
  const reachedByKey = new Map(steps.map((s) => [s.question_key, Number(s.reached)]));
  const base = overview.engaged_visits;

  let rows = "";
  let baselineKey = stepDefs[0]?.key;

  stepDefs.forEach((def, i) => {
    const reached = reachedByKey.get(def.key) ?? 0;
    const pctOfVisits = base > 0 ? Math.round((reached / base) * 100) : 0;

    let dropoffHtml = "";
    if (i > 0 && !def.conditional) {
      const baselineReached = reachedByKey.get(baselineKey) ?? 0;
      if (baselineReached > 0) {
        const dropPct = Math.round((1 - reached / baselineReached) * 100);
        const cls = dropPct >= 25 ? "high" : dropPct >= 10 ? "mid" : "low";
        dropoffHtml =
          dropPct > 0
            ? `<span class="funnel-drop funnel-drop-${cls}">-${dropPct}% respecto al paso anterior</span>`
            : `<span class="funnel-drop funnel-drop-low">sin caída</span>`;
      }
    }

    rows += `
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${i + 1}. ${escapeHtml(def.label)}${
            def.conditional
              ? ' <span class="funnel-conditional">(condicional, no todos la ven)</span>'
              : ""
          }</span>
          <span class="funnel-step-count">${reached} · ${pctOfVisits}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${pctOfVisits}%"></div></div>
        ${dropoffHtml}
      </div>
    `;

    if (!def.conditional) baselineKey = def.key;
  });

  return rows;
}

async function renderDashboard(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  const period = periodFor(currentPreset);

  try {
    const [stats, leads, funnelOverview, funnelSteps, witmeApps, offerClicks] = await Promise.all([
      fetchStats(password, period, currentSource),
      fetchLeads(password, period, currentSource, currentLeadsPage),
      fetchFunnelOverview(password, period, currentSource),
      fetchFunnelSteps(password, period, currentSource),
      fetchWitmeApplications(password),
      fetchOfferClicks(password, period, currentSource),
    ]);
    const totalBands = stats.band_excelente + stats.band_bueno + stats.band_regular + stats.band_bajo;
    const stepDefs = currentSource === "solicitud" ? STEP_DEFS_SOLICITUD : STEP_DEFS;
    const totalLeadsCount = leads[0]?.total_count ?? 0;
    const totalLeadsPages = Math.max(1, Math.ceil(totalLeadsCount / LEADS_PAGE_SIZE));

    root.innerHTML = `
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-card admin-source-bar">
          <span class="admin-source-label">Embudo:</span>
          <div class="admin-period-presets">
            ${(Object.keys(SOURCE_LABELS) as SourceKey[])
              .map(
                (key) =>
                  `<button class="admin-period-btn ${currentSource === key ? "active" : ""}" data-source="${key}">${SOURCE_LABELS[key]}</button>`,
              )
              .join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${currentPreset === "today" ? "active" : ""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${currentPreset === "7d" ? "active" : ""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${currentPreset === "all" ? "active" : ""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${currentPreset === "custom" ? "active" : ""}">
            <input type="date" id="period-from" value="${customFrom}" />
            <span>–</span>
            <input type="date" id="period-to" value="${customTo}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${escapeHtml(periodLabel(currentPreset, period))}</p>
        </section>

        <section class="admin-stats-grid">
          ${statCard("Leads totales (histórico)", String(stats.total_leads))}
          ${statCard("Leads en el periodo", String(stats.period_leads))}
          ${statCard("Sesiones en el periodo", String(stats.period_sessions))}
          ${statCard("Tasa de conversión", `${stats.period_conversion_rate}%`)}
          ${statCard("Score medio (periodo)", stats.avg_score != null ? String(stats.avg_score) : "—")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Embudo: visita → lead</p>
          <p class="admin-card-sub">
            "Visitas" incluye todo el tráfico, real o no (bots, clics accidentales,
            tráfico de baja calidad). "Sobre interesados reales" descuenta el rebote
            instantáneo (sesiones que nunca pasan de la primera pregunta) y es la
            medida más fiable de si el test/formulario en sí convierte bien.
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("Visitas", String(funnelOverview.total_visits))}
            ${statCard("Rebote instantáneo", `${funnelOverview.bounce_rate}%`)}
            ${statCard("Quiz → lead", `${funnelOverview.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("Completan el quiz", `${funnelOverview.visit_to_quiz_rate}%`)}
            ${statCard("Dejan sus datos (lead)", `${funnelOverview.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("Completan el quiz", `${funnelOverview.engaged_to_quiz_rate}%`)}
            ${statCard("Dejan sus datos (lead)", `${funnelOverview.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${
            currentSource === "all"
              ? `<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>`
              : `<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${funnelOverview.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${funnelStepsHtml(funnelOverview, funnelSteps, stepDefs)}`
          }
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${bandRow("Excelente", stats.band_excelente, totalBands, "band-excelente")}
          ${bandRow("Bueno", stats.band_bueno, totalBands, "band-bueno")}
          ${bandRow("Regular", stats.band_regular, totalBands, "band-regular")}
          ${bandRow("Bajo", stats.band_bajo, totalBands, "band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${totalLeadsCount})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${leads
                  .map(
                    (l) => `
                  <tr>
                    <td>${dateFmt.format(new Date(l.created_at))}</td>
                    <td>${escapeHtml(l.first_name)} ${escapeHtml(l.last_name ?? "")}</td>
                    <td>${escapeHtml(l.email)}</td>
                    <td>${escapeHtml(l.phone ?? "")}</td>
                    <td>${escapeHtml(l.zip_code ?? "")}</td>
                    <td>${l.score ?? "—"}</td>
                    <td><span class="admin-badge band-${l.score_band ?? ""}">${l.score_band ?? "—"}</span></td>
                    <td>${escapeHtml(l.status)}</td>
                    <td>${escapeHtml(SOURCE_LABELS[l.source as SourceKey] ?? l.source)}</td>
                    <td>${
                      l.offer_clicks && l.offer_clicks.length > 0
                        ? l.offer_clicks.map((id) => escapeHtml(OFFER_LABELS[id] ?? id)).join(", ")
                        : "—"
                    }</td>
                  </tr>
                `,
                  )
                  .join("")}
                ${leads.length === 0 ? `<tr><td colspan="10" class="admin-empty">Todavía no hay leads.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${currentLeadsPage === 0 ? "disabled" : ""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${currentLeadsPage + 1} de ${totalLeadsPages}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${currentLeadsPage + 1 >= totalLeadsPages ? "disabled" : ""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${witmeApps.length})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta. Mientras esté en
            modo sandbox, "failed" no significa que el usuario hiciera algo mal — es el modo
            de pruebas antes de confirmar producción con su equipo.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th><th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                ${witmeApps
                  .map(
                    (w) => `
                  <tr>
                    <td>${dateFmt.format(new Date(w.created_at))}</td>
                    <td>${escapeHtml(w.name ?? "")} ${escapeHtml(w.last_name ?? "")}</td>
                    <td>${escapeHtml(w.email ?? "")}</td>
                    <td>${w.requested_amount != null ? `${w.requested_amount} €` : "—"}</td>
                    <td>${w.witme_id ?? "—"}</td>
                    <td><span class="admin-badge ${w.witme_status === "processed" ? "band-excelente" : "band-bajo"}">${escapeHtml(w.witme_status ?? "—")}</span></td>
                    <td>${escapeHtml(JSON.stringify(w.witme_message ?? ""))}</td>
                  </tr>
                `,
                  )
                  .join("")}
                ${witmeApps.length === 0 ? `<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Clics en ofertas</p>
          <p class="admin-card-sub">
            Cuántas veces se ha hecho click en "Ver oferta" y en cuál, en el periodo y
            embudo seleccionados. No mide si el usuario llegó a contratar, solo el click.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr><th>Oferta</th><th>Clics</th></tr>
              </thead>
              <tbody>
                ${offerClicks
                  .map(
                    (o) => `
                  <tr>
                    <td>${escapeHtml(OFFER_LABELS[o.offer_id] ?? o.offer_id)}</td>
                    <td>${o.clicks}</td>
                  </tr>
                `,
                  )
                  .join("")}
                ${offerClicks.length === 0 ? `<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    document.getElementById("refresh-btn")!.addEventListener("click", () => renderDashboard(password));
    document.getElementById("logout-btn")!.addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      renderLogin();
    });

    document.querySelectorAll<HTMLButtonElement>(".admin-period-btn[data-source]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentSource = btn.dataset.source as SourceKey;
        currentLeadsPage = 0;
        renderDashboard(password);
      });
    });

    document.querySelectorAll<HTMLButtonElement>(".admin-period-btn[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPreset = btn.dataset.preset as PresetKey;
        currentLeadsPage = 0;
        renderDashboard(password);
      });
    });
    document.getElementById("period-apply-btn")!.addEventListener("click", () => {
      customFrom = (document.getElementById("period-from") as HTMLInputElement).value || customFrom;
      customTo = (document.getElementById("period-to") as HTMLInputElement).value || customTo;
      currentPreset = "custom";
      currentLeadsPage = 0;
      renderDashboard(password);
    });

    document.getElementById("leads-prev-btn")!.addEventListener("click", () => {
      if (currentLeadsPage > 0) {
        currentLeadsPage--;
        renderDashboard(password);
      }
    });
    document.getElementById("leads-next-btn")!.addEventListener("click", () => {
      currentLeadsPage++;
      renderDashboard(password);
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("unauthorized")) {
      sessionStorage.removeItem(SESSION_KEY);
      renderLogin("Tu sesión ha caducado o la contraseña ya no es válida.");
    } else {
      // Un error que no es de autenticación (p.ej. un bug en una consulta) no
      // debe borrar la sesión ni decir "contraseña incorrecta" - eso confunde
      // un fallo del servidor con un problema de acceso.
      root.innerHTML = `
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${escapeHtml(message)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `;
      document.getElementById("retry-btn")!.addEventListener("click", () => renderDashboard(password));
    }
  }
}

const savedPassword = sessionStorage.getItem(SESSION_KEY);
if (savedPassword) {
  renderDashboard(savedPassword);
} else {
  renderLogin();
}
