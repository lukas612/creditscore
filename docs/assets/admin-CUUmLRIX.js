import{c as ye}from"./validation-B4TxmlFv.js";import{q as Se}from"./questions-D4Dn-9Ya.js";import{C as Ee}from"./offers-BrJogE82.js";import{W as ee,S as pe}from"./witmeQuestions-BRs2Lqdt.js";const de={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(Ee.map(e=>[e.id,e.name]))};function G(e){if(e in de)return de[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function be(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const ke=be(Se),Le=be(ee),we={si:"Sí",no:"No"};function Ie(e,t,a){const n=e==="quiz"?ke[t]:Le[t];return(n==null?void 0:n[a])??we[a]??a}const Te={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},Pe={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Ce=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),Ae="https://pgyaigdsedkdqvhtexrz.supabase.co",qe="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=ye(Ae,qe),A="cs_admin_pw",f=document.getElementById("admin-root");function ge(e){return e.toISOString().slice(0,10)}const _e=new Date;let S="all",B=ge(_e),N=ge(_e),g="all";const Z=10;let y=0;const Y=10;let I=0;const J=10;let T=0;const K=10;let P=0,x="dashboard";const Oe={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},X={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree"};function H(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${B}T00:00:00`),n=new Date(`${N}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const re=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function je(e,t){return e==="all"?"Todo el histórico":`${re.format(new Date(t.since))} – ${re.format(new Date(t.until))}`}const Re=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],De=ee.filter(e=>pe.includes(e.phase)),Me=ee.filter(e=>!pe.includes(e.phase)),ce=e=>({key:e.key,label:e.label,conditional:!!e.condition}),xe=[...De.map(ce),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Me.map(ce),{key:"application_completed",label:"✅ Termina la solicitud completa"}],R=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function O(e){return e==="all"?null:e}async function he(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function ze(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function Be(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)});if(s)throw s;return n??[]}async function Ne(e,t,a,n){const{data:s,error:d}=await b.rpc("admin_list_leads",{p_password:e,p_limit:Z,p_offset:n*Z,p_since:t.since,p_until:t.until,p_source:O(a)});if(d)throw d;return s??[]}async function Fe(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_applications",{p_password:e,p_limit:Y,p_offset:t*Y});if(n)throw n;return a??[]}async function He(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:J,p_offset:t*J});if(n)throw n;return a??[]}async function We(e,t){const{data:a,error:n}=await b.rpc("admin_get_pingtree_applications",{p_password:e,p_limit:K,p_offset:t*K});if(n)throw n;return a??[]}async function Qe(e){const{data:t,error:a}=await b.rpc("admin_get_pingtree_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}async function Ue(e){const{data:t,error:a}=await b.rpc("admin_get_witme_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}function v(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function V(e){return e==null?"—":`${e}%`}async function Ve(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)});if(s)throw s;return n??[]}let fe=[];async function Ge(e){const{data:t,error:a}=await b.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Ze(e,t,a,n,s){const{error:d}=await b.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:s});if(d)throw d}async function Ye(e,t){const{error:a}=await b.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function Je(e){const{error:t}=await b.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Ke(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return n}function q(e){f.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await he(a,H("all"),"all"),sessionStorage.setItem(A,a),C(a)}catch{q("Contraseña incorrecta.")}})}function l(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function D(e,t,a,n){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function le(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function Xe(e,t,a){var u;const n=new Map(t.map(c=>[c.question_key,Number(c.reached)])),s=e.engaged_visits;let d="",r=(u=a[0])==null?void 0:u.key;return a.forEach((c,E)=>{const _=n.get(c.key)??0,p=s>0?Math.round(_/s*100):0;let m="";if(E>0&&!c.conditional){const L=n.get(r)??0;if(L>0){const w=Math.round((1-_/L)*100),j=w>=25?"high":w>=10?"mid":"low";m=w>0?`<span class="funnel-drop funnel-drop-${j}">-${w}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}d+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${E+1}. ${o(c.label)}${c.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${_} · ${p}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${p}%"></div></div>
        ${m}
      </div>
    `,c.conditional||(r=c.key)}),d}function C(e){x==="scoring"?F(e):x==="fieldstats"?$e(e):x==="leads"?$(e):ve(e)}function W(e){return`
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
  `}function Q(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{x=t.dataset.tab,C(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>C(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(A),q()})}function te(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(X).map(t=>`<button class="admin-period-btn ${g===t?"active":""}" data-source="${t}">${X[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${S==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${S==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${S==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${S==="custom"?"active":""}">
        <input type="date" id="period-from" value="${B}" />
        <span>–</span>
        <input type="date" id="period-to" value="${N}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(je(S,e))}</p>
    </section>
  `}function ae(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{g=a.dataset.source,y=0,C(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{S=a.dataset.preset,y=0,C(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{B=document.getElementById("period-from").value||B,N=document.getElementById("period-to").value||N,S="custom",y=0,C(e)})}async function ve(e){f.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=H(S);try{const[a,n,s,d]=await Promise.all([he(e,t,g),ze(e,t,g),Be(e,t,g),Ve(e,t,g)]),r=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,u=g==="solicitud"||g==="pingtree"?xe:Re;f.innerHTML=`
      <div class="admin-shell">
        ${W("dashboard")}

        ${te(t)}

        <section class="admin-stats-grid">
          ${l("Leads totales (histórico)",String(a.total_leads))}
          ${l("Leads en el periodo",String(a.period_leads))}
          ${l("Sesiones en el periodo",String(a.period_sessions))}
          ${l("Tasa de conversión",`${a.period_conversion_rate}%`)}
          ${l("Score medio (periodo)",a.avg_score!=null?String(a.avg_score):"—")}
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
            ${l("Visitas",String(n.total_visits))}
            ${l("Rebote instantáneo",`${n.bounce_rate}%`)}
            ${l("Quiz → lead",`${n.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Completan el quiz",`${n.visit_to_quiz_rate}%`)}
            ${l("Dejan sus datos (lead)",`${n.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Completan el quiz",`${n.engaged_to_quiz_rate}%`)}
            ${l("Dejan sus datos (lead)",`${n.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${g==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto, Solicitud completa o Pingtree) para ver la caída pregunta a pregunta — mezclarlos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${n.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${Xe(n,s,u)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${D("Excelente",a.band_excelente,r,"band-excelente")}
          ${D("Bueno",a.band_bueno,r,"band-bueno")}
          ${D("Regular",a.band_regular,r,"band-regular")}
          ${D("Bajo",a.band_bajo,r,"band-bajo")}
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
                ${d.map(c=>`
                  <tr>
                    <td>${o(G(c.offer_id))}</td>
                    <td>${c.clicks}</td>
                  </tr>
                `).join("")}
                ${d.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,Q(e),ae(e)}catch(a){const n=a instanceof Error?a.message:String(a);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(A),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(f.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>ve(e)))}}async function $(e){var a,n,s,d;f.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=H(S);try{const[r,u,c,E,_,p]=await Promise.all([Ne(e,t,g,y),Fe(e,I),Ue(e),He(e,T),We(e,P),Qe(e)]),m=((a=r[0])==null?void 0:a.total_count)??0,L=Math.max(1,Math.ceil(m/Z)),w=((n=u[0])==null?void 0:n.total_count)??0,j=Math.max(1,Math.ceil(w/Y)),ne=((s=E[0])==null?void 0:s.total_count)??0,ie=Math.max(1,Math.ceil(ne/J)),se=((d=_[0])==null?void 0:d.total_count)??0,oe=Math.max(1,Math.ceil(se/K));f.innerHTML=`
      <div class="admin-shell">
        ${W("leads")}

        ${te(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${m})</p>
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
                ${r.map(i=>`
                  <tr>
                    <td>${R.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.first_name)} ${o(i.last_name??"")}">${o(i.first_name)} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email)}">${o(i.email)}</div></td>
                    <td>${o(i.phone??"")}</td>
                    <td>${o(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${le(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${o(i.status)}</td>
                    <td>${o(i.source==="pingtree"?"Pingtree":X[i.source]??i.source)}</td>
                    <td>${i.source==="pingtree"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:i.source!=="solicitud"?'<span title="El quiz corto no envía a Witme">n/a</span>':i.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(h=>o(G(h))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${r.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${y===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${y+1} de ${L}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${y+1>=L?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${w})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Tiempo medio de respuesta",v(c.avg_ms))}
            ${l("Mediana",v(c.median_ms))}
            ${l("P95",v(c.p95_ms))}
            ${l("Máximo",v(c.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("% Aceptados (con oferta)",V(c.pct_accepted))}
            ${l("% Rechazados por Witme",V(c.pct_failed))}
            ${l("Con oferta",String(c.count_accepted))}
            ${l("Total solicitudes",String(c.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${c.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${c.count_error} terminaron
            en error de conexión con Witme${c.count_timeout>0?` y ${c.count_timeout} en timeout (de cuando sí cortábamos a los 20s)`:""}.
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
                ${u.map(i=>{const h=[];i.witme_message!=null&&h.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&h.push(`Redirect URL: ${i.witme_redirect_url}`);const k=h.join(`
`);return`
                  <tr>
                    <td>${R.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${k?`title="${o(k)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${v(i.witme_response_ms)}</td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${le(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(U=>o(G(U))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${u.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${I===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${I+1} de ${j}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${I+1>=j?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${ne})</p>
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
                ${E.map(i=>{const h=[];i.witme_message!=null&&h.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&h.push(`Redirect URL: ${i.witme_redirect_url}`);const k=h.join(`
`),U=i.product==="car_collateral+debt_consolidation"?"Aval coche + Reunificación deudas":i.product==="car_collateral"?"Aval coche":i.product==="debt_consolidation"?"Reunificación deudas":"—";return`
                  <tr>
                    <td>${R.format(new Date(i.created_at))}</td>
                    <td>${o(U)}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${k?`title="${o(k)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${v(i.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${E.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${T===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${T+1} de ${ie}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${T+1>=ie?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Pingtree (${se})</p>
          <p class="admin-card-sub">
            Versión independiente de la solicitud completa (<code>/pingtree.html</code>):
            usa solo el endpoint <code>servy-form-wait</code> con los servy_id 151
            (Creditio Pingtree), 154 (reunificación) y 171 (aval coche) juntos, y
            redirige directamente a la <code>redirectUrl</code> de Witme en vez de
            mostrar resultados propios.
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Tiempo medio de respuesta",v(p.avg_ms))}
            ${l("Mediana",v(p.median_ms))}
            ${l("P95",v(p.p95_ms))}
            ${l("Máximo",v(p.max_ms))}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("% Aceptados (con redirectUrl)",V(p.pct_accepted))}
            ${l("Con oferta",String(p.count_accepted))}
            ${l("Total solicitudes",String(p.count_total))}
          </section>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th><th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                ${_.map(i=>{const h=[];i.witme_message!=null&&h.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&h.push(`Redirect URL: ${i.witme_redirect_url}`);const k=h.join(`
`);return`
                  <tr>
                    <td>${R.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${k?`title="${o(k)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${v(i.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${_.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="pingtree-prev-btn" ${P===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${P+1} de ${oe}</span>
            <button class="admin-btn-ghost" id="pingtree-next-btn" ${P+1>=oe?"disabled":""}>Siguiente →</button>
          </div>
        </section>
      </div>
    `,Q(e),ae(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{y>0&&(y--,$(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{y++,$(e)}),document.getElementById("witme-prev-btn").addEventListener("click",()=>{I>0&&(I--,$(e))}),document.getElementById("witme-next-btn").addEventListener("click",()=>{I++,$(e)}),document.getElementById("witme-car-prev-btn").addEventListener("click",()=>{T>0&&(T--,$(e))}),document.getElementById("witme-car-next-btn").addEventListener("click",()=>{T++,$(e)}),document.getElementById("pingtree-prev-btn").addEventListener("click",()=>{P>0&&(P--,$(e))}),document.getElementById("pingtree-next-btn").addEventListener("click",()=>{P++,$(e)})}catch(r){const u=r instanceof Error?r.message:String(r);u.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(A),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(f.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(u)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$(e)))}}function et(e,t,a){return a?`${e} +`:`${e} – ${t}`}function z(e,t,a,n,s,d,r){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${o(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${d}"
        step="${r}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function tt(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return z(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,s)=>z(e.key,`bucket:${s}`,et(n[0],n[1],s===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>z(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function at(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${o(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${o(Oe[e.key]??"—")} · clave: <code>${o(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${z(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${tt(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function nt(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const n=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,s=fe.find(m=>m.key===n),d=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!d)return;const r=d.querySelector(".scoring-rule-status"),u=new Map;d.querySelectorAll("input[data-field]").forEach(m=>{u.set(m.dataset.field,m.type==="checkbox"?String(m.checked):m.value)});const c=Number(u.get("weight")),E=u.get("active")==="true",_=s.config;let p;typeof _.value=="number"&&Object.keys(_).length===1?p={value:Number(u.get("value"))}:Array.isArray(_.buckets)?p={buckets:_.buckets.map((m,L)=>[m[0],m[1],Number(u.get(`bucket:${L}`))])}:(p={},Object.keys(_).forEach(m=>{p[m]=Number(u.get(`opt:${m}`))})),a.disabled=!0,r.textContent="Guardando…",r.className="scoring-rule-status";try{await Ze(e,n,p,c,E),s.config=p,s.weight=c,s.active=E,r.textContent="✓ Guardado",r.className="scoring-rule-status ok",setTimeout(()=>{r.textContent=""},2500)}catch{r.textContent="Error al guardar",r.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const d=s.querySelector(".scoring-rule-status");a.disabled=!0,d.textContent="Restaurando…",d.className="scoring-rule-status";try{await Ye(e,n),await F(e)}catch{d.textContent="Error al restaurar",d.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await Je(e),await F(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function F(e){f.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await Ge(e);fe=t,f.innerHTML=`
      <div class="admin-shell">
        ${W("scoring")}

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
          ${t.map(at).join("")}
        </div>
      </div>
    `,Q(e),nt(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(A),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(f.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>F(e)))}}const ue=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function M(e,t){return e==null?"—":t?`${ue.format(e)} €`:ue.format(e)}function it(e,t,a){const n=Ce.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${M(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${M(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${M(a.min,n)} – ${M(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function st(e,t,a,n){const s=t.reduce((d,r)=>d+r.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      ${t.map(d=>{const r=s>0?Math.round(d.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${o(Ie(a,n,d.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${r}%"></div></div>
              <span class="admin-band-count">${d.count} (${r}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function ot(e,t){const a=e==="quiz"?Te:Pe;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,d])=>it(a[s]??s,s,d)).join("")}
        ${Object.entries(t.categorical).map(([s,d])=>st(a[s]??s,d,e,s)).join("")}
      </div>
    </section>
  `}async function $e(e){f.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=H(S),a=g==="solicitud"||g==="quiz"||g==="pingtree"?[g]:["quiz","solicitud","pingtree"];try{const n=await Promise.all(a.map(s=>Ke(e,t,s)));f.innerHTML=`
      <div class="admin-shell">
        ${W("fieldstats")}

        ${te(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,d)=>ot(s,n[d])).join("")}
      </div>
    `,Q(e),ae(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(A),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(f.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$e(e)))}}const me=sessionStorage.getItem(A);me?C(me):q();
