import { createClient } from "@supabase/supabase-js";
import "./admin.css";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anonKey) throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
const supabase = createClient(url, anonKey);

const SESSION_KEY = "cs_admin_pw";
const root = document.getElementById("admin-root")!;

interface Stats {
  total_leads: number;
  leads_today: number;
  leads_7d: number;
  total_sessions: number;
  conversion_rate: number;
  avg_score: number | null;
  band_excelente: number;
  band_bueno: number;
  band_regular: number;
  band_bajo: number;
}

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

async function fetchStats(password: string): Promise<Stats> {
  const { data, error } = await supabase
    .rpc("admin_get_stats", { p_password: password })
    .single<Stats>();
  if (error || !data) throw error ?? new Error("No data");
  return data;
}

async function fetchLeads(password: string): Promise<Lead[]> {
  const { data, error } = await supabase.rpc("admin_list_leads", {
    p_password: password,
    p_limit: 200,
    p_offset: 0,
  });
  if (error) throw error;
  return (data ?? []) as Lead[];
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
      await fetchStats(password);
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

async function renderDashboard(password: string) {
  root.innerHTML = `<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>`;

  try {
    const [stats, leads] = await Promise.all([fetchStats(password), fetchLeads(password)]);
    const totalBands = stats.band_excelente + stats.band_bueno + stats.band_regular + stats.band_bajo;

    root.innerHTML = `
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-stats-grid">
          ${statCard("Leads totales", String(stats.total_leads))}
          ${statCard("Leads hoy", String(stats.leads_today))}
          ${statCard("Leads (7 días)", String(stats.leads_7d))}
          ${statCard("Sesiones de quiz", String(stats.total_sessions))}
          ${statCard("Tasa de conversión", `${stats.conversion_rate}%`)}
          ${statCard("Score medio", stats.avg_score != null ? String(stats.avg_score) : "—")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${bandRow("Excelente", stats.band_excelente, totalBands, "band-excelente")}
          ${bandRow("Bueno", stats.band_bueno, totalBands, "band-bueno")}
          ${bandRow("Regular", stats.band_regular, totalBands, "band-regular")}
          ${bandRow("Bajo", stats.band_bajo, totalBands, "band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${leads.length})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th>
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
                  </tr>
                `,
                  )
                  .join("")}
                ${leads.length === 0 ? `<tr><td colspan="8" class="admin-empty">Todavía no hay leads.</td></tr>` : ""}
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
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    renderLogin("Tu sesión ha caducado o la contraseña ya no es válida.");
  }
}

const savedPassword = sessionStorage.getItem(SESSION_KEY);
if (savedPassword) {
  renderDashboard(savedPassword);
} else {
  renderLogin();
}
