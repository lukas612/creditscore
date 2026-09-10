import { createClient } from "@supabase/supabase-js";
import { questions as QUIZ_QUESTIONS } from "../data/questions";
import { CREDIT_OFFERS } from "../data/offers";
import { WITME_QUESTIONS, SCORE_PHASE_KEYS } from "../data/witmeQuestions";
import "./admin.css";

const OFFER_LABELS: Record<string, string> = {
  witme_featured: "Witme (oferta destacada)",
  ...Object.fromEntries(CREDIT_OFFERS.map((o) => [o.id, o.name])),
};

// witme_featured_2, _3... son ofertas adicionales de la misma cascada de
// prestamistas de Witme para una solicitud (ver MAX_WITME_ATTEMPTS en
// src/lib/witme.ts), no están en OFFER_LABELS por no ser un id fijo.
function offerLabel(offerId: string): string {
  if (offerId in OFFER_LABELS) return OFFER_LABELS[offerId];
  const match = offerId.match(/^witme_featured_(\d+)$/);
  return match ? `Witme (oferta destacada ${match[1]})` : offerId;
}

// Traduce los valores crudos guardados en quiz_sessions.answers (códigos como
// "empleado" o textos ya legibles como "Cuenta ajena (Tiempo completo)") a la
// misma etiqueta que ve el usuario en el formulario, reutilizando las mismas
// definiciones de preguntas en vez de duplicar las opciones aquí.
function optionLabelMap(defs: { key: string; options?: { value: string; label: string }[] }[]): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {};
  for (const d of defs) {
    if (d.options) map[d.key] = Object.fromEntries(d.options.map((o) => [o.value, o.label]));
  }
  return map;
}
const QUIZ_OPTION_LABELS = optionLabelMap(QUIZ_QUESTIONS);
const WITME_OPTION_LABELS = optionLabelMap(WITME_QUESTIONS);
const YESNO_LABELS: Record<string, string> = { si: "Sí", no: "No" };

function fieldValueLabel(source: "quiz" | "solicitud" | "pingtree", fieldKey: string, value: string): string {
  const map = source === "quiz" ? QUIZ_OPTION_LABELS[fieldKey] : WITME_OPTION_LABELS[fieldKey];
  return map?.[value] ?? YESNO_LABELS[value] ?? value;
}

const QUIZ_FIELD_LABELS: Record<string, string> = {
  ingreso_mensual: "Ingreso mensual",
  importe_total_de_la_deuda: "Deuda total (entre quienes tienen)",
  creditos_cantidad_a_solicitar: "Importe solicitado",
  age: "Edad",
  esta_en_asnef: "En ASNEF",
  antiguedad_laboral: "Antigüedad laboral",
  tienes_otros_creditos: "Tiene otras deudas",
  proposito_del_prestamo: "Propósito del préstamo",
  fuente_principal_de_ingreso: "Fuente de ingresos",
  tienes_vivienda_en_propiedad: "Vivienda en propiedad",
  en_cuantos_meses_deseas_devolverlo: "Plazo de devolución",
};

const SOLICITUD_FIELD_LABELS: Record<string, string> = {
  monthlyIncome: "Ingreso mensual",
  totalDebtAmount: "Deuda total (entre quienes tienen)",
  requestedAmount: "Importe solicitado",
  numberOfdependents: "Personas a cargo",
  age: "Edad",
  incomeSource: "Fuente de ingresos",
  hasOwnedHouse: "Situación de vivienda",
  badCreditHistory: "En ASNEF",
  hasOtherLoans: "Tiene otras deudas",
  loanPurpose: "Propósito del préstamo",
  hasOwnVehicle: "Tiene vehículo propio",
  hasBankAccount: "Tiene cuenta bancaria",
  maritalStatus: "Estado civil",
  educationLevel: "Nivel de estudios",
  gender: "Género",
  countryOfBirth: "País de nacimiento",
  state: "Comunidad autónoma",
};

const EUR_FIELDS = new Set(["ingreso_mensual", "importe_total_de_la_deuda", "creditos_cantidad_a_solicitar", "monthlyIncome", "totalDebtAmount", "requestedAmount"]);

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

type SourceKey = "all" | "quiz" | "solicitud" | "pingtree";
let currentSource: SourceKey = "all";

const LEADS_PAGE_SIZE = 10;
let currentLeadsPage = 0;

const WITME_PAGE_SIZE = 10;
let currentWitmePage = 0;

const WITME_CAR_PAGE_SIZE = 10;
let currentWitmeCarPage = 0;

const PINGTREE_PAGE_SIZE = 10;
let currentPingtreePage = 0;

type Tab = "dashboard" | "leads" | "scoring" | "fieldstats";
let currentTab: Tab = "dashboard";

// A qué función de scoring alimenta cada regla (calculate_score = quiz corto,
// calculate_score_solicitud = solicitud larga). Si cambia qué claves lee cada
// función en SQL, hay que actualizar esto a mano.
const RULE_USED_BY: Record<string, string> = {
  base: "Quiz corto + Solicitud",
  ingreso_mensual: "Quiz corto + Solicitud",
  otros_creditos: "Quiz corto + Solicitud",
  asnef: "Quiz corto + Solicitud",
  ratio_deuda_ingreso: "Quiz corto + Solicitud",
  edad: "Quiz corto + Solicitud",
  fuente_ingreso: "Quiz corto",
  antiguedad_laboral: "Quiz corto",
  vivienda_propiedad: "Quiz corto",
  solicitud_fuente_ingreso: "Solicitud",
  solicitud_antiguedad: "Solicitud",
  solicitud_vivienda: "Solicitud",
  solicitud_dependientes: "Solicitud",
  aprobacion_base: "Probabilidad de aprobación (quiz + solicitud)",
  aprobacion_ratio_importe: "Probabilidad de aprobación (quiz + solicitud)",
};

