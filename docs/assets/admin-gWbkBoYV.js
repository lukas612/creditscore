import{C as te,c as ae}from"./validation-DnU8phWm.js";import{q as ne}from"./questions-D4Dn-9Ya.js";import{W as V}from"./witmeQuestions-D841kSbQ.js";const z={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(te.map(e=>[e.id,e.name]))};function W(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const se=W(ne),ie=W(V),oe={si:"Sí",no:"No"};function re(e,t,a){const n=e==="solicitud"?ie[t]:se[t];return(n==null?void 0:n[a])??oe[a]??a}const de={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},ce={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},le=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),ue="https://pgyaigdsedkdqvhtexrz.supabase.co",me="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",_=ae(ue,me),E="cs_admin_pw",$=document.getElementById("admin-root");function G(e){return e.toISOString().slice(0,10)}const Y=new Date;let y="all",A=G(Y),q=G(Y),g="all";const j=25;let h=0,F="dashboard";const pe={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},B={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function H(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${A}T00:00:00`),n=new Date(`${q}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const N=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function be(e,t){return e==="all"?"Todo el histórico":`${N.format(new Date(t.since))} – ${N.format(new Date(t.until))}`}const ge=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],_e=V.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),M=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function r(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function L(e){return e==="all"?null:e}async function Z(e,t,a){const{data:n,error:s}=await _.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:L(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function fe(e,t,a){const{data:n,error:s}=await _.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:L(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function ve(e,t,a){const{data:n,error:s}=await _.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:L(a)});if(s)throw s;return n??[]}async function he(e,t,a,n){const{data:s,error:o}=await _.rpc("admin_list_leads",{p_password:e,p_limit:j,p_offset:n*j,p_since:t.since,p_until:t.until,p_source:L(a)});if(o)throw o;return s??[]}async function $e(e){const{data:t,error:a}=await _.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(a)throw a;return t??[]}async function ye(e,t,a){const{data:n,error:s}=await _.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:L(a)});if(s)throw s;return n??[]}let J=[];async function Se(e){const{data:t,error:a}=await _.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Ee(e,t,a,n,s){const{error:o}=await _.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:s});if(o)throw o}async function ke(e,t){const{error:a}=await _.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function Le(e){const{error:t}=await _.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Ie(e,t,a){const{data:n,error:s}=await _.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return n}function k(e){$.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${r(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await Z(a,H("all"),"all"),sessionStorage.setItem(E,a),S(a)}catch{k("Contraseña incorrecta.")}})}function p(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function w(e,t,a,n){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function x(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function we(e,t,a){var u;const n=new Map(t.map(l=>[l.question_key,Number(l.reached)])),s=e.engaged_visits;let o="",d=(u=a[0])==null?void 0:u.key;return a.forEach((l,f)=>{const b=n.get(l.key)??0,m=s>0?Math.round(b/s*100):0;let c="";if(f>0&&!l.conditional){const i=n.get(d)??0;if(i>0){const v=Math.round((1-b/i)*100),I=v>=25?"high":v>=10?"mid":"low";c=v>0?`<span class="funnel-drop funnel-drop-${I}">-${v}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${f+1}. ${r(l.label)}${l.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${b} · ${m}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${m}%"></div></div>
        ${c}
      </div>
    `,l.conditional||(d=l.key)}),o}function S(e){F==="scoring"?D(e):F==="fieldstats"?ee(e):C(e)}function P(e){return`
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
  `}function R(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{F=t.dataset.tab,S(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>S(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(E),k()})}function K(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(B).map(t=>`<button class="admin-period-btn ${g===t?"active":""}" data-source="${t}">${B[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${y==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${y==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${y==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${y==="custom"?"active":""}">
        <input type="date" id="period-from" value="${A}" />
        <span>–</span>
        <input type="date" id="period-to" value="${q}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${r(be(y,e))}</p>
    </section>
  `}function X(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{g=a.dataset.source,h=0,S(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{y=a.dataset.preset,h=0,S(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{A=document.getElementById("period-from").value||A,q=document.getElementById("period-to").value||q,y="custom",h=0,S(e)})}async function C(e){var a;$.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=H(y);try{const[n,s,o,d,u,l]=await Promise.all([Z(e,t,g),he(e,t,g,h),fe(e,t,g),ve(e,t,g),$e(e),ye(e,t,g)]),f=n.band_excelente+n.band_bueno+n.band_regular+n.band_bajo,b=g==="solicitud"?_e:ge,m=((a=s[0])==null?void 0:a.total_count)??0,c=Math.max(1,Math.ceil(m/j));$.innerHTML=`
      <div class="admin-shell">
        ${P("dashboard")}

        ${K(t)}

        <section class="admin-stats-grid">
          ${p("Leads totales (histórico)",String(n.total_leads))}
          ${p("Leads en el periodo",String(n.period_leads))}
          ${p("Sesiones en el periodo",String(n.period_sessions))}
          ${p("Tasa de conversión",`${n.period_conversion_rate}%`)}
          ${p("Score medio (periodo)",n.avg_score!=null?String(n.avg_score):"—")}
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
            ${p("Visitas",String(o.total_visits))}
            ${p("Rebote instantáneo",`${o.bounce_rate}%`)}
            ${p("Quiz → lead",`${o.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${p("Completan el quiz",`${o.visit_to_quiz_rate}%`)}
            ${p("Dejan sus datos (lead)",`${o.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${p("Completan el quiz",`${o.engaged_to_quiz_rate}%`)}
            ${p("Dejan sus datos (lead)",`${o.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${g==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${o.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${we(o,d,b)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${w("Excelente",n.band_excelente,f,"band-excelente")}
          ${w("Bueno",n.band_bueno,f,"band-bueno")}
          ${w("Regular",n.band_regular,f,"band-regular")}
          ${w("Bajo",n.band_bajo,f,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${m})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Aprobación</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${s.map(i=>`
                  <tr>
                    <td>${M.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.first_name)} ${r(i.last_name??"")}">${r(i.first_name)} ${r(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email)}">${r(i.email)}</div></td>
                    <td>${r(i.phone??"")}</td>
                    <td>${r(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${x(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${r(i.status)}</td>
                    <td>${r(B[i.source]??i.source)}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(v=>r(z[v]??v)).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${s.length===0?'<tr><td colspan="11" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${h===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${h+1} de ${c}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${h+1>=c?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${u.length})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Importe</th>
                  <th>Witme ID</th><th>Estado</th>
                  <th>Score</th><th>Aprobación</th><th>Click oferta</th><th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                ${u.map(i=>{const v=JSON.stringify(i.witme_message??"");return`
                  <tr>
                    <td>${M.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${r(i.name??"")} ${r(i.last_name??"")}">${r(i.name??"")} ${r(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${r(i.email??"")}">${r(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}">${r(i.witme_status??"—")}</span></td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${x(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(I=>r(z[I]??I)).join(", ")}`:"—"}</td>
                    <td><div class="admin-table-message-cell" title="${r(v)}">${r(v)}</div></td>
                  </tr>
                `}).join("")}
                ${u.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
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
                ${l.map(i=>`
                  <tr>
                    <td>${r(z[i.offer_id]??i.offer_id)}</td>
                    <td>${i.clicks}</td>
                  </tr>
                `).join("")}
                ${l.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,R(e),X(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{h>0&&(h--,C(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{h++,C(e)})}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):($.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${r(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>C(e)))}}function Te(e,t,a){return a?`${e} +`:`${e} – ${t}`}function O(e,t,a,n,s,o,d){return`
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
  `}function Ce(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return O(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,s)=>O(e.key,`bucket:${s}`,Te(n[0],n[1],s===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>O(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function Oe(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${r(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${r(pe[e.key]??"—")} · clave: <code>${r(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${O(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${Ce(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function Ae(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const n=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,s=J.find(c=>c.key===n),o=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!o)return;const d=o.querySelector(".scoring-rule-status"),u=new Map;o.querySelectorAll("input[data-field]").forEach(c=>{u.set(c.dataset.field,c.type==="checkbox"?String(c.checked):c.value)});const l=Number(u.get("weight")),f=u.get("active")==="true",b=s.config;let m;typeof b.value=="number"&&Object.keys(b).length===1?m={value:Number(u.get("value"))}:Array.isArray(b.buckets)?m={buckets:b.buckets.map((c,i)=>[c[0],c[1],Number(u.get(`bucket:${i}`))])}:(m={},Object.keys(b).forEach(c=>{m[c]=Number(u.get(`opt:${c}`))})),a.disabled=!0,d.textContent="Guardando…",d.className="scoring-rule-status";try{await Ee(e,n,m,l,f),s.config=m,s.weight=l,s.active=f,d.textContent="✓ Guardado",d.className="scoring-rule-status ok",setTimeout(()=>{d.textContent=""},2500)}catch{d.textContent="Error al guardar",d.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const o=s.querySelector(".scoring-rule-status");a.disabled=!0,o.textContent="Restaurando…",o.className="scoring-rule-status";try{await ke(e,n),await D(e)}catch{o.textContent="Error al restaurar",o.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await Le(e),await D(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function D(e){$.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await Se(e);J=t,$.innerHTML=`
      <div class="admin-shell">
        ${P("scoring")}

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
          ${t.map(Oe).join("")}
        </div>
      </div>
    `,R(e),Ae(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):($.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${r(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>D(e)))}}const Q=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function T(e,t){return e==null?"—":t?`${Q.format(e)} €`:Q.format(e)}function qe(e,t,a){const n=le.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${T(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${T(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${T(a.min,n)} – ${T(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function De(e,t,a,n){const s=t.reduce((o,d)=>o+d.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${r(e)}</p>
      ${t.map(o=>{const d=s>0?Math.round(o.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${r(re(a,n,o.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${d}%"></div></div>
              <span class="admin-band-count">${o.count} (${d}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function ze(e,t){const a=e==="solicitud"?ce:de;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,o])=>qe(a[s]??s,s,o)).join("")}
        ${Object.entries(t.categorical).map(([s,o])=>De(a[s]??s,o,e,s)).join("")}
      </div>
    </section>
  `}async function ee(e){$.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=H(y),a=g==="solicitud"?["solicitud"]:g==="quiz"?["quiz"]:["quiz","solicitud"];try{const n=await Promise.all(a.map(s=>Ie(e,t,s)));$.innerHTML=`
      <div class="admin-shell">
        ${P("fieldstats")}

        ${K(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,o)=>ze(s,n[o])).join("")}
      </div>
    `,R(e),X(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(E),k("Tu sesión ha caducado o la contraseña ya no es válida.")):($.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${r(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>ee(e)))}}const U=sessionStorage.getItem(E);U?S(U):k();
