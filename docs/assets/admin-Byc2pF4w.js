import{c as L}from"./index-DBuN83Yj.js";const C="https://pgyaigdsedkdqvhtexrz.supabase.co",I="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",g=L(C,I),m="cs_admin_pw",p=document.getElementById("admin-root"),w=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],z=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}async function E(t){const{data:e,error:a}=await g.rpc("admin_get_stats",{p_password:t}).single();if(a||!e)throw a??new Error("No data");return e}async function q(t){const{data:e,error:a}=await g.rpc("admin_get_funnel_overview",{p_password:t}).single();if(a||!e)throw a??new Error("No data");return e}async function T(t){const{data:e,error:a}=await g.rpc("admin_get_funnel_steps",{p_password:t});if(a)throw a;return e??[]}async function B(t){const{data:e,error:a}=await g.rpc("admin_list_leads",{p_password:t,p_limit:200,p_offset:0});if(a)throw a;return e??[]}function b(t){p.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${t?`<p class="admin-error">${o(t)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("pw-input").value;try{await E(a),sessionStorage.setItem(m,a),_(a)}catch{b("Contraseña incorrecta.")}})}function i(t,e){return`<div class="admin-stat"><span class="admin-stat-value">${e}</span><span class="admin-stat-label">${t}</span></div>`}function u(t,e,a,n){const l=a>0?Math.round(e/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${t}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${l}%"></div></div>
      <span class="admin-band-count">${e}</span>
    </div>
  `}function H(t,e){var s;const a=new Map(e.map(d=>[d.question_key,Number(d.reached)])),n=t.engaged_visits;let l="",r=(s=w[0])==null?void 0:s.key;return w.forEach((d,v)=>{const h=a.get(d.key)??0,f=n>0?Math.round(h/n*100):0;let $="";if(v>0&&!d.conditional){const y=a.get(r)??0;if(y>0){const c=Math.round((1-h/y)*100),k=c>=25?"high":c>=10?"mid":"low";$=c>0?`<span class="funnel-drop funnel-drop-${k}">-${c}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}l+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${v+1}. ${o(d.label)}${d.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${h} · ${f}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${f}%"></div></div>
        ${$}
      </div>
    `,d.conditional||(r=d.key)}),l}async function _(t){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const[e,a,n,l]=await Promise.all([E(t),B(t),q(t),T(t)]),r=e.band_excelente+e.band_bueno+e.band_regular+e.band_bajo;p.innerHTML=`
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-stats-grid">
          ${i("Leads totales",String(e.total_leads))}
          ${i("Leads hoy",String(e.leads_today))}
          ${i("Leads (7 días)",String(e.leads_7d))}
          ${i("Sesiones de quiz",String(e.total_sessions))}
          ${i("Tasa de conversión",`${e.conversion_rate}%`)}
          ${i("Score medio",e.avg_score!=null?String(e.avg_score):"—")}
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
            ${i("Visitas",String(n.total_visits))}
            ${i("Rebote instantáneo",`${n.bounce_rate}%`)}
            ${i("Quiz → lead",`${n.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${i("Completan el quiz",`${n.visit_to_quiz_rate}%`)}
            ${i("Dejan sus datos (lead)",`${n.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${i("Completan el quiz",`${n.engaged_to_quiz_rate}%`)}
            ${i("Dejan sus datos (lead)",`${n.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente en el quiz</p>
          <p class="admin-card-sub">
            Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
            a interactuar de verdad (${n.engaged_visits} sesiones). Las
            preguntas condicionales no muestran caída propia (no todo el mundo las ve);
            el siguiente paso obligatorio calcula su caída respecto al último paso que
            ven todos.
          </p>
          ${H(n,l)}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${u("Excelente",e.band_excelente,r,"band-excelente")}
          ${u("Bueno",e.band_bueno,r,"band-bueno")}
          ${u("Regular",e.band_regular,r,"band-regular")}
          ${u("Bajo",e.band_bajo,r,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${a.length})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(s=>`
                  <tr>
                    <td>${z.format(new Date(s.created_at))}</td>
                    <td>${o(s.first_name)} ${o(s.last_name??"")}</td>
                    <td>${o(s.email)}</td>
                    <td>${o(s.phone??"")}</td>
                    <td>${o(s.zip_code??"")}</td>
                    <td>${s.score??"—"}</td>
                    <td><span class="admin-badge band-${s.score_band??""}">${s.score_band??"—"}</span></td>
                    <td>${o(s.status)}</td>
                  </tr>
                `).join("")}
                ${a.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>_(t)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(m),b()})}catch(e){const a=e instanceof Error?e.message:String(e);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(m),b("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>_(t)))}}const S=sessionStorage.getItem(m);S?_(S):b();
