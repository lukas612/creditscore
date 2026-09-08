import{C as M,c as P}from"./offers-B_t2kAWT.js";import{W as A}from"./witmeQuestions-DlX0lagW.js";const H={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(M.map(e=>[e.id,e.name]))},x="https://pgyaigdsedkdqvhtexrz.supabase.co",N="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",p=P(x,N),E="cs_admin_pw",$=document.getElementById("admin-root");function F(e){return e.toISOString().slice(0,10)}const q=new Date;let l="all",y=F(q),S=F(q),c="all";const I={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function z(e){const a=new Date;if(e==="today")return{since:new Date(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0,0).toISOString(),until:a.toISOString()};if(e==="7d")return{since:new Date(a.getTime()-6048e5).toISOString(),until:a.toISOString()};if(e==="custom"){const t=new Date(`${y}T00:00:00`),i=new Date(`${S}T23:59:59.999`);return t.getTime()>i.getTime()?{since:i.toISOString(),until:t.toISOString()}:{since:t.toISOString(),until:i.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:a.toISOString()}}const D=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function R(e,a){return e==="all"?"Todo el histórico":`${D.format(new Date(a.since))} – ${D.format(new Date(a.until))}`}const W=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],V=A.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),L=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function _(e){return e==="all"?null:e}async function B(e,a,t){const{data:i,error:s}=await p.rpc("admin_get_stats",{p_password:e,p_since:a.since,p_until:a.until,p_source:_(t)}).single();if(s||!i)throw s??new Error("No data");return i}async function K(e,a,t){const{data:i,error:s}=await p.rpc("admin_get_funnel_overview",{p_password:e,p_since:a.since,p_until:a.until,p_source:_(t)}).single();if(s||!i)throw s??new Error("No data");return i}async function Q(e,a,t){const{data:i,error:s}=await p.rpc("admin_get_funnel_steps",{p_password:e,p_since:a.since,p_until:a.until,p_source:_(t)});if(s)throw s;return i??[]}async function U(e,a,t){const{data:i,error:s}=await p.rpc("admin_list_leads",{p_password:e,p_limit:200,p_offset:0,p_since:a.since,p_until:a.until,p_source:_(t)});if(s)throw s;return i??[]}async function Y(e){const{data:a,error:t}=await p.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(t)throw t;return a??[]}async function G(e,a,t){const{data:i,error:s}=await p.rpc("admin_get_offer_clicks",{p_password:e,p_since:a.since,p_until:a.until,p_source:_(t)});if(s)throw s;return i??[]}function w(e){$.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("pw-input").value;try{await B(t,z("all"),"all"),sessionStorage.setItem(E,t),u(t)}catch{w("Contraseña incorrecta.")}})}function r(e,a){return`<div class="admin-stat"><span class="admin-stat-value">${a}</span><span class="admin-stat-label">${e}</span></div>`}function v(e,a,t,i){const s=t>0?Math.round(a/t*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${i}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${a}</span>
    </div>
  `}function J(e,a,t){var b;const i=new Map(a.map(d=>[d.question_key,Number(d.reached)])),s=e.engaged_visits;let g="",m=(b=t[0])==null?void 0:b.key;return t.forEach((d,h)=>{const n=i.get(d.key)??0,k=s>0?Math.round(n/s*100):0;let T="";if(h>0&&!d.conditional){const C=i.get(m)??0;if(C>0){const f=Math.round((1-n/C)*100),j=f>=25?"high":f>=10?"mid":"low";T=f>0?`<span class="funnel-drop funnel-drop-${j}">-${f}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}g+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${h+1}. ${o(d.label)}${d.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${n} · ${k}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${k}%"></div></div>
        ${T}
      </div>
    `,d.conditional||(m=d.key)}),g}async function u(e){$.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const a=z(l);try{const[t,i,s,g,m,b]=await Promise.all([B(e,a,c),U(e,a,c),K(e,a,c),Q(e,a,c),Y(e),G(e,a,c)]),d=t.band_excelente+t.band_bueno+t.band_regular+t.band_bajo,h=c==="solicitud"?V:W;$.innerHTML=`
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
            ${Object.keys(I).map(n=>`<button class="admin-period-btn ${c===n?"active":""}" data-source="${n}">${I[n]}</button>`).join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${l==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${l==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${l==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${l==="custom"?"active":""}">
            <input type="date" id="period-from" value="${y}" />
            <span>–</span>
            <input type="date" id="period-to" value="${S}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${o(R(l,a))}</p>
        </section>

        <section class="admin-stats-grid">
          ${r("Leads totales (histórico)",String(t.total_leads))}
          ${r("Leads en el periodo",String(t.period_leads))}
          ${r("Sesiones en el periodo",String(t.period_sessions))}
          ${r("Tasa de conversión",`${t.period_conversion_rate}%`)}
          ${r("Score medio (periodo)",t.avg_score!=null?String(t.avg_score):"—")}
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
            ${r("Visitas",String(s.total_visits))}
            ${r("Rebote instantáneo",`${s.bounce_rate}%`)}
            ${r("Quiz → lead",`${s.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Completan el quiz",`${s.visit_to_quiz_rate}%`)}
            ${r("Dejan sus datos (lead)",`${s.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Completan el quiz",`${s.engaged_to_quiz_rate}%`)}
            ${r("Dejan sus datos (lead)",`${s.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${c==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${s.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${J(s,g,h)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${v("Excelente",t.band_excelente,d,"band-excelente")}
          ${v("Bueno",t.band_bueno,d,"band-bueno")}
          ${v("Regular",t.band_regular,d,"band-regular")}
          ${v("Bajo",t.band_bajo,d,"band-bajo")}
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
                    <td>${L.format(new Date(n.created_at))}</td>
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
          <p class="admin-card-title">Solicitudes enviadas a Witme (${m.length})</p>
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
                ${m.map(n=>`
                  <tr>
                    <td>${L.format(new Date(n.created_at))}</td>
                    <td>${o(n.name??"")} ${o(n.last_name??"")}</td>
                    <td>${o(n.email??"")}</td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} €`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}">${o(n.witme_status??"—")}</span></td>
                    <td>${o(JSON.stringify(n.witme_message??""))}</td>
                  </tr>
                `).join("")}
                ${m.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
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
                ${b.map(n=>`
                  <tr>
                    <td>${o(H[n.offer_id]??n.offer_id)}</td>
                    <td>${n.clicks}</td>
                  </tr>
                `).join("")}
                ${b.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,document.getElementById("refresh-btn").addEventListener("click",()=>u(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(E),w()}),document.querySelectorAll(".admin-period-btn[data-source]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.source,u(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(n=>{n.addEventListener("click",()=>{l=n.dataset.preset,u(e)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{y=document.getElementById("period-from").value||y,S=document.getElementById("period-to").value||S,l="custom",u(e)})}catch(t){const i=t instanceof Error?t.message:String(t);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),w("Tu sesión ha caducado o la contraseña ya no es válida.")):($.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>u(e)))}}const O=sessionStorage.getItem(E);O?u(O):w();
