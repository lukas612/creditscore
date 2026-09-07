import{c as h}from"./index-DBuN83Yj.js";const g="https://pgyaigdsedkdqvhtexrz.supabase.co",v="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",u=h(g,v),r="cs_admin_pw",l=document.getElementById("admin-root"),_=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function s(a){const t=document.createElement("div");return t.textContent=a,t.innerHTML}async function p(a){const{data:t,error:e}=await u.rpc("admin_get_stats",{p_password:a}).single();if(e||!t)throw e??new Error("No data");return t}async function $(a){const{data:t,error:e}=await u.rpc("admin_list_leads",{p_password:a,p_limit:200,p_offset:0});if(e)throw e;return t??[]}function c(a){l.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">CreditScore &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${a?`<p class="admin-error">${s(a)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("pw-input").value;try{await p(e),sessionStorage.setItem(r,e),m(e)}catch{c("Contraseña incorrecta.")}})}function i(a,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${a}</span></div>`}function o(a,t,e,d){const n=e>0?Math.round(t/e*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${a}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${d}" style="width:${n}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}async function m(a){l.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const[t,e]=await Promise.all([p(a),$(a)]),d=t.band_excelente+t.band_bueno+t.band_regular+t.band_bajo;l.innerHTML=`
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Credit<b>Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-stats-grid">
          ${i("Leads totales",String(t.total_leads))}
          ${i("Leads hoy",String(t.leads_today))}
          ${i("Leads (7 días)",String(t.leads_7d))}
          ${i("Sesiones de quiz",String(t.total_sessions))}
          ${i("Tasa de conversión",`${t.conversion_rate}%`)}
          ${i("Score medio",t.avg_score!=null?String(t.avg_score):"—")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${o("Excelente",t.band_excelente,d,"band-excelente")}
          ${o("Bueno",t.band_bueno,d,"band-bueno")}
          ${o("Regular",t.band_regular,d,"band-regular")}
          ${o("Bajo",t.band_bajo,d,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${e.length})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(n=>`
                  <tr>
                    <td>${_.format(new Date(n.created_at))}</td>
                    <td>${s(n.first_name)} ${s(n.last_name??"")}</td>
                    <td>${s(n.email)}</td>
                    <td>${s(n.phone??"")}</td>
                    <td>${s(n.zip_code??"")}</td>
                    <td>${n.score??"—"}</td>
                    <td><span class="admin-badge band-${n.score_band??""}">${n.score_band??"—"}</span></td>
                    <td>${s(n.status)}</td>
                  </tr>
                `).join("")}
                ${e.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>m(a)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(r),c()})}catch{sessionStorage.removeItem(r),c("Tu sesión ha caducado o la contraseña ya no es válida.")}}const b=sessionStorage.getItem(r);b?m(b):c();