const SOURCE_LABELS: Record<SourceKey, string> = {
  all: "Todos",
  quiz: "Quiz corto",
  solicitud: "Solicitud completa",
  pingtree: "Pingtree",
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
// mantener otra lista a mano. Se insertan a mano dos pasos que no son
// preguntas de WITME_QUESTIONS: el gate (nombre/email/teléfono, entre las
// preguntas de puntuación y las de después del gate - WitmeGate.tsx) y el
// envío final del formulario completo (WitmeApp.tsx, tras el gate).
const scoreQuestions = WITME_QUESTIONS.filter((q) => SCORE_PHASE_KEYS.includes(q.phase));
const extraQuestions = WITME_QUESTIONS.filter((q) => !SCORE_PHASE_KEYS.includes(q.phase));
const toStepDef = (q: (typeof WITME_QUESTIONS)[number]): StepDef => ({ key: q.key, label: q.label, conditional: !!q.condition });
const STEP_DEFS_SOLICITUD: StepDef[] = [
  ...scoreQuestions.map(toStepDef),
  { key: "gate_contact", label: "Deja sus datos de contacto (nombre, email, teléfono)" },
  ...extraQuestions.map(toStepDef),
  { key: "application_completed", label: "✅ Termina la solicitud completa" },
];

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
  approval_probability: number | null;
  witme_submitted: boolean;
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
  return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
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
  witme_redirect_url: string | null;
  name: string | null;
  last_name: string | null;
  email: string | null;
  requested_amount: number | null;
  score: number | null;
  approval_probability: number | null;
  offer_clicks: string[] | null;
  total_count: number;
  witme_response_ms: number | null;
}

async function fetchWitmeApplications(password: string, page: number): Promise<WitmeApplication[]> {
  const { data, error } = await supabase.rpc("admin_get_witme_applications", {
    p_password: password,
    p_limit: WITME_PAGE_SIZE,
    p_offset: page * WITME_PAGE_SIZE,
  });
  if (error) throw error;
  return (data ?? []) as WitmeApplication[];
}

// Producto nuevo en pruebas (prestamistas con aval de coche, endpoint
// servy-form-wait), corriendo en paralelo al de siempre - de momento solo
// para comparar resultados, sin mostrar ofertas de aquí al usuario.
interface WitmeCarApplication {
  id: string;
  created_at: string;
  external_id: string | null;
  product: string | null;
  witme_id: number | null;
  witme_status: string | null;
  witme_message: unknown;
  witme_redirect_url: string | null;
  response_ms: number | null;
  name: string | null;
  last_name: string | null;
  email: string | null;
  requested_amount: number | null;
  total_count: number;
}

async function fetchWitmeCarApplications(password: string, page: number): Promise<WitmeCarApplication[]> {
  const { data, error } = await supabase.rpc("admin_get_witme_car_applications", {
    p_password: password,
    p_limit: WITME_CAR_PAGE_SIZE,
    p_offset: page * WITME_CAR_PAGE_SIZE,
  });
  if (error) throw error;
  return (data ?? []) as WitmeCarApplication[];
}

// Versión independiente "completo - pingtree": mismo endpoint servy-form-wait
// pero como flujo principal (no en background) con otro trío de servy_id
// (Creditio Pingtree / reunificación / aval coche), redirigiendo al usuario
// a la URL que devuelva Witme en vez de mostrar resultados propios.
interface PingtreeApplication {
  id: string;
  created_at: string;
  external_id: string | null;
  response_status: number | null;
  witme_id: number | null;
  witme_status: string | null;
  witme_message: unknown;
  witme_redirect_url: string | null;
  response_ms: number | null;
  name: string | null;
  last_name: string | null;
  email: string | null;
  requested_amount: number | null;
  total_count: number;
}

async function fetchPingtreeApplications(password: string, page: number): Promise<PingtreeApplication[]> {
  const { data, error } = await supabase.rpc("admin_get_pingtree_applications", {
    p_password: password,
    p_limit: PINGTREE_PAGE_SIZE,
    p_offset: page * PINGTREE_PAGE_SIZE,
  });
  if (error) throw error;
  return (data ?? []) as PingtreeApplication[];
}

interface PingtreeResponseStats {
  avg_ms: number | null;
  median_ms: number | null;
  p95_ms: number | null;
  max_ms: number | null;
  count_with_time: number;
  count_accepted: number;
  count_total: number;
  pct_accepted: number | null;
}

async function fetchPingtreeResponseStats(password: string): Promise<PingtreeResponseStats> {
  const { data, error } = await supabase.rpc("admin_get_pingtree_response_stats", { p_password: password }).single<PingtreeResponseStats>();
  if (error || !data) throw error ?? new Error("No data");
  return data;
}

interface WitmeResponseStats {
  count_with_timing: number;
  avg_ms: number | null;
  median_ms: number | null;
  min_ms: number | null;
  max_ms: number | null;
  p95_ms: number | null;
  count_timeout: number;
  count_error: number;
  total_applications: number;
  count_accepted: number;
  count_processed_no_offer: number;
  count_failed: number;
  pct_accepted: number | null;
  pct_failed: number | null;
}

