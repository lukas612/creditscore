import{C as x,c as H}from"./offers-B_t2kAWT.js";import{W as N}from"./witmeQuestions-DlX0lagW.js";const O={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(x.map(e=>[e.id,e.name]))},R="https://pgyaigdsedkdqvhtexrz.supabase.co",W="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",h=H(R,W),L="cs_admin_pw",I=document.getElementById("admin-root");function j(e){return e.toISOString().slice(0,10)}const q=new Date;let p="all",w=j(q),k=j(q),u="all";const D=25;let l=0;const C={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function z(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const s=new Date(`${w}T00:00:00`),n=new Date(`${k}T23:59:59.999`);return s.getTime()>n.getTime()?{since:n.toISOString(),until:s.toISOString()}:{since:s.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const F=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function V(e,t){return e==="all"?"Todo el histórico":`${F.format(new Date(t.since))} – ${F.format(new Date(t.until))}`}const K=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],Q=N.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),B=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function y(e){return e==="all"?null:e}async function M(e,t,s){const{data:n,error:i}=await h.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:y(s)}).single();if(i||!n)throw i??new Error("No data");return n}async function U(e,t,s){const{data:n,error:i}=await h.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:y(s)}).single();if(i||!n)throw i??new Error("No data");return n}async function G(e,t,s){const{data:n,error:i}=await h.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:y(s)});if(i)throw i;return n??[]}async function Y(e,t,s,n){const{data:i,error:d}=await h.rpc("admin_list_leads",{p_password:e,p_limit:D,p_offset:n*D,p_since:t.since,p_until:t.until,p_source:y(s)});if(d)throw d;return i??[]}async function Z(e){const{data:t,error:s}=await h.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(s)throw s;return t??[]}async function J(e,t,s){const{data:n,error:i}=await h.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:y(s)});if(i)throw i;return n??[]}function T(e){I.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const s=document.getElementById("pw-input").value;try{await M(s,z("all"),"all"),sessionStorage.setItem(L,s),m(s)}catch{T("Contraseña incorrecta.")}})}function c(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function E(e,t,s,n){const i=s>0?Math.round(t/s*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${i}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function X(e,t,s){var g;const n=new Map(t.map(r=>[r.question_key,Number(r.reached)])),i=e.engaged_visits;let d="",S=(g=s[0])==null?void 0:g.key;return s.forEach((r,b)=>{const f=n.get(r.key)??0,v=i>0?Math.round(f/i*100):0;let $="";if(b>0&&!r.conditional){const a=n.get(S)??0;if(a>0){const _=Math.round((1-f/a)*100),A=_>=25?"high":_>=10?"mid":"low";$=_>0?`<span class="funnel-drop funnel-drop-${A}">-${_}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}d+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${b+1}. ${o(r.label)}${r.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${f} · ${v}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${v}%"></div></div>
        ${$}
      </div>
    `,r.conditional||(S=r.key)}),d}async function m(e){var s;I.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=z(p);try{const[n,i,d,S,g,r]=await Promise.all([M(e,t,u),Y(e,t,u,l),U(e,t,u),G(e,t,u),Z(e),J(e,t,u)]),b=n.band_excelente+n.band_bueno+n.band_regular+n.band_bajo,f=u==="solicitud"?Q:K,v=((s=i[0])==null?void 0:s.total_count)??0,$=Math.max(1,Math.ceil(v/D));I.innerHTML=`
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
            ${Object.keys(C).map(a=>`<button class="admin-period-btn ${u===a?"active":""}" data-source="${a}">${C[a]}</button>`).join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${p==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${p==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${p==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${p==="custom"?"active":""}">
            <input type="date" id="period-from" value="${w}" />
            <span>–</span>
            <input type="date" id="period-to" value="${k}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${o(V(p,t))}</p>
        </section>

        <section class="admin-stats-grid">
          ${c("Leads totales (histórico)",String(n.total_leads))}
          ${c("Leads en el periodo",String(n.period_leads))}
          ${c("Sesiones en el periodo",String(n.period_sessions))}
          ${c("Tasa de conversión",`${n.period_conversion_rate}%`)}
          ${c("Score medio (periodo)",n.avg_score!=null?String(n.avg_score):"—")}
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
            ${c("Visitas",String(d.total_visits))}
            ${c("Rebote instantáneo",`${d.bounce_rate}%`)}
            ${c("Quiz → lead",`${d.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${d.visit_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${d.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${d.engaged_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${d.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${u==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${d.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${X(d,S,f)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${E("Excelente",n.band_excelente,b,"band-excelente")}
          ${E("Bueno",n.band_bueno,b,"band-bueno")}
          ${E("Regular",n.band_regular,b,"band-regular")}
          ${E("Bajo",n.band_bajo,b,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${v})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${i.map(a=>`
                  <tr>
                    <td>${B.format(new Date(a.created_at))}</td>
                    <td>${o(a.first_name)} ${o(a.last_name??"")}</td>
                    <td>${o(a.email)}</td>
                    <td>${o(a.phone??"")}</td>
                    <td>${o(a.zip_code??"")}</td>
                    <td>${a.score??"—"}</td>
                    <td><span class="admin-badge band-${a.score_band??""}">${a.score_band??"—"}</span></td>
                    <td>${o(a.status)}</td>
                    <td>${o(C[a.source]??a.source)}</td>
                    <td>${a.offer_clicks&&a.offer_clicks.length>0?a.offer_clicks.map(_=>o(O[_]??_)).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${i.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${l===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${l+1} de ${$}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${l+1>=$?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${g.length})</p>
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
                ${g.map(a=>`
                  <tr>
                    <td>${B.format(new Date(a.created_at))}</td>
                    <td>${o(a.name??"")} ${o(a.last_name??"")}</td>
                    <td>${o(a.email??"")}</td>
                    <td>${a.requested_amount!=null?`${a.requested_amount} €`:"—"}</td>
                    <td>${a.witme_id??"—"}</td>
                    <td><span class="admin-badge ${a.witme_status==="processed"?"band-excelente":"band-bajo"}">${o(a.witme_status??"—")}</span></td>
                    <td>${o(JSON.stringify(a.witme_message??""))}</td>
                  </tr>
                `).join("")}
                ${g.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
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
                ${r.map(a=>`
                  <tr>
                    <td>${o(O[a.offer_id]??a.offer_id)}</td>
                    <td>${a.clicks}</td>
                  </tr>
                `).join("")}
                ${r.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>m(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(L),T()}),document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{u=a.dataset.source,l=0,m(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{p=a.dataset.preset,l=0,m(e)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{w=document.getElementById("period-from").value||w,k=document.getElementById("period-to").value||k,p="custom",l=0,m(e)}),document.getElementById("leads-prev-btn").addEventListener("click",()=>{l>0&&(l--,m(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{l++,m(e)})}catch(n){const i=n instanceof Error?n.message:String(n);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(L),T("Tu sesión ha caducado o la contraseña ya no es válida.")):(I.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>m(e)))}}const P=sessionStorage.getItem(L);P?m(P):T();
