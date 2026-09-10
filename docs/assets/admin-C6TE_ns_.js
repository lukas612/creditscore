import{c as oe}from"./validation-B4TxmlFv.js";import{q as re}from"./questions-D4Dn-9Ya.js";import{C as de}from"./offers-BrJogE82.js";import{W as R,S as Z}from"./witmeQuestions-BRs2Lqdt.js";const Q={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(de.map(e=>[e.id,e.name]))};function K(e){if(e in Q)return Q[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function J(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const ce=J(re),le=J(R),ue={si:"Sí",no:"No"};function me(e,t,a){const n=e==="quiz"?ce[t]:le[t];return(n==null?void 0:n[a])??ue[a]??a}const pe={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},be={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},ge=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),ve="https://pgyaigdsedkdqvhtexrz.supabase.co",fe="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",v=oe(ve,fe),S="cs_admin_pw",p=document.getElementById("admin-root");function X(e){return e.toISOString().slice(0,10)}const ee=new Date;let _="all",P=X(ee),q=X(ee),m="all";const H=10;let f=0;const F=10;let $=0,O="dashboard";const _e={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},N={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree"};function j(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${P}T00:00:00`),n=new Date(`${q}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const W=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function he(e,t){return e==="all"?"Todo el histórico":`${W.format(new Date(t.since))} – ${W.format(new Date(t.until))}`}const $e=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],ye=R.filter(e=>Z.includes(e.phase)),Se=R.filter(e=>!Z.includes(e.phase)),U=e=>({key:e.key,label:e.label,conditional:!!e.condition}),Ee=[...ye.map(U),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Se.map(U),{key:"application_completed",label:"✅ Termina la solicitud completa"}],V=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function r(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function w(e){return e==="all"?null:e}async function te(e,t,a){const{data:n,error:s}=await v.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:w(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function ke(e,t,a){const{data:n,error:s}=await v.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:w(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function we(e,t,a){const{data:n,error:s}=await v.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:w(a)});if(s)throw s;return n??[]}async function Le(e,t,a,n){const{data:s,error:o}=await v.rpc("admin_list_leads",{p_password:e,p_limit:H,p_offset:n*H,p_since:t.since,p_until:t.until,p_source:w(a)});if(o)throw o;return s??[]}async function Ie(e,t){const{data:a,error:n}=await v.rpc("admin_get_witme_submissions",{p_password:e,p_limit:F,p_offset:t*F});if(n)throw n;return a??[]}async function Te(e,t,a){const{data:n,error:s}=await v.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:w(a)});if(s)throw s;return n??[]}let ae=[];async function Ce(e){const{data:t,error:a}=await v.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Oe(e,t,a,n,s){const{error:o}=await v.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:s});if(o)throw o}async function Ae(e,t){const{error:a}=await v.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function Pe(e){const{error:t}=await v.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function qe(e,t,a){const{data:n,error:s}=await v.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return n}function E(e){p.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${r(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await te(a,j("all"),"all"),sessionStorage.setItem(S,a),y(a)}catch{E("Contraseña incorrecta.")}})}function b(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function T(e,t,a,n){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function De(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function je(e,t,a){var u;const n=new Map(t.map(c=>[c.question_key,Number(c.reached)])),s=e.engaged_visits;let o="",d=(u=a[0])==null?void 0:u.key;return a.forEach((c,h)=>{const i=n.get(c.key)??0,g=s>0?Math.round(i/s*100):0;let l="";if(h>0&&!c.conditional){const L=n.get(d)??0;if(L>0){const I=Math.round((1-i/L)*100),ie=I>=25?"high":I>=10?"mid":"low";l=I>0?`<span class="funnel-drop funnel-drop-${ie}">-${I}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${h+1}. ${r(c.label)}${c.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${i} · ${g}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${g}%"></div></div>
        ${l}
      </div>
    `,c.conditional||(d=c.key)}),o}function y(e){O==="scoring"?D(e):O==="fieldstats"?se(e):O==="leads"?k(e):ne(e)}function z(e){return`
    <header class="admin-header">
      <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
      <div class="admin-header-actions">
        <div class="admin-tabs">
          <button class="admin-tab-btn ${e==="dashboard"?"active":""}" data-tab="dashboard">Dashboard</button>
          <button class="admin-tab-btn ${e==="leads"?"active":""}" data-tab="leads">Leads</button>
          <button class="admin-tab-btn ${e==="scoring"?"active":""}" data-tab="scoring">Algoritmo de scoring</button>
          <button class="admin-tab-btn ${e==="fieldstats"?"active":""}" data-tab="fieldstats">Estadísticas</button>
        </div>
        <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
        <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
      </div>
    </header>
  `}function B(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{O=t.dataset.tab,y(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>y(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(S),E()})}function x(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(N).map(t=>`<button class="admin-period-btn ${m===t?"active":""}" data-source="${t}">${N[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${_==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${_==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${_==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${_==="custom"?"active":""}">
        <input type="date" id="period-from" value="${P}" />
        <span>–</span>
        <input type="date" id="period-to" value="${q}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${r(he(_,e))}</p>
    </section>
  `}function M(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{m=a.dataset.source,f=0,y(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{_=a.dataset.preset,f=0,y(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{P=document.getElementById("period-from").value||P,q=document.getElementById("period-to").value||q,_="custom",f=0,y(e)})}async function ne(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(_);try{const[a,n,s,o]=await Promise.all([te(e,t,m),ke(e,t,m),we(e,t,m),Te(e,t,m)]),d=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,u=m==="solicitud"||m==="pingtree"?Ee:$e;p.innerHTML=`
      <div class="admin-shell">
        ${z("dashboard")}

        ${x(t)}

        <section class="admin-stats-grid">
          ${b("Leads totales (histórico)",String(a.total_leads))}
          ${b("Leads en el periodo",String(a.period_leads))}
          ${b("Sesiones en el periodo",String(a.period_sessions))}
          ${b("Tasa de conversión",`${a.period_conversion_rate}%`)}
          ${b("Score medio (periodo)",a.avg_score!=null?String(a.avg_score):"—")}
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
            ${b("Visitas",String(n.total_visits))}
            ${b("Rebote instantáneo",`${n.bounce_rate}%`)}
            ${b("Quiz → lead",`${n.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${b("Completan el quiz",`${n.visit_to_quiz_rate}%`)}
            ${b("Dejan sus datos (lead)",`${n.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${b("Completan el quiz",`${n.engaged_to_quiz_rate}%`)}
            ${b("Dejan sus datos (lead)",`${n.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${m==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto, Solicitud completa o Pingtree) para ver la caída pregunta a pregunta — mezclarlos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${n.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${je(n,s,u)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${T("Excelente",a.band_excelente,d,"band-excelente")}
          ${T("Bueno",a.band_bueno,d,"band-bueno")}
          ${T("Regular",a.band_regular,d,"band-regular")}
          ${T("Bajo",a.band_bajo,d,"band-bajo")}
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
                ${o.map(c=>`
                  <tr>
                    <td>${r(K(c.offer_id))}</td>
                    <td>${c.clicks}</td>
                  </tr>
                `).join("")}
                ${o.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,B(e),M(e)}catch(a){const n=a instanceof Error?a.message:String(a);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(S),E("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${r(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>ne(e)))}}async function k(e){var a,n;p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(_);try{const[s,o]=await Promise.all([Le(e,t,m,f),Ie(e,$)]),d=((a=s[0])==null?void 0:a.total_count)??0,u=Math.max(1,Math.ceil(d/H)),c=((n=o[0])==null?void 0:n.total_count)??0,h=Math.max(1,Math.ceil(c/F));p.innerHTML=`
      <div class="admin-shell">
        ${z("leads")}

        ${x(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${d})</p>
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
                ${s.map(i=>`
                  <tr>
                    <td>${V.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.first_name)} ${r(i.last_name??"")}">${r(i.first_name)} ${r(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email)}">${r(i.email)}</div></td>
                    <td>${r(i.phone??"")}</td>
                    <td>${r(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${De(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${r(i.status)}</td>
                    <td>${r(i.source==="pingtree"?"Pingtree":N[i.source]??i.source)}</td>
                    <td>${i.source==="pingtree"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:i.source!=="solicitud"?'<span title="El quiz corto no envía a Witme">n/a</span>':i.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(g=>r(K(g))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${s.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${f===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${f+1} de ${u}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${f+1>=u?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${c})</p>
          <p class="admin-card-sub">
            Cada intento de envío a Witme, sea por el canal que sea (prestamista normal,
            aval coche + reunificación en background, o el flujo independiente Pingtree).
            "Enviado": llegó una respuesta de Witme (no falló la conexión). "Aceptado":
            Witme encontró un prestamista/oferta. "Redirigido": solo aplica a Pingtree,
            que lleva al usuario directamente a la <code>redirectUrl</code> de Witme en
            vez de mostrar resultados propios.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Canal</th><th>Nombre</th><th>Email</th>
                  <th>Enviado</th><th>Aceptado</th><th>Redirigido</th>
                </tr>
              </thead>
              <tbody>
                ${o.map(i=>`
                  <tr>
                    <td>${V.format(new Date(i.created_at))}</td>
                    <td>${r(i.canal)}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.name??"")}">${r(i.name??"—")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email??"")}">${r(i.email??"—")}</div></td>
                    <td>${i.enviado?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td>${i.aceptado?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td>${i.redirigido==null?'<span title="Este canal no redirige, solo Pingtree">n/a</span>':i.redirigido?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                  </tr>
                `).join("")}
                ${o.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="submissions-prev-btn" ${$===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${$+1} de ${h}</span>
            <button class="admin-btn-ghost" id="submissions-next-btn" ${$+1>=h?"disabled":""}>Siguiente →</button>
          </div>
        </section>
      </div>
    `,B(e),M(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{f>0&&(f--,k(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{f++,k(e)}),document.getElementById("submissions-prev-btn").addEventListener("click",()=>{$>0&&($--,k(e))}),document.getElementById("submissions-next-btn").addEventListener("click",()=>{$++,k(e)})}catch(s){const o=s instanceof Error?s.message:String(s);o.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(S),E("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${r(o)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>k(e)))}}function ze(e,t,a){return a?`${e} +`:`${e} – ${t}`}function A(e,t,a,n,s,o,d){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${r(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${o}"
        step="${d}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function Be(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return A(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,s)=>A(e.key,`bucket:${s}`,ze(n[0],n[1],s===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>A(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function He(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${r(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${r(_e[e.key]??"—")} · clave: <code>${r(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${A(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${Be(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function Fe(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const n=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,s=ae.find(l=>l.key===n),o=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!o)return;const d=o.querySelector(".scoring-rule-status"),u=new Map;o.querySelectorAll("input[data-field]").forEach(l=>{u.set(l.dataset.field,l.type==="checkbox"?String(l.checked):l.value)});const c=Number(u.get("weight")),h=u.get("active")==="true",i=s.config;let g;typeof i.value=="number"&&Object.keys(i).length===1?g={value:Number(u.get("value"))}:Array.isArray(i.buckets)?g={buckets:i.buckets.map((l,L)=>[l[0],l[1],Number(u.get(`bucket:${L}`))])}:(g={},Object.keys(i).forEach(l=>{g[l]=Number(u.get(`opt:${l}`))})),a.disabled=!0,d.textContent="Guardando…",d.className="scoring-rule-status";try{await Oe(e,n,g,c,h),s.config=g,s.weight=c,s.active=h,d.textContent="✓ Guardado",d.className="scoring-rule-status ok",setTimeout(()=>{d.textContent=""},2500)}catch{d.textContent="Error al guardar",d.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const o=s.querySelector(".scoring-rule-status");a.disabled=!0,o.textContent="Restaurando…",o.className="scoring-rule-status";try{await Ae(e,n),await D(e)}catch{o.textContent="Error al restaurar",o.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await Pe(e),await D(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function D(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await Ce(e);ae=t,p.innerHTML=`
      <div class="admin-shell">
        ${z("scoring")}

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
          ${t.map(He).join("")}
        </div>
      </div>
    `,B(e),Fe(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(S),E("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${r(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>D(e)))}}const G=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function C(e,t){return e==null?"—":t?`${G.format(e)} €`:G.format(e)}function Ne(e,t,a){const n=ge.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${C(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${C(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${C(a.min,n)} – ${C(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function Re(e,t,a,n){const s=t.reduce((o,d)=>o+d.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      ${t.map(o=>{const d=s>0?Math.round(o.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${r(me(a,n,o.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${d}%"></div></div>
              <span class="admin-band-count">${o.count} (${d}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function xe(e,t){const a=e==="quiz"?pe:be;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,o])=>Ne(a[s]??s,s,o)).join("")}
        ${Object.entries(t.categorical).map(([s,o])=>Re(a[s]??s,o,e,s)).join("")}
      </div>
    </section>
  `}async function se(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(_),a=m==="solicitud"||m==="quiz"||m==="pingtree"?[m]:["quiz","solicitud","pingtree"];try{const n=await Promise.all(a.map(s=>qe(e,t,s)));p.innerHTML=`
      <div class="admin-shell">
        ${z("fieldstats")}

        ${x(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,o)=>xe(s,n[o])).join("")}
      </div>
    `,B(e),M(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(S),E("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${r(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>se(e)))}}const Y=sessionStorage.getItem(S);Y?y(Y):E();
