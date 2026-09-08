import{c as P}from"./index-DBuN83Yj.js";import{W as j}from"./witmeQuestions-DlX0lagW.js";const H="https://pgyaigdsedkdqvhtexrz.supabase.co",A="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=P(H,A),y="cs_admin_pw",v=document.getElementById("admin-root");function q(e){return e.toISOString().slice(0,10)}const z=new Date;let c="all",f=q(z),$=q(z),l="all";const I={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function F(e){const a=new Date;if(e==="today")return{since:new Date(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0,0).toISOString(),until:a.toISOString()};if(e==="7d")return{since:new Date(a.getTime()-6048e5).toISOString(),until:a.toISOString()};if(e==="custom"){const t=new Date(`${f}T00:00:00`),i=new Date(`${$}T23:59:59.999`);return t.getTime()>i.getTime()?{since:i.toISOString(),until:t.toISOString()}:{since:t.toISOString(),until:i.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:a.toISOString()}}const L=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function x(e,a){return e==="all"?"Todo el histórico":`${L.format(new Date(a.since))} – ${L.format(new Date(a.until))}`}const N=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],W=j.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),O=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function E(e){return e==="all"?null:e}async function B(e,a,t){const{data:i,error:s}=await b.rpc("admin_get_stats",{p_password:e,p_since:a.since,p_until:a.until,p_source:E(t)}).single();if(s||!i)throw s??new Error("No data");return i}async function R(e,a,t){const{data:i,error:s}=await b.rpc("admin_get_funnel_overview",{p_password:e,p_since:a.since,p_until:a.until,p_source:E(t)}).single();if(s||!i)throw s??new Error("No data");return i}async function V(e,a,t){const{data:i,error:s}=await b.rpc("admin_get_funnel_steps",{p_password:e,p_since:a.since,p_until:a.until,p_source:E(t)});if(s)throw s;return i??[]}async function K(e,a,t){const{data:i,error:s}=await b.rpc("admin_list_leads",{p_password:e,p_limit:200,p_offset:0,p_since:a.since,p_until:a.until,p_source:E(t)});if(s)throw s;return i??[]}async function Q(e){const{data:a,error:t}=await b.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(t)throw t;return a??[]}function S(e){v.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("pw-input").value;try{await B(t,F("all"),"all"),sessionStorage.setItem(y,t),m(t)}catch{S("Contraseña incorrecta.")}})}function d(e,a){return`<div class="admin-stat"><span class="admin-stat-value">${a}</span><span class="admin-stat-label">${e}</span></div>`}function h(e,a,t,i){const s=t>0?Math.round(a/t*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${i}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${a}</span>
    </div>
  `}function U(e,a,t){var u;const i=new Map(a.map(r=>[r.question_key,Number(r.reached)])),s=e.engaged_visits;let _="",p=(u=t[0])==null?void 0:u.key;return t.forEach((r,n)=>{const w=i.get(r.key)??0,T=s>0?Math.round(w/s*100):0;let k="";if(n>0&&!r.conditional){const D=i.get(p)??0;if(D>0){const g=Math.round((1-w/D)*100),M=g>=25?"high":g>=10?"mid":"low";k=g>0?`<span class="funnel-drop funnel-drop-${M}">-${g}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}_+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${n+1}. ${o(r.label)}${r.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${w} · ${T}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${T}%"></div></div>
        ${k}
      </div>
    `,r.conditional||(p=r.key)}),_}async function m(e){v.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const a=F(c);try{const[t,i,s,_,p]=await Promise.all([B(e,a,l),K(e,a,l),R(e,a,l),V(e,a,l),Q(e)]),u=t.band_excelente+t.band_bueno+t.band_regular+t.band_bajo,r=l==="solicitud"?W:N;v.innerHTML=`
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
            ${Object.keys(I).map(n=>`<button class="admin-period-btn ${l===n?"active":""}" data-source="${n}">${I[n]}</button>`).join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${c==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${c==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${c==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${c==="custom"?"active":""}">
            <input type="date" id="period-from" value="${f}" />
            <span>–</span>
            <input type="date" id="period-to" value="${$}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${o(x(c,a))}</p>
        </section>

        <section class="admin-stats-grid">
          ${d("Leads totales (histórico)",String(t.total_leads))}
          ${d("Leads en el periodo",String(t.period_leads))}
          ${d("Sesiones en el periodo",String(t.period_sessions))}
          ${d("Tasa de conversión",`${t.period_conversion_rate}%`)}
          ${d("Score medio (periodo)",t.avg_score!=null?String(t.avg_score):"—")}
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
            ${d("Visitas",String(s.total_visits))}
            ${d("Rebote instantáneo",`${s.bounce_rate}%`)}
            ${d("Quiz → lead",`${s.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${d("Completan el quiz",`${s.visit_to_quiz_rate}%`)}
            ${d("Dejan sus datos (lead)",`${s.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${d("Completan el quiz",`${s.engaged_to_quiz_rate}%`)}
            ${d("Dejan sus datos (lead)",`${s.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${l==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${s.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${U(s,_,r)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${h("Excelente",t.band_excelente,u,"band-excelente")}
          ${h("Bueno",t.band_bueno,u,"band-bueno")}
          ${h("Regular",t.band_regular,u,"band-regular")}
          ${h("Bajo",t.band_bajo,u,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${i.length})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th><th>Fuente</th>
                </tr>
              </thead>
              <tbody>
                ${i.map(n=>`
                  <tr>
                    <td>${O.format(new Date(n.created_at))}</td>
                    <td>${o(n.first_name)} ${o(n.last_name??"")}</td>
                    <td>${o(n.email)}</td>
                    <td>${o(n.phone??"")}</td>
                    <td>${o(n.zip_code??"")}</td>
                    <td>${n.score??"—"}</td>
                    <td><span class="admin-badge band-${n.score_band??""}">${n.score_band??"—"}</span></td>
                    <td>${o(n.status)}</td>
                    <td>${o(I[n.source]??n.source)}</td>
                  </tr>
                `).join("")}
                ${i.length===0?'<tr><td colspan="9" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${p.length})</p>
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
                ${p.map(n=>`
                  <tr>
                    <td>${O.format(new Date(n.created_at))}</td>
                    <td>${o(n.name??"")} ${o(n.last_name??"")}</td>
                    <td>${o(n.email??"")}</td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} €`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}">${o(n.witme_status??"—")}</span></td>
                    <td>${o(JSON.stringify(n.witme_message??""))}</td>
                  </tr>
                `).join("")}
                ${p.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>m(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(y),S()}),document.querySelectorAll(".admin-period-btn[data-source]").forEach(n=>{n.addEventListener("click",()=>{l=n.dataset.source,m(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.preset,m(e)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{f=document.getElementById("period-from").value||f,$=document.getElementById("period-to").value||$,c="custom",m(e)})}catch(t){const i=t instanceof Error?t.message:String(t);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(y),S("Tu sesión ha caducado o la contraseña ya no es válida.")):(v.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>m(e)))}}const C=sessionStorage.getItem(y);C?m(C):S();