async function fetchWitmeResponseStats(password: string): Promise<WitmeResponseStats> {
  const { data, error } = await supabase.rpc("admin_get_witme_response_stats", { p_password: password }).single<WitmeResponseStats>();
  if (error || !data) throw error ?? new Error("No data");
  return data;
}

function fmtMs(ms: number | null): string {
  if (ms == null) return "—";
  return `${(ms / 1000).toFixed(1)} s`;
}

function fmtPct(pct: number | null): string {
  return pct == null ? "—" : `${pct}%`;
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

interface ScoringRule {
  key: string;
  label: string;
  config: Record<string, unknown>;
  weight: number;
  active: boolean;
  updated_at: string;
  default_config: Record<string, unknown>;
  default_weight: number;
  default_active: boolean;
}

let scoringRulesCache: ScoringRule[] = [];

async function fetchScoringRules(password: string): Promise<ScoringRule[]> {
  const { data, error } = await supabase.rpc("admin_get_scoring_rules", { p_password: password });
  if (error) throw error;
  return (data ?? []) as ScoringRule[];
}

async function updateScoringRule(
  password: string,
  key: string,
  config: Record<string, unknown>,
  weight: number,
  active: boolean,
): Promise<void> {
  const { error } = await supabase.rpc("admin_update_scoring_rule", {
    p_password: password,
    p_key: key,
    p_config: config,
    p_weight: weight,
    p_active: active,
  });
  if (error) throw error;
}

async function resetScoringRule(password: string, key: string): Promise<void> {
  const { error } = await supabase.rpc("admin_reset_scoring_rule", { p_password: password, p_key: key });
  if (error) throw error;
}

async function resetAllScoringRules(password: string): Promise<void> {
  const { error } = await supabase.rpc("admin_reset_all_scoring_rules", { p_password: password });
  if (error) throw error;
}

interface FieldNumericStat {
  avg: number | null;
  median: number | null;
  min: number | null;
  max: number | null;
  count: number;
}

interface FieldCategoricalOption {
  value: string;
  count: number;
}

interface FieldStatsResult {
  count: number;
  numeric: Record<string, FieldNumericStat>;
  categorical: Record<string, FieldCategoricalOption[]>;
}

async function fetchFieldStats(password: string, period: Period, source: "quiz" | "solicitud" | "pingtree"): Promise<FieldStatsResult> {
  const { data, error } = await supabase.rpc("admin_get_field_stats", {
    p_password: password,
    p_since: period.since,
    p_until: period.until,
    p_source: source,
  });
  if (error) throw error;
  return data as FieldStatsResult;
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
      renderApp(password);
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

function approvalBadgeClass(p: number): string {
  if (p >= 60) return "band-excelente";
  if (p >= 35) return "band-bueno";
  if (p >= 15) return "band-regular";
  return "band-bajo";
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

function renderApp(password: string) {
  if (currentTab === "scoring") renderScoringRules(password);
  else if (currentTab === "fieldstats") renderFieldStats(password);
  else if (currentTab === "leads") renderLeadsTab(password);
  else renderDashboard(password);
}

function headerHtml(activeTab: Tab): string {
  return `
    <header class="admin-header">
      <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
      <div class="admin-header-actions">
        <div class="admin-tabs">
          <button class="admin-tab-btn ${activeTab === "dashboard" ? "active" : ""}" data-tab="dashboard">Dashboard</button>
          <button class="admin-tab-btn ${activeTab === "leads" ? "active" : ""}" data-tab="leads">Leads</button>
          <button class="admin-tab-btn ${activeTab === "scoring" ? "active" : ""}" data-tab="scoring">Algoritmo de scoring</button>
          <button class="admin-tab-btn ${activeTab === "fieldstats" ? "active" : ""}" data-tab="fieldstats">Estadísticas</button>
        </div>
        <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
        <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
      </div>
    </header>
  `;
}

function wireHeader(password: string) {
  document.querySelectorAll<HTMLButtonElement>(".admin-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab as Tab;
      renderApp(password);
    });
  });
  document.getElementById("refresh-btn")!.addEventListener("click", () => renderApp(password));
  document.getElementById("logout-btn")!.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    renderLogin();
  });
}

function filterBarsHtml(period: Period): string {
  return `
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
  `;
}

function wireFilterBars(password: string) {
  document.querySelectorAll<HTMLButtonElement>(".admin-period-btn[data-source]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentSource = btn.dataset.source as SourceKey;
      currentLeadsPage = 0;
      renderApp(password);
    });
  });

  document.querySelectorAll<HTMLButtonElement>(".admin-period-btn[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPreset = btn.dataset.preset as PresetKey;
      currentLeadsPage = 0;
      renderApp(password);
    });
  });
  document.getElementById("period-apply-btn")?.addEventListener("click", () => {
    customFrom = (document.getElementById("period-from") as HTMLInputElement).value || customFrom;
    customTo = (document.getElementById("period-to") as HTMLInputElement).value || customTo;
    currentPreset = "custom";
    currentLeadsPage = 0;
    renderApp(password);
  });
}

