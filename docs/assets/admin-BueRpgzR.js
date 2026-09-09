import{C as le,c as ue}from"./validation-DnU8phWm.js";import{q as me}from"./questions-D4Dn-9Ya.js";import{W as ee}from"./witmeQuestions-D841kSbQ.js";const G={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(le.map(e=>[e.id,e.name]))};function B(e){if(e in G)return G[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function te(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(s=>[s.value,s.label])));return t}const pe=te(me),be=te(ee),ge={si:"Sí",no:"No"};function _e(e,t,a){const s=e==="solicitud"?be[t]:pe[t];return(s==null?void 0:s[a])??ge[a]??a}const fe={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},ve={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},he=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),$e="https://pgyaigdsedkdqvhtexrz.supabase.co",ye="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=ue($e,ye),L="cs_admin_pw",v=document.getElementById("admin-root");function ae(e){return e.toISOString().slice(0,10)}const ne=new Date;let h="all",j=ae(ne),z=ae(ne),_="all";const R=25;let f=0;const M=25;let E=0,x="dashboard";const Se={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},H={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function N(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${j}T00:00:00`),s=new Date(`${z}T23:59:59.999`);return a.getTime()>s.getTime()?{since:s.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:s.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const Z=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function Ee(e,t){return e==="all"?"Todo el histórico":`${Z.format(new Date(t.since))} – ${Z.format(new Date(t.until))}`}const ke=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],we=ee.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),Y=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function r(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function A(e){return e==="all"?null:e}async function se(e,t,a){const{data:s,error:n}=await b.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:A(a)}).single();if(n||!s)throw n??new Error("No data");return s}async function Le(e,t,a){const{data:s,error:n}=await b.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:A(a)}).single();if(n||!s)throw n??new Error("No data");return s}async function Ie(e,t,a){const{data:s,error:n}=await b.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:A(a)});if(n)throw n;return s??[]}async function Te(e,t,a,s){const{data:n,error:o}=await b.rpc("admin_list_leads",{p_password:e,p_limit:R,p_offset:s*R,p_since:t.since,p_until:t.until,p_source:A(a)});if(o)throw o;return n??[]}async function Ce(e,t){const{data:a,error:s}=await b.rpc("admin_get_witme_applications",{p_password:e,p_limit:M,p_offset:t*M});if(s)throw s;return a??[]}async function Ae(e){const{data:t,error:a}=await b.rpc("admin_get_witme_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}function C(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}async function Oe(e,t,a){const{data:s,error:n}=await b.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:A(a)});if(n)throw n;return s??[]}let ie=[];async function qe(e){const{data:t,error:a}=await b.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function De(e,t,a,s,n){const{error:o}=await b.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:s,p_active:n});if(o)throw o}async function Pe(e,t){const{error:a}=await b.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function je(e){const{error:t}=await b.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function ze(e,t,a){const{data:s,error:n}=await b.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(n)throw n;return s}function I(e){v.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${r(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await se(a,N("all"),"all"),sessionStorage.setItem(L,a),k(a)}catch{I("Contraseña incorrecta.")}})}function m(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function q(e,t,a,s){const n=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${s}" style="width:${n}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function J(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function Fe(e,t,a){var g;const s=new Map(t.map(u=>[u.question_key,Number(u.reached)])),n=e.engaged_visits;let o="",d=(g=a[0])==null?void 0:g.key;return a.forEach((u,$)=>{const c=s.get(u.key)??0,p=n>0?Math.round(c/n*100):0;let l="";if($>0&&!u.conditional){const y=s.get(d)??0;if(y>0){const S=Math.round((1-c/y)*100),O=S>=25?"high":S>=10?"mid":"low";l=S>0?`<span class="funnel-drop funnel-drop-${O}">-${S}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${$+1}. ${r(u.label)}${u.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${c} · ${p}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${p}%"></div></div>
        ${l}
      </div>
    `,u.conditional||(d=u.key)}),o}function k(e){x==="scoring"?F(e):x==="fieldstats"?de(e):w(e)}function W(e){return`
    <header class="admin-header">
      <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
      <div class="admin-header-actions">
        <div class="admin-tabs">
          <button class="admin-tab-btn ${e==="dashboard"?"active":""}" data-tab="dashboard">Dashboard</button>
          <button class="admin-tab-btn ${e==="scoring"?"active":""}" data-tab="scoring">Algoritmo de scoring</button>
          <button class="admin-tab-btn ${e==="fieldstats"?"active":""}" data-tab="fieldstats">Estadísticas</button>
        </div>
        <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
        <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
      </div>
    </header>
  `}function Q(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{x=t.dataset.tab,k(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>k(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(L),I()})}function oe(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(H).map(t=>`<button class="admin-period-btn ${_===t?"active":""}" data-source="${t}">${H[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${h==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${h==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${h==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${h==="custom"?"active":""}">
        <input type="date" id="period-from" value="${j}" />
        <span>–</span>
        <input type="date" id="period-to" value="${z}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${r(Ee(h,e))}</p>
    </section>
  `}function re(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{_=a.dataset.source,f=0,k(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{h=a.dataset.preset,f=0,k(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{j=document.getElementById("period-from").value||j,z=document.getElementById("period-to").value||z,h="custom",f=0,k(e)})}async function w(e){var a,s;v.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=N(h);try{const[n,o,d,g,u,$,c]=await Promise.all([se(e,t,_),Te(e,t,_,f),Le(e,t,_),Ie(e,t,_),Ce(e,E),Oe(e,t,_),Ae(e)]),p=n.band_excelente+n.band_bueno+n.band_regular+n.band_bajo,l=_==="solicitud"?we:ke,y=((a=o[0])==null?void 0:a.total_count)??0,S=Math.max(1,Math.ceil(y/R)),O=((s=u[0])==null?void 0:s.total_count)??0,U=Math.max(1,Math.ceil(O/M));v.innerHTML=`
      <div class="admin-shell">
        ${W("dashboard")}

        ${oe(t)}

        <section class="admin-stats-grid">
          ${m("Leads totales (histórico)",String(n.total_leads))}
          ${m("Leads en el periodo",String(n.period_leads))}
          ${m("Sesiones en el periodo",String(n.period_sessions))}
          ${m("Tasa de conversión",`${n.period_conversion_rate}%`)}
          ${m("Score medio (periodo)",n.avg_score!=null?String(n.avg_score):"—")}
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
            ${m("Visitas",String(d.total_visits))}
            ${m("Rebote instantáneo",`${d.bounce_rate}%`)}
            ${m("Quiz → lead",`${d.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${m("Completan el quiz",`${d.visit_to_quiz_rate}%`)}
            ${m("Dejan sus datos (lead)",`${d.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${m("Completan el quiz",`${d.engaged_to_quiz_rate}%`)}
            ${m("Dejan sus datos (lead)",`${d.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${_==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${d.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${Fe(d,g,l)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${q("Excelente",n.band_excelente,p,"band-excelente")}
          ${q("Bueno",n.band_bueno,p,"band-bueno")}
          ${q("Regular",n.band_regular,p,"band-regular")}
          ${q("Bajo",n.band_bajo,p,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${y})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Aprobación</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${o.map(i=>`
                  <tr>
                    <td>${Y.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.first_name)} ${r(i.last_name??"")}">${r(i.first_name)} ${r(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email)}">${r(i.email)}</div></td>
                    <td>${r(i.phone??"")}</td>
                    <td>${r(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${J(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${r(i.status)}</td>
                    <td>${r(H[i.source]??i.source)}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(T=>r(B(T))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${o.length===0?'<tr><td colspan="11" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${f===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${f+1} de ${S}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${f+1>=S?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${O})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${m("Tiempo medio de respuesta",C(c.avg_ms))}
            ${m("Mediana",C(c.median_ms))}
            ${m("P95",C(c.p95_ms))}
            ${m("Máximo",C(c.max_ms))}
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
                ${u.map(i=>{const T=[];i.witme_message!=null&&T.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&T.push(`Redirect URL: ${i.witme_redirect_url}`);const V=T.join(`
`);return`
                  <tr>
                    <td>${Y.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.name??"")} ${r(i.last_name??"")}">${r(i.name??"")} ${r(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email??"")}">${r(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${V?`title="${r(V)}"`:""}>${r(i.witme_status??"—")}</span></td>
                    <td>${C(i.witme_response_ms)}</td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${J(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(ce=>r(B(ce))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${u.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${E===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${E+1} de ${U}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${E+1>=U?"disabled":""}>Siguiente →</button>
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
                ${$.map(i=>`
                  <tr>
                    <td>${r(B(i.offer_id))}</td>
                    <td>${i.clicks}</td>
                  </tr>
                `).join("")}
                ${$.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,Q(e),re(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{f>0&&(f--,w(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{f++,w(e)}),document.getElementById("witme-prev-btn").addEventListener("click",()=>{E>0&&(E--,w(e))}),document.getElementById("witme-next-btn").addEventListener("click",()=>{E++,w(e)})}catch(n){const o=n instanceof Error?n.message:String(n);o.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(L),I("Tu sesión ha caducado o la contraseña ya no es válida.")):(v.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${r(o)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>w(e)))}}function Be(e,t,a){return a?`${e} +`:`${e} – ${t}`}function P(e,t,a,s,n,o,d){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${r(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${n}"
        max="${o}"
        step="${d}"
        value="${s}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${s}</span>
    </div>
  `}function Re(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return P(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((s,n)=>P(e.key,`bucket:${n}`,Be(s[0],s[1],n===a.length-1),s[2],-200,200,5)).join("")}return Object.entries(t).map(([a,s])=>P(e.key,`opt:${a}`,a,Number(s),-200,200,5)).join("")}function Me(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${r(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${r(Se[e.key]??"—")} · clave: <code>${r(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${P(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${Re(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function xe(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var n;const s=(n=a.closest(".scoring-slider-row"))==null?void 0:n.querySelector(".scoring-slider-value");s&&(s.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const s=a.dataset.saveRule,n=ie.find(l=>l.key===s),o=document.querySelector(`[data-rule-card="${s}"]`);if(!n||!o)return;const d=o.querySelector(".scoring-rule-status"),g=new Map;o.querySelectorAll("input[data-field]").forEach(l=>{g.set(l.dataset.field,l.type==="checkbox"?String(l.checked):l.value)});const u=Number(g.get("weight")),$=g.get("active")==="true",c=n.config;let p;typeof c.value=="number"&&Object.keys(c).length===1?p={value:Number(g.get("value"))}:Array.isArray(c.buckets)?p={buckets:c.buckets.map((l,y)=>[l[0],l[1],Number(g.get(`bucket:${y}`))])}:(p={},Object.keys(c).forEach(l=>{p[l]=Number(g.get(`opt:${l}`))})),a.disabled=!0,d.textContent="Guardando…",d.className="scoring-rule-status";try{await De(e,s,p,u,$),n.config=p,n.weight=u,n.active=$,d.textContent="✓ Guardado",d.className="scoring-rule-status ok",setTimeout(()=>{d.textContent=""},2500)}catch{d.textContent="Error al guardar",d.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const s=a.dataset.resetRule,n=document.querySelector(`[data-rule-card="${s}"]`);if(!n||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const o=n.querySelector(".scoring-rule-status");a.disabled=!0,o.textContent="Restaurando…",o.className="scoring-rule-status";try{await Pe(e,s),await F(e)}catch{o.textContent="Error al restaurar",o.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await je(e),await F(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function F(e){v.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await qe(e);ie=t,v.innerHTML=`
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
          ${t.map(Me).join("")}
        </div>
      </div>
    `,Q(e),xe(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(L),I("Tu sesión ha caducado o la contraseña ya no es válida.")):(v.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${r(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>F(e)))}}const K=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function D(e,t){return e==null?"—":t?`${K.format(e)} €`:K.format(e)}function He(e,t,a){const s=he.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${D(a.median,s)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${D(a.avg,s)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${D(a.min,s)} – ${D(a.max,s)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function Ne(e,t,a,s){const n=t.reduce((o,d)=>o+d.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      ${t.map(o=>{const d=n>0?Math.round(o.count/n*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${r(_e(a,s,o.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${d}%"></div></div>
              <span class="admin-band-count">${o.count} (${d}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function We(e,t){const a=e==="solicitud"?ve:fe;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([n,o])=>He(a[n]??n,n,o)).join("")}
        ${Object.entries(t.categorical).map(([n,o])=>Ne(a[n]??n,o,e,n)).join("")}
      </div>
    </section>
  `}async function de(e){v.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=N(h),a=_==="solicitud"?["solicitud"]:_==="quiz"?["quiz"]:["quiz","solicitud"];try{const s=await Promise.all(a.map(n=>ze(e,t,n)));v.innerHTML=`
      <div class="admin-shell">
        ${W("fieldstats")}

        ${oe(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((n,o)=>We(n,s[o])).join("")}
      </div>
    `,Q(e),re(e)}catch(s){const n=s instanceof Error?s.message:String(s);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(L),I("Tu sesión ha caducado o la contraseña ya no es válida.")):(v.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${r(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>de(e)))}}const X=sessionStorage.getItem(L);X?k(X):I();
