import{c as q}from"./index-DBuN83Yj.js";const z="https://pgyaigdsedkdqvhtexrz.supabase.co",F="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",f=q(z,F),v="cs_admin_pw",b=document.getElementById("admin-root");function D(a){return a.toISOString().slice(0,10)}const L=new Date;let r="all",g=D(L),_=D(L);function C(a){const t=new Date;if(a==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(a==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(a==="custom"){const e=new Date(`${g}T00:00:00`),n=new Date(`${_}T23:59:59.999`);return e.getTime()>n.getTime()?{since:n.toISOString(),until:e.toISOString()}:{since:e.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const I=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function H(a,t){return a==="all"?"Todo el histórico":`${I.format(new Date(t.since))} – ${I.format(new Date(t.until))}`}const k=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],M=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function d(a){const t=document.createElement("div");return t.textContent=a,t.innerHTML}async function O(a,t){const{data:e,error:n}=await f.rpc("admin_get_stats",{p_password:a,p_since:t.since,p_until:t.until}).single();if(n||!e)throw n??new Error("No data");return e}async function P(a,t){const{data:e,error:n}=await f.rpc("admin_get_funnel_overview",{p_password:a,p_since:t.since,p_until:t.until}).single();if(n||!e)throw n??new Error("No data");return e}async function j(a,t){const{data:e,error:n}=await f.rpc("admin_get_funnel_steps",{p_password:a,p_since:t.since,p_until:t.until});if(n)throw n;return e??[]}async function x(a,t){const{data:e,error:n}=await f.rpc("admin_list_leads",{p_password:a,p_limit:200,p_offset:0,p_since:t.since,p_until:t.until});if(n)throw n;return e??[]}function h(a){b.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${a?`<p class="admin-error">${d(a)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("pw-input").value;try{await O(e,C("all")),sessionStorage.setItem(v,e),c(e)}catch{h("Contraseña incorrecta.")}})}function o(a,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${a}</span></div>`}function m(a,t,e,n){const i=e>0?Math.round(t/e*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${a}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${i}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function A(a,t){var l;const e=new Map(t.map(s=>[s.question_key,Number(s.reached)])),n=a.engaged_visits;let i="",u=(l=k[0])==null?void 0:l.key;return k.forEach((s,$)=>{const y=e.get(s.key)??0,S=n>0?Math.round(y/n*100):0;let w="";if($>0&&!s.conditional){const E=e.get(u)??0;if(E>0){const p=Math.round((1-y/E)*100),B=p>=25?"high":p>=10?"mid":"low";w=p>0?`<span class="funnel-drop funnel-drop-${B}">-${p}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}i+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${$+1}. ${d(s.label)}${s.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${y} · ${S}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${S}%"></div></div>
        ${w}
      </div>
    `,s.conditional||(u=s.key)}),i}async function c(a){b.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=C(r);try{const[e,n,i,u]=await Promise.all([O(a,t),x(a,t),P(a,t),j(a,t)]),l=e.band_excelente+e.band_bueno+e.band_regular+e.band_bajo;b.innerHTML=`
      <div class="admin-shell">
        <header class="admin-header">
          <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
          <div>
            <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
            <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
          </div>
        </header>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${r==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${r==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${r==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${r==="custom"?"active":""}">
            <input type="date" id="period-from" value="${g}" />
            <span>–</span>
            <input type="date" id="period-to" value="${_}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${d(H(r,t))}</p>
        </section>

        <section class="admin-stats-grid">
          ${o("Leads totales (histórico)",String(e.total_leads))}
          ${o("Leads en el periodo",String(e.period_leads))}
          ${o("Sesiones en el periodo",String(e.period_sessions))}
          ${o("Tasa de conversión",`${e.period_conversion_rate}%`)}
          ${o("Score medio (periodo)",e.avg_score!=null?String(e.avg_score):"—")}
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
            ${o("Visitas",String(i.total_visits))}
            ${o("Rebote instantáneo",`${i.bounce_rate}%`)}
            ${o("Quiz → lead",`${i.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${o("Completan el quiz",`${i.visit_to_quiz_rate}%`)}
            ${o("Dejan sus datos (lead)",`${i.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${o("Completan el quiz",`${i.engaged_to_quiz_rate}%`)}
            ${o("Dejan sus datos (lead)",`${i.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente en el quiz</p>
          <p class="admin-card-sub">
            Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
            a interactuar de verdad (${i.engaged_visits} sesiones). Las
            preguntas condicionales no muestran caída propia (no todo el mundo las ve);
            el siguiente paso obligatorio calcula su caída respecto al último paso que
            ven todos.
          </p>
          ${A(i,u)}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${m("Excelente",e.band_excelente,l,"band-excelente")}
          ${m("Bueno",e.band_bueno,l,"band-bueno")}
          ${m("Regular",e.band_regular,l,"band-regular")}
          ${m("Bajo",e.band_bajo,l,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${n.length})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${n.map(s=>`
                  <tr>
                    <td>${M.format(new Date(s.created_at))}</td>
                    <td>${d(s.first_name)} ${d(s.last_name??"")}</td>
                    <td>${d(s.email)}</td>
                    <td>${d(s.phone??"")}</td>
                    <td>${d(s.zip_code??"")}</td>
                    <td>${s.score??"—"}</td>
                    <td><span class="admin-badge band-${s.score_band??""}">${s.score_band??"—"}</span></td>
                    <td>${d(s.status)}</td>
                  </tr>
                `).join("")}
                ${n.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>c(a)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(v),h()}),document.querySelectorAll(".admin-period-btn").forEach(s=>{s.addEventListener("click",()=>{r=s.dataset.preset,c(a)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{g=document.getElementById("period-from").value||g,_=document.getElementById("period-to").value||_,r="custom",c(a)})}catch(e){const n=e instanceof Error?e.message:String(e);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(v),h("Tu sesión ha caducado o la contraseña ya no es válida.")):(b.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${d(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>c(a)))}}const T=sessionStorage.getItem(v);T?c(T):h();