async function renderDashboard(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  const period = periodFor(currentPreset);

  try {
    const [stats, funnelOverview, funnelSteps, offerClicks] = await Promise.all([
      fetchStats(password, period, currentSource),
      fetchFunnelOverview(password, period, currentSource),
      fetchFunnelSteps(password, period, currentSource),
      fetchOfferClicks(password, period, currentSource),
    ]);
    const totalBands = stats.band_excelente + stats.band_bueno + stats.band_regular + stats.band_bajo;
    // Pingtree reutiliza exactamente las mismas preguntas que la solicitud
    // completa (mismo WITME_QUESTIONS), solo cambia qué API recibe el envío
    // final - así que comparte el mismo listado de pasos del embudo.
    const stepDefs = currentSource === "solicitud" || currentSource === "pingtree" ? STEP_DEFS_SOLICITUD : STEP_DEFS;

    root.innerHTML = `
      <div class="admin-shell">
        ${headerHtml("dashboard")}

        ${filterBarsHtml(period)}

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
              ? `<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto, Solicitud completa o Pingtree) para ver la caída pregunta a pregunta — mezclarlos no tiene sentido, son formularios distintos.</p>`
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
                    <td>${escapeHtml(offerLabel(o.offer_id))}</td>
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

    wireHeader(password);
    wireFilterBars(password);
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

async function renderLeadsTab(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  const period = periodFor(currentPreset);

  try {
    const [leads, witmeApps, witmeResponseStats, witmeCarApps, pingtreeApps, pingtreeResponseStats] = await Promise.all([
      fetchLeads(password, period, currentSource, currentLeadsPage),
      fetchWitmeApplications(password, currentWitmePage),
      fetchWitmeResponseStats(password),
      fetchWitmeCarApplications(password, currentWitmeCarPage),
      fetchPingtreeApplications(password, currentPingtreePage),
      fetchPingtreeResponseStats(password),
    ]);
    const totalLeadsCount = leads[0]?.total_count ?? 0;
    const totalLeadsPages = Math.max(1, Math.ceil(totalLeadsCount / LEADS_PAGE_SIZE));
    const totalWitmeCount = witmeApps[0]?.total_count ?? 0;
    const totalWitmePages = Math.max(1, Math.ceil(totalWitmeCount / WITME_PAGE_SIZE));
    const totalWitmeCarCount = witmeCarApps[0]?.total_count ?? 0;
    const totalWitmeCarPages = Math.max(1, Math.ceil(totalWitmeCarCount / WITME_CAR_PAGE_SIZE));
    const totalPingtreeCount = pingtreeApps[0]?.total_count ?? 0;
    const totalPingtreePages = Math.max(1, Math.ceil(totalPingtreeCount / PINGTREE_PAGE_SIZE));

    root.innerHTML = `
      <div class="admin-shell">
        ${headerHtml("leads")}

        ${filterBarsHtml(period)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${totalLeadsCount})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Aprobación</th><th>Estado</th><th>Fuente</th>
                  <th>Enviado a Witme</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${leads
                  .map(
                    (l) => `
                  <tr>
                    <td>${dateFmt.format(new Date(l.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(l.first_name)} ${escapeHtml(l.last_name ?? "")}">${escapeHtml(l.first_name)} ${escapeHtml(l.last_name ?? "")}</div></td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(l.email)}">${escapeHtml(l.email)}</div></td>
                    <td>${escapeHtml(l.phone ?? "")}</td>
                    <td>${escapeHtml(l.zip_code ?? "")}</td>
                    <td>${l.score ?? "—"}</td>
                    <td><span class="admin-badge band-${l.score_band ?? ""}">${l.score_band ?? "—"}</span></td>
                    <td>${
                      l.approval_probability != null
                        ? `<span class="admin-badge ${approvalBadgeClass(l.approval_probability)}">${l.approval_probability}%</span>`
                        : "—"
                    }</td>
                    <td>${escapeHtml(l.status)}</td>
                    <td>${escapeHtml(l.source === "pingtree" ? "Pingtree" : (SOURCE_LABELS[l.source as SourceKey] ?? l.source))}</td>
                    <td>${
                      l.source === "pingtree"
                        ? `<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`
                        : l.source !== "solicitud"
                          ? `<span title="El quiz corto no envía a Witme">n/a</span>`
                          : l.witme_submitted
                            ? `<span class="admin-badge band-excelente">✅ Sí</span>`
                            : `<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>`
                    }</td>
                    <td>${
                      l.offer_clicks && l.offer_clicks.length > 0
                        ? l.offer_clicks.map((id) => escapeHtml(offerLabel(id))).join(", ")
                        : "—"
                    }</td>
                  </tr>
                `,
                  )
                  .join("")}
                ${leads.length === 0 ? `<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${currentLeadsPage === 0 ? "disabled" : ""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${currentLeadsPage + 1} de ${totalLeadsPages}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${currentLeadsPage + 1 >= totalLeadsPages ? "disabled" : ""}>Siguiente →</button>
          </div>
        </section>

        ${(currentSource === "all" || currentSource === "solicitud") ? `
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${totalWitmeCount})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("Tiempo medio de respuesta", fmtMs(witmeResponseStats.avg_ms))}
            ${statCard("Mediana", fmtMs(witmeResponseStats.median_ms))}
            ${statCard("P95", fmtMs(witmeResponseStats.p95_ms))}
            ${statCard("Máximo", fmtMs(witmeResponseStats.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("% Aceptados (con oferta)", fmtPct(witmeResponseStats.pct_accepted))}
            ${statCard("% Rechazados por Witme", fmtPct(witmeResponseStats.pct_failed))}
            ${statCard("Con oferta", String(witmeResponseStats.count_accepted))}
            ${statCard("Total solicitudes", String(witmeResponseStats.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${witmeResponseStats.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${witmeResponseStats.count_error} terminaron
            en error de conexión con Witme${witmeResponseStats.count_timeout > 0 ? ` y ${witmeResponseStats.count_timeout} en timeout (de cuando sí cortábamos a los 20s)` : ""}.
            No cortamos la llamada con un timeout propio todavía: primero medimos para
            decidir con datos si merece la pena y en cuánto.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th><th>Tiempo</th>
                  <th>Score</th><th>Aprobación</th><th>Click oferta</th>
                </tr>
              </thead>
              <tbody>
                ${witmeApps
                  .map((w) => {
                    const tooltipParts: string[] = [];
                    if (w.witme_message != null) tooltipParts.push(`Mensaje: ${JSON.stringify(w.witme_message)}`);
                    if (w.witme_redirect_url) tooltipParts.push(`Redirect URL: ${w.witme_redirect_url}`);
                    const statusTooltip = tooltipParts.join("\n");
                    return `
                  <tr>
                    <td>${dateFmt.format(new Date(w.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(w.name ?? "")} ${escapeHtml(w.last_name ?? "")}">${escapeHtml(w.name ?? "")} ${escapeHtml(w.last_name ?? "")}</div></td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(w.email ?? "")}">${escapeHtml(w.email ?? "")}</div></td>
                    <td>${w.requested_amount != null ? `${w.requested_amount} €` : "—"}</td>
                    <td>${w.witme_id ?? "—"}</td>
                    <td><span class="admin-badge ${w.witme_status === "processed" ? "band-excelente" : "band-bajo"}" ${statusTooltip ? `title="${escapeHtml(statusTooltip)}"` : ""}>${escapeHtml(w.witme_status ?? "—")}</span></td>
                    <td>${fmtMs(w.witme_response_ms)}</td>
                    <td>${w.score ?? "—"}</td>
                    <td>${
                      w.approval_probability != null
                        ? `<span class="admin-badge ${approvalBadgeClass(w.approval_probability)}">${w.approval_probability}%</span>`
                        : "—"
                    }</td>
                    <td>${
                      w.offer_clicks && w.offer_clicks.length > 0
                        ? `✅ ${w.offer_clicks.map((id) => escapeHtml(offerLabel(id))).join(", ")}`
                        : "—"
                    }</td>
                  </tr>
                `;
                  })
                  .join("")}
                ${witmeApps.length === 0 ? `<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${currentWitmePage === 0 ? "disabled" : ""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${currentWitmePage + 1} de ${totalWitmePages}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${currentWitmePage + 1 >= totalWitmePages ? "disabled" : ""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${totalWitmeCarCount})</p>
          <p class="admin-card-sub">
            Dos productos nuevos en pruebas (endpoint <code>servy-form-wait</code>), en
            paralelo al de siempre, para todas las solicitudes. Solo un ping en
            background para comparar resultados; no se muestra ninguna oferta de aquí
            al usuario todavía.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Producto</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th><th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                ${witmeCarApps
                  .map((w) => {
                    const tooltipParts: string[] = [];
                    if (w.witme_message != null) tooltipParts.push(`Mensaje: ${JSON.stringify(w.witme_message)}`);
                    if (w.witme_redirect_url) tooltipParts.push(`Redirect URL: ${w.witme_redirect_url}`);
                    const statusTooltip = tooltipParts.join("\n");
                    // Desde que se unificó en una sola petición (servy_id +
                    // servy_id_2 juntos), el producto es siempre el combinado;
                    // los valores sueltos son de filas antiguas previas al cambio.
                    const productLabel =
                      w.product === "car_collateral+debt_consolidation"
                        ? "Aval coche + Reunificación deudas"
                        : w.product === "car_collateral"
                          ? "Aval coche"
                          : w.product === "debt_consolidation"
                            ? "Reunificación deudas"
                            : "—";
                    return `
                  <tr>
                    <td>${dateFmt.format(new Date(w.created_at))}</td>
                    <td>${escapeHtml(productLabel)}</td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(w.name ?? "")} ${escapeHtml(w.last_name ?? "")}">${escapeHtml(w.name ?? "")} ${escapeHtml(w.last_name ?? "")}</div></td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(w.email ?? "")}">${escapeHtml(w.email ?? "")}</div></td>
                    <td>${w.requested_amount != null ? `${w.requested_amount} €` : "—"}</td>
                    <td>${w.witme_id ?? "—"}</td>
                    <td><span class="admin-badge ${w.witme_status === "processed" ? "band-excelente" : "band-bajo"}" ${statusTooltip ? `title="${escapeHtml(statusTooltip)}"` : ""}>${escapeHtml(w.witme_status ?? "—")}</span></td>
                    <td>${fmtMs(w.response_ms)}</td>
                  </tr>
                `;
                  })
                  .join("")}
                ${witmeCarApps.length === 0 ? `<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${currentWitmeCarPage === 0 ? "disabled" : ""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${currentWitmeCarPage + 1} de ${totalWitmeCarPages}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${currentWitmeCarPage + 1 >= totalWitmeCarPages ? "disabled" : ""}>Siguiente →</button>
          </div>
        </section>
        ` : ""}

        ${(currentSource === "all" || currentSource === "pingtree") ? `
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Pingtree (${totalPingtreeCount})</p>
          <p class="admin-card-sub">
            Versión independiente de la solicitud completa (<code>/pingtree.html</code>):
            usa solo el endpoint <code>servy-form-wait</code> con los servy_id 151
            (Creditio Pingtree), 154 (reunificación) y 171 (aval coche) juntos, y
            redirige directamente a la <code>redirectUrl</code> de Witme en vez de
            mostrar resultados propios.
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("Tiempo medio de respuesta", fmtMs(pingtreeResponseStats.avg_ms))}
            ${statCard("Mediana", fmtMs(pingtreeResponseStats.median_ms))}
            ${statCard("P95", fmtMs(pingtreeResponseStats.p95_ms))}
            ${statCard("Máximo", fmtMs(pingtreeResponseStats.max_ms))}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${statCard("% Aceptados (con redirectUrl)", fmtPct(pingtreeResponseStats.pct_accepted))}
            ${statCard("Con oferta", String(pingtreeResponseStats.count_accepted))}
            ${statCard("Total solicitudes", String(pingtreeResponseStats.count_total))}
          </section>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Tiempo</th>
                  <th>Enviado</th><th>Aceptado</th><th>Redirigido</th>
                </tr>
              </thead>
              <tbody>
                ${pingtreeApps
                  .map((p) => {
                    const tooltipParts: string[] = [];
                    if (p.witme_message != null) tooltipParts.push(`Mensaje: ${JSON.stringify(p.witme_message)}`);
                    if (p.witme_redirect_url) tooltipParts.push(`Redirect URL: ${p.witme_redirect_url}`);
                    const statusTooltip = tooltipParts.join("\n");
                    const enviado = p.response_status != null;
                    const aceptado = p.witme_status === "processed";
                    const redirigido = p.witme_redirect_url != null;
                    return `
                  <tr>
                    <td>${dateFmt.format(new Date(p.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(p.name ?? "")} ${escapeHtml(p.last_name ?? "")}">${escapeHtml(p.name ?? "")} ${escapeHtml(p.last_name ?? "")}</div></td>
                    <td><div class="admin-table-name-cell" title="${escapeHtml(p.email ?? "")}">${escapeHtml(p.email ?? "")}</div></td>
                    <td>${fmtMs(p.response_ms)}</td>
                    <td>${enviado ? `<span class="admin-badge band-excelente">✅ Sí</span>` : `<span class="admin-badge band-bajo">❌ No</span>`}</td>
                    <td><span class="admin-badge ${aceptado ? "band-excelente" : "band-bajo"}" ${statusTooltip ? `title="${escapeHtml(statusTooltip)}"` : ""}>${aceptado ? "✅ Sí" : "❌ No"}</span></td>
                    <td>${redirigido ? `<span class="admin-badge band-excelente" title="${escapeHtml(p.witme_redirect_url ?? "")}">✅ Sí</span>` : `<span class="admin-badge band-bajo">❌ No</span>`}</td>
                  </tr>
                `;
                  })
                  .join("")}
                ${pingtreeApps.length === 0 ? `<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="pingtree-prev-btn" ${currentPingtreePage === 0 ? "disabled" : ""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${currentPingtreePage + 1} de ${totalPingtreePages}</span>
            <button class="admin-btn-ghost" id="pingtree-next-btn" ${currentPingtreePage + 1 >= totalPingtreePages ? "disabled" : ""}>Siguiente →</button>
          </div>
        </section>
        ` : ""}
      </div>
    `;

    wireHeader(password);
    wireFilterBars(password);

    document.getElementById("leads-prev-btn")!.addEventListener("click", () => {
      if (currentLeadsPage > 0) {
        currentLeadsPage--;
        renderLeadsTab(password);
      }
    });
    document.getElementById("leads-next-btn")!.addEventListener("click", () => {
      currentLeadsPage++;
      renderLeadsTab(password);
    });
    document.getElementById("witme-prev-btn")?.addEventListener("click", () => {
      if (currentWitmePage > 0) {
        currentWitmePage--;
        renderLeadsTab(password);
      }
    });
    document.getElementById("witme-next-btn")?.addEventListener("click", () => {
      currentWitmePage++;
      renderLeadsTab(password);
    });
    document.getElementById("witme-car-prev-btn")?.addEventListener("click", () => {
      if (currentWitmeCarPage > 0) {
        currentWitmeCarPage--;
        renderLeadsTab(password);
      }
    });
    document.getElementById("witme-car-next-btn")?.addEventListener("click", () => {
      currentWitmeCarPage++;
      renderLeadsTab(password);
    });
    document.getElementById("pingtree-prev-btn")?.addEventListener("click", () => {
      if (currentPingtreePage > 0) {
        currentPingtreePage--;
        renderLeadsTab(password);
      }
    });
    document.getElementById("pingtree-next-btn")?.addEventListener("click", () => {
      currentPingtreePage++;
      renderLeadsTab(password);
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("unauthorized")) {
      sessionStorage.removeItem(SESSION_KEY);
      renderLogin("Tu sesión ha caducado o la contraseña ya no es válida.");
    } else {
      root.innerHTML = `
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${escapeHtml(message)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `;
      document.getElementById("retry-btn")!.addEventListener("click", () => renderLeadsTab(password));
    }
  }
}

// Solo el último bucket de cada regla es un rango abierto ("X +"); el valor
// exacto de max (999, 999999...) es solo un límite práctico interno, no algo
// que se pueda inferir de la magnitud — por eso se decide por posición, no
// por umbral.
function humanizeBucketRange(min: number, max: number, isLast: boolean): string {
  return isLast ? `${min} +` : `${min} – ${max}`;
}

function sliderRowHtml(
  ruleKey: string,
  field: string,
  label: string,
  value: number,
  min: number,
  max: number,
  step: number,
): string {
  return `
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${escapeHtml(label)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${min}"
        max="${max}"
        step="${step}"
        value="${value}"
        data-rule-key="${ruleKey}"
        data-field="${field}"
      />
      <span class="scoring-slider-value">${value}</span>
    </div>
  `;
}

function ruleFieldsHtml(rule: ScoringRule): string {
  const cfg = rule.config;
  if (typeof cfg.value === "number" && Object.keys(cfg).length === 1) {
    return sliderRowHtml(rule.key, "value", "Puntos base", cfg.value, 300, 850, 5);
  }
  if (Array.isArray(cfg.buckets)) {
    const buckets = cfg.buckets as [number, number, number][];
    return buckets
      .map((b, i) =>
        sliderRowHtml(rule.key, `bucket:${i}`, humanizeBucketRange(b[0], b[1], i === buckets.length - 1), b[2], -200, 200, 5),
      )
      .join("");
  }
  return Object.entries(cfg)
    .map(([optKey, pts]) => sliderRowHtml(rule.key, `opt:${optKey}`, optKey, Number(pts), -200, 200, 5))
    .join("");
}

function ruleCardHtml(rule: ScoringRule): string {
  return `
    <div class="scoring-rule-card" data-rule-card="${rule.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${escapeHtml(rule.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${escapeHtml(RULE_USED_BY[rule.key] ?? "—")} · clave: <code>${escapeHtml(rule.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${rule.active ? "checked" : ""} />
          Regla activa
        </label>
      </div>
      ${sliderRowHtml(rule.key, "weight", "Peso (multiplica todos los puntos de esta regla)", Number(rule.weight), 0, 3, 0.1)}
      <div class="scoring-rule-fields">
        ${ruleFieldsHtml(rule)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${rule.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${rule.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `;
}

function wireScoringInputs(password: string) {
  document.querySelectorAll<HTMLInputElement>(".scoring-slider").forEach((input) => {
    input.addEventListener("input", () => {
      const out = input.closest(".scoring-slider-row")?.querySelector(".scoring-slider-value");
      if (out) out.textContent = input.value;
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-save-rule]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const key = btn.dataset.saveRule!;
      const rule = scoringRulesCache.find((r) => r.key === key);
      const card = document.querySelector<HTMLElement>(`[data-rule-card="${key}"]`);
      if (!rule || !card) return;
      const statusEl = card.querySelector<HTMLElement>(".scoring-rule-status")!;

      const fieldValues = new Map<string, string>();
      card.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
        fieldValues.set(input.dataset.field!, input.type === "checkbox" ? String(input.checked) : input.value);
      });

      const weight = Number(fieldValues.get("weight"));
      const active = fieldValues.get("active") === "true";

      const cfg = rule.config;
      let newConfig: Record<string, unknown>;
      if (typeof cfg.value === "number" && Object.keys(cfg).length === 1) {
        newConfig = { value: Number(fieldValues.get("value")) };
      } else if (Array.isArray(cfg.buckets)) {
        newConfig = {
          buckets: (cfg.buckets as [number, number, number][]).map((b, i) => [
            b[0],
            b[1],
            Number(fieldValues.get(`bucket:${i}`)),
          ]),
        };
      } else {
        newConfig = {};
        Object.keys(cfg).forEach((optKey) => {
          newConfig[optKey] = Number(fieldValues.get(`opt:${optKey}`));
        });
      }

      btn.disabled = true;
      statusEl.textContent = "Guardando…";
      statusEl.className = "scoring-rule-status";
      try {
        await updateScoringRule(password, key, newConfig, weight, active);
        rule.config = newConfig;
        rule.weight = weight;
        rule.active = active;
        statusEl.textContent = "✓ Guardado";
        statusEl.className = "scoring-rule-status ok";
        setTimeout(() => {
          statusEl.textContent = "";
        }, 2500);
      } catch {
        statusEl.textContent = "Error al guardar";
        statusEl.className = "scoring-rule-status error";
      } finally {
        btn.disabled = false;
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-reset-rule]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const key = btn.dataset.resetRule!;
      const card = document.querySelector<HTMLElement>(`[data-rule-card="${key}"]`);
      if (!card) return;
      if (!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato.")) return;

      const statusEl = card.querySelector<HTMLElement>(".scoring-rule-status")!;
      btn.disabled = true;
      statusEl.textContent = "Restaurando…";
      statusEl.className = "scoring-rule-status";
      try {
        await resetScoringRule(password, key);
        await renderScoringRules(password);
      } catch {
        statusEl.textContent = "Error al restaurar";
        statusEl.className = "scoring-rule-status error";
        btn.disabled = false;
      }
    });
  });

  document.getElementById("reset-all-rules-btn")?.addEventListener("click", async () => {
    if (
      !confirm(
        "¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales.",
      )
    ) {
      return;
    }
    try {
      await resetAllScoringRules(password);
      await renderScoringRules(password);
    } catch {
      alert("No se ha podido restaurar. Inténtalo de nuevo.");
    }
  });
}

async function renderScoringRules(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  try {
    const rules = await fetchScoringRules(password);
    scoringRulesCache = rules;

    root.innerHTML = `
      <div class="admin-shell">
        ${headerHtml("scoring")}

        <section class="admin-card">
          <div class="scoring-intro-row">
            <div>
              <p class="admin-card-title">Algoritmo de scoring</p>
              <p class="admin-card-sub">
                La puntuación va de 300 a 850 — el mismo rango que usan los bureaus de
                crédito reales (FICO), no un porcentaje 0–100, para que se perciba como un
                credit score de verdad y no como la nota de un test. Se parte de la
                puntuación base y se suman o restan los puntos de cada regla activa,
                multiplicados por su peso. <strong>Los cambios se aplican de inmediato a las
                puntuaciones que verán los usuarios reales</strong> — no hay entorno de pruebas
                separado.
              </p>
            </div>
            <button class="admin-btn-ghost" id="reset-all-rules-btn">Restaurar todo por defecto</button>
          </div>
        </section>

        <div class="scoring-rules-grid">
          ${rules.map(ruleCardHtml).join("")}
        </div>
      </div>
    `;

    wireHeader(password);
    wireScoringInputs(password);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("unauthorized")) {
      sessionStorage.removeItem(SESSION_KEY);
      renderLogin("Tu sesión ha caducado o la contraseña ya no es válida.");
    } else {
      root.innerHTML = `
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${escapeHtml(message)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `;
      document.getElementById("retry-btn")!.addEventListener("click", () => renderScoringRules(password));
    }
  }
}

const numFmt = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

function fmtStatValue(value: number | null, isEur: boolean): string {
  if (value == null) return "—";
  return isEur ? `${numFmt.format(value)} €` : numFmt.format(value);
}

function numericStatCardHtml(label: string, key: string, stat: FieldNumericStat): string {
  const isEur = EUR_FIELDS.has(key);
  return `
    <div class="fieldstat-card">
      <p class="fieldstat-label">${escapeHtml(label)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${fmtStatValue(stat.median, isEur)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${fmtStatValue(stat.avg, isEur)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${fmtStatValue(stat.min, isEur)} – ${fmtStatValue(stat.max, isEur)}</strong></div>
      <p class="fieldstat-count">${stat.count} respuestas</p>
    </div>
  `;
}

function categoricalCardHtml(
  label: string,
  options: FieldCategoricalOption[],
  source: "quiz" | "solicitud" | "pingtree",
  fieldKey: string,
): string {
  const total = options.reduce((sum, o) => sum + o.count, 0);
  return `
    <div class="fieldstat-card">
      <p class="fieldstat-label">${escapeHtml(label)}</p>
      ${options
        .map((o) => {
          const pct = total > 0 ? Math.round((o.count / total) * 100) : 0;
          return `
            <div class="admin-band-row">
              <span class="admin-band-label">${escapeHtml(fieldValueLabel(source, fieldKey, o.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${pct}%"></div></div>
              <span class="admin-band-count">${o.count} (${pct}%)</span>
            </div>
          `;
        })
        .join("")}
      ${options.length === 0 ? `<p class="fieldstat-count">Sin datos todavía.</p>` : ""}
    </div>
  `;
}

function fieldStatsSectionHtml(source: "quiz" | "solicitud" | "pingtree", stats: FieldStatsResult): string {
  const labels = source === "quiz" ? QUIZ_FIELD_LABELS : SOLICITUD_FIELD_LABELS;
  const title = source === "solicitud" ? "Solicitud completa" : source === "pingtree" ? "Pingtree" : "Quiz corto";

  return `
    <section class="admin-card">
      <p class="admin-card-title">${title} (${stats.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(stats.numeric)
          .map(([key, stat]) => numericStatCardHtml(labels[key] ?? key, key, stat))
          .join("")}
        ${Object.entries(stats.categorical)
          .map(([key, options]) => categoricalCardHtml(labels[key] ?? key, options, source, key))
          .join("")}
      </div>
    </section>
  `;
}

async function renderFieldStats(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  const period = periodFor(currentPreset);
  const sourcesToShow: ("quiz" | "solicitud" | "pingtree")[] =
    currentSource === "solicitud" || currentSource === "quiz" || currentSource === "pingtree"
      ? [currentSource]
      : ["quiz", "solicitud", "pingtree"];

  try {
    const results = await Promise.all(sourcesToShow.map((s) => fetchFieldStats(password, period, s)));

    root.innerHTML = `
      <div class="admin-shell">
        ${headerHtml("fieldstats")}

        ${filterBarsHtml(period)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${sourcesToShow.map((s, i) => fieldStatsSectionHtml(s, results[i])).join("")}
      </div>
    `;

    wireHeader(password);
    wireFilterBars(password);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("unauthorized")) {
      sessionStorage.removeItem(SESSION_KEY);
      renderLogin("Tu sesión ha caducado o la contraseña ya no es válida.");
    } else {
      root.innerHTML = `
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${escapeHtml(message)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `;
      document.getElementById("retry-btn")!.addEventListener("click", () => renderFieldStats(password));
    }
  }
}

const savedPassword = sessionStorage.getItem(SESSION_KEY);
if (savedPassword) {
  renderApp(savedPassword);
} else {
  renderLogin();
}
