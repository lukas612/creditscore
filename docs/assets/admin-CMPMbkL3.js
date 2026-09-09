import{C as ce,c as le}from"./validation-DnU8phWm.js";import{q as ue}from"./questions-D4Dn-9Ya.js";import{W as N,S as ee}from"./witmeQuestions-Cl8VuAk9.js";const U={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(ce.map(e=>[e.id,e.name]))};function F(e){if(e in U)return U[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function te(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const me=te(ue),pe=te(N),be={si:"Sí",no:"No"};function ge(e,t,a){const n=e==="solicitud"?pe[t]:me[t];return(n==null?void 0:n[a])??be[a]??a}const _e={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},fe={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},ve=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),he="https://pgyaigdsedkdqvhtexrz.supabase.co",$e="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",g=le(he,$e),E="cs_admin_pw",p=document.getElementById("admin-root");function ae(e){return e.toISOString().slice(0,10)}const ne=new Date;let v="all",D=ae(ne),P=ae(ne),_="all";const H=25;let f=0;const M=25;let y=0,O="dashboard";const ye={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},x={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function j(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${D}T00:00:00`),n=new Date(`${P}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const V=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function Se(e,t){return e==="all"?"Todo el histórico":`${V.format(new Date(t.since))} – ${V.format(new Date(t.until))}`}const Ee=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],ke=N.filter(e=>ee.includes(e.phase)),Le=N.filter(e=>!ee.includes(e.phase)),G=e=>({key:e.key,label:e.label,conditional:!!e.condition}),we=[...ke.map(G),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Le.map(G),{key:"application_completed",label:"✅ Termina la solicitud completa"}],Y=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function d(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function T(e){return e==="all"?null:e}async function se(e,t,a){const{data:n,error:s}=await g.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:T(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function Ie(e,t,a){const{data:n,error:s}=await g.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:T(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function Te(e,t,a){const{data:n,error:s}=await g.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:T(a)});if(s)throw s;return n??[]}async function Ce(e,t,a,n){const{data:s,error:o}=await g.rpc("admin_list_leads",{p_password:e,p_limit:H,p_offset:n*H,p_since:t.since,p_until:t.until,p_source:T(a)});if(o)throw o;return s??[]}async function Ae(e,t){const{data:a,error:n}=await g.rpc("admin_get_witme_applications",{p_password:e,p_limit:M,p_offset:t*M});if(n)throw n;return a??[]}async function Oe(e){const{data:t,error:a}=await g.rpc("admin_get_witme_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}function I(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function Z(e){return e==null?"—":`${e}%`}async function qe(e,t,a){const{data:n,error:s}=await g.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:T(a)});if(s)throw s;return n??[]}let ie=[];async function De(e){const{data:t,error:a}=await g.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Pe(e,t,a,n,s){const{error:o}=await g.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:s});if(o)throw o}async function ze(e,t){const{error:a}=await g.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function je(e){const{error:t}=await g.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Re(e,t,a){const{data:n,error:s}=await g.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return n}function k(e){p.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${d(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await se(a,j("all"),"all"),sessionStorage.setItem(E,a),S(a)}catch{k("Contraseña incorrecta.")}})}function l(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function C(e,t,a,n){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function J(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function Be(e,t,a){var m;const n=new Map(t.map(u=>[u.question_key,Number(u.reached)])),s=e.engaged_visits;let o="",r=(m=a[0])==null?void 0:m.key;return a.forEach((u,h)=>{const b=n.get(u.key)??0,i=s>0?Math.round(b/s*100):0;let c="";if(h>0&&!u.conditional){const $=n.get(r)??0;if($>0){const L=Math.round((1-b/$)*100),de=L>=25?"high":L>=10?"mid":"low";c=L>0?`<span class="funnel-drop funnel-drop-${de}">-${L}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${h+1}. ${d(u.label)}${u.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${b} · ${i}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${i}%"></div></div>
        ${c}
      </div>
    `,u.conditional||(r=u.key)}),o}function S(e){O==="scoring"?z(e):O==="fieldstats"?re(e):O==="leads"?w(e):oe(e)}function R(e){return`
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
  `}function B(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{O=t.dataset.tab,S(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>S(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(E),k()})}function W(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(x).map(t=>`<button class="admin-period-btn ${_===t?"active":""}" data-source="${t}">${x[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${v==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${v==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${v==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${v==="custom"?"active":""}">
        <input type="date" id="period-from" value="${D}" />
        <span>–</span>
        <input type="date" id="period-to" value="${P}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${d(Se(v,e))}</p>
    </section>
  `}function Q(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{_=a.dataset.source,f=0,S(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{v=a.dataset.preset,f=0,S(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{D=document.getElementById("period-from").value||D,P=document.getElementById("period-to").value||P,v="custom",f=0,S(e)})}async function oe(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(v);try{const[a,n,s,o]=await Promise.all([se(e,t,_),Ie(e,t,_),Te(e,t,_),qe(e,t,_)]),r=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,m=_==="solicitud"?we:Ee;p.innerHTML=`
      <div class="admin-shell">
        ${R("dashboard")}

        ${W(t)}

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
          ${_==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${n.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${Be(n,s,m)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${C("Excelente",a.band_excelente,r,"band-excelente")}
          ${C("Bueno",a.band_bueno,r,"band-bueno")}
          ${C("Regular",a.band_regular,r,"band-regular")}
          ${C("Bajo",a.band_bajo,r,"band-bajo")}
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
                ${o.map(u=>`
                  <tr>
                    <td>${d(F(u.offer_id))}</td>
                    <td>${u.clicks}</td>
                  </tr>
                `).join("")}
                ${o.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,B(e),Q(e)}catch(a){const n=a instanceof Error?a.message:String(a);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${d(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>oe(e)))}}async function w(e){var a,n;p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(v);try{const[s,o,r]=await Promise.all([Ce(e,t,_,f),Ae(e,y),Oe(e)]),m=((a=s[0])==null?void 0:a.total_count)??0,u=Math.max(1,Math.ceil(m/H)),h=((n=o[0])==null?void 0:n.total_count)??0,b=Math.max(1,Math.ceil(h/M));p.innerHTML=`
      <div class="admin-shell">
        ${R("leads")}

        ${W(t)}

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
                ${s.map(i=>`
                  <tr>
                    <td>${Y.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${d(i.first_name)} ${d(i.last_name??"")}">${d(i.first_name)} ${d(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${d(i.email)}">${d(i.email)}</div></td>
                    <td>${d(i.phone??"")}</td>
                    <td>${d(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${J(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${d(i.status)}</td>
                    <td>${d(x[i.source]??i.source)}</td>
                    <td>${i.source!=="solicitud"?'<span title="El quiz corto no envía a Witme">n/a</span>':i.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(c=>d(F(c))).join(", "):"—"}</td>
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
          <p class="admin-card-title">Solicitudes enviadas a Witme (${h})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("Tiempo medio de respuesta",I(r.avg_ms))}
            ${l("Mediana",I(r.median_ms))}
            ${l("P95",I(r.p95_ms))}
            ${l("Máximo",I(r.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${l("% Aceptados (con oferta)",Z(r.pct_accepted))}
            ${l("% Rechazados por Witme",Z(r.pct_failed))}
            ${l("Con oferta",String(r.count_accepted))}
            ${l("Total solicitudes",String(r.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${r.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${r.count_error} terminaron
            en error de conexión con Witme${r.count_timeout>0?` y ${r.count_timeout} en timeout (de cuando sí cortábamos a los 20s)`:""}.
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
                ${o.map(i=>{const c=[];i.witme_message!=null&&c.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&c.push(`Redirect URL: ${i.witme_redirect_url}`);const $=c.join(`
`);return`
                  <tr>
                    <td>${Y.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${d(i.name??"")} ${d(i.last_name??"")}">${d(i.name??"")} ${d(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${d(i.email??"")}">${d(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${$?`title="${d($)}"`:""}>${d(i.witme_status??"—")}</span></td>
                    <td>${I(i.witme_response_ms)}</td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${J(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(L=>d(F(L))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${o.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${y===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${y+1} de ${b}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${y+1>=b?"disabled":""}>Siguiente →</button>
          </div>
        </section>
      </div>
    `,B(e),Q(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{f>0&&(f--,w(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{f++,w(e)}),document.getElementById("witme-prev-btn").addEventListener("click",()=>{y>0&&(y--,w(e))}),document.getElementById("witme-next-btn").addEventListener("click",()=>{y++,w(e)})}catch(s){const o=s instanceof Error?s.message:String(s);o.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${d(o)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>w(e)))}}function Fe(e,t,a){return a?`${e} +`:`${e} – ${t}`}function q(e,t,a,n,s,o,r){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${d(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${o}"
        step="${r}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function He(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return q(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,s)=>q(e.key,`bucket:${s}`,Fe(n[0],n[1],s===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>q(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function Me(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${d(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${d(ye[e.key]??"—")} · clave: <code>${d(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${q(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${He(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function xe(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const n=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,s=ie.find(c=>c.key===n),o=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!o)return;const r=o.querySelector(".scoring-rule-status"),m=new Map;o.querySelectorAll("input[data-field]").forEach(c=>{m.set(c.dataset.field,c.type==="checkbox"?String(c.checked):c.value)});const u=Number(m.get("weight")),h=m.get("active")==="true",b=s.config;let i;typeof b.value=="number"&&Object.keys(b).length===1?i={value:Number(m.get("value"))}:Array.isArray(b.buckets)?i={buckets:b.buckets.map((c,$)=>[c[0],c[1],Number(m.get(`bucket:${$}`))])}:(i={},Object.keys(b).forEach(c=>{i[c]=Number(m.get(`opt:${c}`))})),a.disabled=!0,r.textContent="Guardando…",r.className="scoring-rule-status";try{await Pe(e,n,i,u,h),s.config=i,s.weight=u,s.active=h,r.textContent="✓ Guardado",r.className="scoring-rule-status ok",setTimeout(()=>{r.textContent=""},2500)}catch{r.textContent="Error al guardar",r.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const o=s.querySelector(".scoring-rule-status");a.disabled=!0,o.textContent="Restaurando…",o.className="scoring-rule-status";try{await ze(e,n),await z(e)}catch{o.textContent="Error al restaurar",o.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await je(e),await z(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function z(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await De(e);ie=t,p.innerHTML=`
      <div class="admin-shell">
        ${R("scoring")}

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
          ${t.map(Me).join("")}
        </div>
      </div>
    `,B(e),xe(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${d(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>z(e)))}}const K=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function A(e,t){return e==null?"—":t?`${K.format(e)} €`:K.format(e)}function Ne(e,t,a){const n=ve.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${d(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${A(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${A(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${A(a.min,n)} – ${A(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function We(e,t,a,n){const s=t.reduce((o,r)=>o+r.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${d(e)}</p>
      ${t.map(o=>{const r=s>0?Math.round(o.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${d(ge(a,n,o.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${r}%"></div></div>
              <span class="admin-band-count">${o.count} (${r}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function Qe(e,t){const a=e==="solicitud"?fe:_e;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,o])=>Ne(a[s]??s,s,o)).join("")}
        ${Object.entries(t.categorical).map(([s,o])=>We(a[s]??s,o,e,s)).join("")}
      </div>
    </section>
  `}async function re(e){p.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=j(v),a=_==="solicitud"?["solicitud"]:_==="quiz"?["quiz"]:["quiz","solicitud"];try{const n=await Promise.all(a.map(s=>Re(e,t,s)));p.innerHTML=`
      <div class="admin-shell">
        ${R("fieldstats")}

        ${W(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,o)=>Qe(s,n[o])).join("")}
      </div>
    `,B(e),Q(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):(p.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${d(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>re(e)))}}const X=sessionStorage.getItem(E);X?S(X):k();
