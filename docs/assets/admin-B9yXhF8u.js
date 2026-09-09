import{C as be,c as ge}from"./validation-DnU8phWm.js";import{q as _e}from"./questions-D4Dn-9Ya.js";import{W as Z,S as ie}from"./witmeQuestions-Cl8VuAk9.js";const K={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(be.map(e=>[e.id,e.name]))};function W(e){if(e in K)return K[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function oe(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const fe=oe(_e),ve=oe(Z),he={si:"Sí",no:"No"};function $e(e,t,a){const n=e==="solicitud"?ve[t]:fe[t];return(n==null?void 0:n[a])??he[a]??a}const ye={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},Se={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Ee=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),ke="https://pgyaigdsedkdqvhtexrz.supabase.co",Le="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=ge(ke,Le),T="cs_admin_pw",p=document.getElementById("admin-root");function re(e){return e.toISOString().slice(0,10)}const de=new Date;let h="all",R=re(de),z=re(de),f="all";const Q=25;let v=0;const U=25;let L=0;const V=25;let I=0,j="dashboard";const Ie={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},G={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function B(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${R}T00:00:00`),n=new Date(`${z}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const X=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function we(e,t){return e==="all"?"Todo el histórico":`${X.format(new Date(t.since))} – ${X.format(new Date(t.until))}`}const Te=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],Ce=Z.filter(e=>ie.includes(e.phase)),Ae=Z.filter(e=>!ie.includes(e.phase)),ee=e=>({key:e.key,label:e.label,conditional:!!e.condition}),qe=[...Ce.map(ee),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Ae.map(ee),{key:"application_completed",label:"✅ Termina la solicitud completa"}],N=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function O(e){return e==="all"?null:e}async function ce(e,t,a){const{data:n,error:i}=await b.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)}).single();if(i||!n)throw i??new Error("No data");return n}async function Oe(e,t,a){const{data:n,error:i}=await b.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)}).single();if(i||!n)throw i??new Error("No data");return n}async function Pe(e,t,a){const{data:n,error:i}=await b.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)});if(i)throw i;return n??[]}async function De(e,t,a,n){const{data:i,error:r}=await b.rpc("admin_list_leads",{p_password:e,p_limit:Q,p_offset:n*Q,p_since:t.since,p_until:t.until,p_source:O(a)});if(r)throw r;return i??[]}async function je(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_applications",{p_password:e,p_limit:U,p_offset:t*U});if(n)throw n;return a??[]}async function Me(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:V,p_offset:t*V});if(n)throw n;return a??[]}async function Re(e){const{data:t,error:a}=await b.rpc("admin_get_witme_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}function A(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function te(e){return e==null?"—":`${e}%`}async function ze(e,t,a){const{data:n,error:i}=await b.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:O(a)});if(i)throw i;return n??[]}let le=[];async function xe(e){const{data:t,error:a}=await b.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Be(e,t,a,n,i){const{error:r}=await b.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:i});if(r)throw r}async function Fe(e,t){const{error:a}=await b.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function He(e){const{error:t}=await b.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Ne(e,t,a){const{data:n,error:i}=await b.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(i)throw i;return n}function C(e){p.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await ce(a,B("all"),"all"),sessionStorage.setItem(T,a),w(a)}catch{C("Contraseña incorrecta.")}})}function l(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function P(e,t,a,n){const i=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${i}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function ae(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function We(e,t,a){var c;const n=new Map(t.map(u=>[u.question_key,Number(u.reached)])),i=e.engaged_visits;let r="",d=(c=a[0])==null?void 0:c.key;return a.forEach((u,y)=>{const g=n.get(u.key)??0,_=i>0?Math.round(g/i*100):0;let m="";if(y>0&&!u.conditional){const E=n.get(d)??0;if(E>0){const k=Math.round((1-g/E)*100),s=k>=25?"high":k>=10?"mid":"low";m=k>0?`<span class="funnel-drop funnel-drop-${s}">-${k}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}r+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${y+1}. ${o(u.label)}${u.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${g} · ${_}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${_}%"></div></div>
        ${m}
      </div>
    `,u.conditional||(d=u.key)}),r}function w(e){j==="scoring"?x(e):j==="fieldstats"?me(e):j==="leads"?S(e):ue(e)}function F(e){return`
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
  `}function H(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{j=t.dataset.tab,w(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>w(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(T),C()})}function Y(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(G).map(t=>`<button class="admin-period-btn ${f===t?"active":""}" data-source="${t}">${G[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${h==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${h==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${h==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${h==="custom"?"active":""}">
        <input type="date" id="period-from" value="${R}" />
        <span>–</span>
        <input type="date" id="period-to" value="${z}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(we(h,e))}</p>
    </section>
  `}function J(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{f=a.dataset.source,v=0,w(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{h=a.dataset.preset,v=0,w(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{R=document.getElementById("period-from").value||R,z=document.getElementById("period-to").value||z,h="custom",v=0,w(e)})}async function ue(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=B(h);try{const[a,n,i,r]=await Promise.all([ce(e,t,f),Oe(e,t,f),Pe(e,t,f),ze(e,t,f)]),d=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,c=f==="solicitud"?qe:Te;p.innerHTML=`
      <div class="admin-shell">
        ${F("dashboard")}

        ${Y(t)}

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
          ${f==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${n.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${We(n,i,c)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${P("Excelente",a.band_excelente,d,"band-excelente")}
          ${P("Bueno",a.band_bueno,d,"band-bueno")}
          ${P("Regular",a.band_regular,d,"band-regular")}
          ${P("Bajo",a.band_bajo,d,"band-bajo")}
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
                ${r.map(u=>`
                  <tr>
                    <td>${o(W(u.offer_id))}</td>
                    <td>${u.clicks}</td>
                  </tr>
                `).join("")}
                ${r.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,H(e),J(e)}catch(a){const n=a instanceof Error?a.message:String(a);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(T),C("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>ue(e)))}}async function S(e){var a,n,i;p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=B(h);try{const[r,d,c,u]=await Promise.all([De(e,t,f,v),je(e,L),Re(e),Me(e,I)]),y=((a=r[0])==null?void 0:a.total_count)??0,g=Math.max(1,Math.ceil(y/Q)),_=((n=d[0])==null?void 0:n.total_count)??0,m=Math.max(1,Math.ceil(_/U)),E=((i=u[0])==null?void 0:i.total_count)??0,k=Math.max(1,Math.ceil(E/V));p.innerHTML=`
      <div class="admin-shell">
        ${F("leads")}

        ${Y(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${y})</p>
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
                ${r.map(s=>`
                  <tr>
                    <td>${N.format(new Date(s.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(s.first_name)} ${o(s.last_name??"")}">${o(s.first_name)} ${o(s.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(s.email)}">${o(s.email)}</div></td>
                    <td>${o(s.phone??"")}</td>
                    <td>${o(s.zip_code??"")}</td>
                    <td>${s.score??"—"}</td>
                    <td><span class="admin-badge band-${s.score_band??""}">${s.score_band??"—"}</span></td>
                    <td>${s.approval_probability!=null?`<span class="admin-badge ${ae(s.approval_probability)}">${s.approval_probability}%</span>`:"—"}</td>
                    <td>${o(s.status)}</td>
                    <td>${o(G[s.source]??s.source)}</td>
                    <td>${s.source!=="solicitud"?'<span title="El quiz corto no envía a Witme">n/a</span>':s.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${s.offer_clicks&&s.offer_clicks.length>0?s.offer_clicks.map($=>o(W($))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${r.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${v===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${v+1} de ${g}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${v+1>=g?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${_})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Tiempo medio de respuesta",A(c.avg_ms))}
            ${l("Mediana",A(c.median_ms))}
            ${l("P95",A(c.p95_ms))}
            ${l("Máximo",A(c.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("% Aceptados (con oferta)",te(c.pct_accepted))}
            ${l("% Rechazados por Witme",te(c.pct_failed))}
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
                ${d.map(s=>{const $=[];s.witme_message!=null&&$.push(`Mensaje: ${JSON.stringify(s.witme_message)}`),s.witme_redirect_url&&$.push(`Redirect URL: ${s.witme_redirect_url}`);const q=$.join(`
`);return`
                  <tr>
                    <td>${N.format(new Date(s.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(s.name??"")} ${o(s.last_name??"")}">${o(s.name??"")} ${o(s.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(s.email??"")}">${o(s.email??"")}</div></td>
                    <td>${s.requested_amount!=null?`${s.requested_amount} €`:"—"}</td>
                    <td>${s.witme_id??"—"}</td>
                    <td><span class="admin-badge ${s.witme_status==="processed"?"band-excelente":"band-bajo"}" ${q?`title="${o(q)}"`:""}>${o(s.witme_status??"—")}</span></td>
                    <td>${A(s.witme_response_ms)}</td>
                    <td>${s.score??"—"}</td>
                    <td>${s.approval_probability!=null?`<span class="admin-badge ${ae(s.approval_probability)}">${s.approval_probability}%</span>`:"—"}</td>
                    <td>${s.offer_clicks&&s.offer_clicks.length>0?`✅ ${s.offer_clicks.map(pe=>o(W(pe))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${d.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${L===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${L+1} de ${m}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${L+1>=m?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche (${E})</p>
          <p class="admin-card-sub">
            Producto nuevo en pruebas (endpoint <code>servy-form-wait</code>), en paralelo
            al de siempre - solo para lenders con coche propio. De momento solo se registra
            aquí para comparar resultados; no se muestra ninguna oferta de aquí al usuario
            todavía.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th><th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                ${u.map(s=>{const $=[];s.witme_message!=null&&$.push(`Mensaje: ${JSON.stringify(s.witme_message)}`),s.witme_redirect_url&&$.push(`Redirect URL: ${s.witme_redirect_url}`);const q=$.join(`
`);return`
                  <tr>
                    <td>${N.format(new Date(s.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(s.name??"")} ${o(s.last_name??"")}">${o(s.name??"")} ${o(s.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(s.email??"")}">${o(s.email??"")}</div></td>
                    <td>${s.requested_amount!=null?`${s.requested_amount} €`:"—"}</td>
                    <td>${s.witme_id??"—"}</td>
                    <td><span class="admin-badge ${s.witme_status==="processed"?"band-excelente":"band-bajo"}" ${q?`title="${o(q)}"`:""}>${o(s.witme_status??"—")}</span></td>
                    <td>${A(s.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${u.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de aval coche.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${I===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${I+1} de ${k}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${I+1>=k?"disabled":""}>Siguiente →</button>
          </div>
        </section>
      </div>
    `,H(e),J(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{v>0&&(v--,S(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{v++,S(e)}),document.getElementById("witme-prev-btn").addEventListener("click",()=>{L>0&&(L--,S(e))}),document.getElementById("witme-next-btn").addEventListener("click",()=>{L++,S(e)}),document.getElementById("witme-car-prev-btn").addEventListener("click",()=>{I>0&&(I--,S(e))}),document.getElementById("witme-car-next-btn").addEventListener("click",()=>{I++,S(e)})}catch(r){const d=r instanceof Error?r.message:String(r);d.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(T),C("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(d)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>S(e)))}}function Qe(e,t,a){return a?`${e} +`:`${e} – ${t}`}function M(e,t,a,n,i,r,d){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${o(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${i}"
        max="${r}"
        step="${d}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function Ue(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return M(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,i)=>M(e.key,`bucket:${i}`,Qe(n[0],n[1],i===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>M(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function Ve(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${o(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${o(Ie[e.key]??"—")} · clave: <code>${o(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${M(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${Ue(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function Ge(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var i;const n=(i=a.closest(".scoring-slider-row"))==null?void 0:i.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,i=le.find(m=>m.key===n),r=document.querySelector(`[data-rule-card="${n}"]`);if(!i||!r)return;const d=r.querySelector(".scoring-rule-status"),c=new Map;r.querySelectorAll("input[data-field]").forEach(m=>{c.set(m.dataset.field,m.type==="checkbox"?String(m.checked):m.value)});const u=Number(c.get("weight")),y=c.get("active")==="true",g=i.config;let _;typeof g.value=="number"&&Object.keys(g).length===1?_={value:Number(c.get("value"))}:Array.isArray(g.buckets)?_={buckets:g.buckets.map((m,E)=>[m[0],m[1],Number(c.get(`bucket:${E}`))])}:(_={},Object.keys(g).forEach(m=>{_[m]=Number(c.get(`opt:${m}`))})),a.disabled=!0,d.textContent="Guardando…",d.className="scoring-rule-status";try{await Be(e,n,_,u,y),i.config=_,i.weight=u,i.active=y,d.textContent="✓ Guardado",d.className="scoring-rule-status ok",setTimeout(()=>{d.textContent=""},2500)}catch{d.textContent="Error al guardar",d.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,i=document.querySelector(`[data-rule-card="${n}"]`);if(!i||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const r=i.querySelector(".scoring-rule-status");a.disabled=!0,r.textContent="Restaurando…",r.className="scoring-rule-status";try{await Fe(e,n),await x(e)}catch{r.textContent="Error al restaurar",r.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await He(e),await x(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function x(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await xe(e);le=t,p.innerHTML=`
      <div class="admin-shell">
        ${F("scoring")}

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
          ${t.map(Ve).join("")}
        </div>
      </div>
    `,H(e),Ge(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(T),C("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>x(e)))}}const ne=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function D(e,t){return e==null?"—":t?`${ne.format(e)} €`:ne.format(e)}function Ze(e,t,a){const n=Ee.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${D(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${D(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${D(a.min,n)} – ${D(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function Ye(e,t,a,n){const i=t.reduce((r,d)=>r+d.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      ${t.map(r=>{const d=i>0?Math.round(r.count/i*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${o($e(a,n,r.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${d}%"></div></div>
              <span class="admin-band-count">${r.count} (${d}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function Je(e,t){const a=e==="solicitud"?Se:ye;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([i,r])=>Ze(a[i]??i,i,r)).join("")}
        ${Object.entries(t.categorical).map(([i,r])=>Ye(a[i]??i,r,e,i)).join("")}
      </div>
    </section>
  `}async function me(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=B(h),a=f==="solicitud"?["solicitud"]:f==="quiz"?["quiz"]:["quiz","solicitud"];try{const n=await Promise.all(a.map(i=>Ne(e,t,i)));p.innerHTML=`
      <div class="admin-shell">
        ${F("fieldstats")}

        ${Y(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((i,r)=>Je(i,n[r])).join("")}
      </div>
    `,H(e),J(e)}catch(n){const i=n instanceof Error?n.message:String(n);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(T),C("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>me(e)))}}const se=sessionStorage.getItem(T);se?w(se):C();
