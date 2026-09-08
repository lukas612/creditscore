import{c as L}from"./index-DBuN83Yj.js";const C="https://pgyaigdsedkdqvhtexrz.supabase.co",I="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=L(C,I),u="cs_admin_pw",h=document.getElementById("admin-root"),w=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],T=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(t){const a=document.createElement("div");return a.textContent=t,a.innerHTML}async function k(t){const{data:a,error:e}=await b.rpc("admin_get_stats",{p_password:t}).single();if(e||!a)throw e??new Error("No data");return a}async function q(t){const{data:a,error:e}=await b.rpc("admin_get_funnel_overview",{p_password:t}).single();if(e||!a)throw e??new Error("No data");return a}async function z(t){const{data:a,error:e}=await b.rpc("admin_get_funnel_steps",{p_password:t});if(e)throw e;return a??[]}async function B(t){const{data:a,error:e}=await b.rpc("admin_list_leads",{p_password:t,p_limit:200,p_offset:0});if(e)throw e;return a??[]}function m(t){h.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${t?`<p class="admin-error">${o(t)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async a=>{a.preventDefault();const e=document.getElementById("pw-input").value;try{await k(e),sessionStorage.setItem(u,e),g(e)}catch{m("Contraseña incorrecta.")}})}function i(t,a){return`<div class="admin-stat"><span class="admin-stat-value">${a}</span><span class="admin-stat-label">${t}</span></div>`}function p(t,a,e,s){const r=e>0?Math.round(a/e*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${t}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${s}" style="width:${r}%"></div></div>
      <span class="admin-band-count">${a}</span>
    </div>
  `}function P(t,a){var n;const e=new Map(a.map(d=>[d.question_key,Number(d.reached)])),s=t.total_visits;let r="",l=(n=w[0])==null?void 0:n.key;return w.forEach((d,v)=>{const _=e.get(d.key)??0,f=s>0?Math.round(_/s*100):0;let $="";if(v>0&&!d.conditional){const y=e.get(l)??0;if(y>0){const c=Math.round((1-_/y)*100),E=c>=25?"high":c>=10?"mid":"low";$=c>0?`<span class="funnel-drop funnel-drop-${E}">-${c}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}r+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${v+1}. ${o(d.label)}${d.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${_} · ${f}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${f}%"></div></div>
        ${$}
      </div>
    `,d.conditional||(l=d.key)}),r}async function g(t){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const[a,e,s,r]=await Promise.all([k(t),B(t),q(t),z(t)]),l=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo;h.innerHTML=`
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-stats-grid">
          ${i("Leads totales",String(a.total_leads))}
          ${i("Leads hoy",String(a.leads_today))}
          ${i("Leads (7 días)",String(a.leads_7d))}
          ${i("Sesiones de quiz",String(a.total_sessions))}
          ${i("Tasa de conversión",`${a.conversion_rate}%`)}
          ${i("Score medio",a.avg_score!=null?String(a.avg_score):"—")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Embudo: visita → lead</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${i("Visitas",String(s.total_visits))}
            ${i("Completan el quiz",`${s.visit_to_quiz_rate}%`)}
            ${i("Dejan sus datos (lead)",`${s.visit_to_lead_rate}%`)}
            ${i("Quiz → lead",`${s.quiz_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente en el quiz</p>
          <p class="admin-card-sub">
            % de visitas que llegan a cada pregunta. Las preguntas condicionales no
            muestran caída propia (no todo el mundo las ve); el siguiente paso obligatorio
            calcula su caída respecto al último paso que ven todos.
          </p>
          ${P(s,r)}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${p("Excelente",a.band_excelente,l,"band-excelente")}
          ${p("Bueno",a.band_bueno,l,"band-bueno")}
          ${p("Regular",a.band_regular,l,"band-regular")}
          ${p("Bajo",a.band_bajo,l,"band-bajo")}
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
                    <td>${T.format(new Date(n.created_at))}</td>
                    <td>${o(n.first_name)} ${o(n.last_name??"")}</td>
                    <td>${o(n.email)}</td>
                    <td>${o(n.phone??"")}</td>
                    <td>${o(n.zip_code??"")}</td>
                    <td>${n.score??"—"}</td>
                    <td><span class="admin-badge band-${n.score_band??""}">${n.score_band??"—"}</span></td>
                    <td>${o(n.status)}</td>
                  </tr>
                `).join("")}
                ${e.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>g(t)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(u),m()})}catch{sessionStorage.removeItem(u),m("Tu sesión ha caducado o la contraseña ya no es válida.")}}const S=sessionStorage.getItem(u);S?g(S):m();
