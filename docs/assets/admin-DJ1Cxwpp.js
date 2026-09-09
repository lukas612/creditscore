import{C as G,c as Y}from"./validation-DnU8phWm.js";import{W as Z}from"./witmeQuestions-D841kSbQ.js";const A={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(G.map(e=>[e.id,e.name]))},J="https://pgyaigdsedkdqvhtexrz.supabase.co",K="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",h=Y(J,K),k="cs_admin_pw",S=document.getElementById("admin-root");function F(e){return e.toISOString().slice(0,10)}const P=new Date;let y="all",L=F(P),C=F(P),v="all";const D=25;let _=0,H="dashboard";const X={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},z={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function N(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${L}T00:00:00`),n=new Date(`${C}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const j=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function ee(e,t){return e==="all"?"Todo el histórico":`${j.format(new Date(t.since))} – ${j.format(new Date(t.until))}`}const te=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],ae=Z.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),R=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function r(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function E(e){return e==="all"?null:e}async function M(e,t,a){const{data:n,error:i}=await h.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(a)}).single();if(i||!n)throw i??new Error("No data");return n}async function ne(e,t,a){const{data:n,error:i}=await h.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(a)}).single();if(i||!n)throw i??new Error("No data");return n}async function se(e,t,a){const{data:n,error:i}=await h.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(a)});if(i)throw i;return n??[]}async function ie(e,t,a,n){const{data:i,error:o}=await h.rpc("admin_list_leads",{p_password:e,p_limit:D,p_offset:n*D,p_since:t.since,p_until:t.until,p_source:E(a)});if(o)throw o;return i??[]}async function oe(e){const{data:t,error:a}=await h.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(a)throw a;return t??[]}async function re(e,t,a){const{data:n,error:i}=await h.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(a)});if(i)throw i;return n??[]}let Q=[];async function de(e){const{data:t,error:a}=await h.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function ce(e,t,a,n,i){const{error:o}=await h.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:i});if(o)throw o}async function le(e,t){const{error:a}=await h.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function ue(e){const{error:t}=await h.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}function w(e){S.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${r(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await M(a,N("all"),"all"),sessionStorage.setItem(k,a),O(a)}catch{w("Contraseña incorrecta.")}})}function m(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function I(e,t,a,n){const i=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${i}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function B(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function pe(e,t,a){var u;const n=new Map(t.map(c=>[c.question_key,Number(c.reached)])),i=e.engaged_visits;let o="",l=(u=a[0])==null?void 0:u.key;return a.forEach((c,g)=>{const b=n.get(c.key)??0,p=i>0?Math.round(b/i*100):0;let d="";if(g>0&&!c.conditional){const s=n.get(l)??0;if(s>0){const f=Math.round((1-b/s)*100),V=f>=25?"high":f>=10?"mid":"low";d=f>0?`<span class="funnel-drop funnel-drop-${V}">-${f}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${g+1}. ${r(c.label)}${c.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${b} · ${p}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${p}%"></div></div>
        ${d}
      </div>
    `,c.conditional||(l=c.key)}),o}function O(e){H==="scoring"?q(e):$(e)}function W(e){return`
    <header class="admin-header">
      <span class="admin-logo">Creditio <b>Credit Score</b> · Panel interno</span>
      <div class="admin-header-actions">
        <div class="admin-tabs">
          <button class="admin-tab-btn ${e==="dashboard"?"active":""}" data-tab="dashboard">Dashboard</button>
          <button class="admin-tab-btn ${e==="scoring"?"active":""}" data-tab="scoring">Algoritmo de scoring</button>
        </div>
        <button class="admin-btn-ghost" id="refresh-btn">Actualizar</button>
        <button class="admin-btn-ghost" id="logout-btn">Cerrar sesión</button>
      </div>
    </header>
  `}function U(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{H=t.dataset.tab,O(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>O(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(k),w()})}async function $(e){var a;S.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=N(y);try{const[n,i,o,l,u,c]=await Promise.all([M(e,t,v),ie(e,t,v,_),ne(e,t,v),se(e,t,v),oe(e),re(e,t,v)]),g=n.band_excelente+n.band_bueno+n.band_regular+n.band_bajo,b=v==="solicitud"?ae:te,p=((a=i[0])==null?void 0:a.total_count)??0,d=Math.max(1,Math.ceil(p/D));S.innerHTML=`
      <div class="admin-shell">
        ${W("dashboard")}

        <section class="admin-card admin-source-bar">
          <span class="admin-source-label">Embudo:</span>
          <div class="admin-period-presets">
            ${Object.keys(z).map(s=>`<button class="admin-period-btn ${v===s?"active":""}" data-source="${s}">${z[s]}</button>`).join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${y==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${y==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${y==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${y==="custom"?"active":""}">
            <input type="date" id="period-from" value="${L}" />
            <span>–</span>
            <input type="date" id="period-to" value="${C}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${r(ee(y,t))}</p>
        </section>

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
            ${m("Visitas",String(o.total_visits))}
            ${m("Rebote instantáneo",`${o.bounce_rate}%`)}
            ${m("Quiz → lead",`${o.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${m("Completan el quiz",`${o.visit_to_quiz_rate}%`)}
            ${m("Dejan sus datos (lead)",`${o.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${m("Completan el quiz",`${o.engaged_to_quiz_rate}%`)}
            ${m("Dejan sus datos (lead)",`${o.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${v==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${o.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${pe(o,l,b)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${I("Excelente",n.band_excelente,g,"band-excelente")}
          ${I("Bueno",n.band_bueno,g,"band-bueno")}
          ${I("Regular",n.band_regular,g,"band-regular")}
          ${I("Bajo",n.band_bajo,g,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${p})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Aprobación</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${i.map(s=>`
                  <tr>
                    <td>${R.format(new Date(s.created_at))}</td>
                    <td>${r(s.first_name)} ${r(s.last_name??"")}</td>
                    <td>${r(s.email)}</td>
                    <td>${r(s.phone??"")}</td>
                    <td>${r(s.zip_code??"")}</td>
                    <td>${s.score??"—"}</td>
                    <td><span class="admin-badge band-${s.score_band??""}">${s.score_band??"—"}</span></td>
                    <td>${s.approval_probability!=null?`<span class="admin-badge ${B(s.approval_probability)}">${s.approval_probability}%</span>`:"—"}</td>
                    <td>${r(s.status)}</td>
                    <td>${r(z[s.source]??s.source)}</td>
                    <td>${s.offer_clicks&&s.offer_clicks.length>0?s.offer_clicks.map(f=>r(A[f]??f)).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${i.length===0?'<tr><td colspan="11" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${_===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${_+1} de ${d}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${_+1>=d?"disabled":""}>Siguiente →</button>
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
                  <th>Witme ID</th><th>Estado</th><th>Mensaje</th>
                  <th>Score</th><th>Aprobación</th><th>Click oferta</th>
                </tr>
              </thead>
              <tbody>
                ${u.map(s=>`
                  <tr>
                    <td>${R.format(new Date(s.created_at))}</td>
                    <td>${r(s.name??"")} ${r(s.last_name??"")}</td>
                    <td>${r(s.email??"")}</td>
                    <td>${s.requested_amount!=null?`${s.requested_amount} €`:"—"}</td>
                    <td>${s.witme_id??"—"}</td>
                    <td><span class="admin-badge ${s.witme_status==="processed"?"band-excelente":"band-bajo"}">${r(s.witme_status??"—")}</span></td>
                    <td>${r(JSON.stringify(s.witme_message??""))}</td>
                    <td>${s.score??"—"}</td>
                    <td>${s.approval_probability!=null?`<span class="admin-badge ${B(s.approval_probability)}">${s.approval_probability}%</span>`:"—"}</td>
                    <td>${s.offer_clicks&&s.offer_clicks.length>0?`✅ ${s.offer_clicks.map(f=>r(A[f]??f)).join(", ")}`:"—"}</td>
                  </tr>
                `).join("")}
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
                ${c.map(s=>`
                  <tr>
                    <td>${r(A[s.offer_id]??s.offer_id)}</td>
                    <td>${s.clicks}</td>
                  </tr>
                `).join("")}
                ${c.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,U(e),document.querySelectorAll(".admin-period-btn[data-source]").forEach(s=>{s.addEventListener("click",()=>{v=s.dataset.source,_=0,$(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(s=>{s.addEventListener("click",()=>{y=s.dataset.preset,_=0,$(e)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{L=document.getElementById("period-from").value||L,C=document.getElementById("period-to").value||C,y="custom",_=0,$(e)}),document.getElementById("leads-prev-btn").addEventListener("click",()=>{_>0&&(_--,$(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{_++,$(e)})}catch(n){const i=n instanceof Error?n.message:String(n);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(k),w("Tu sesión ha caducado o la contraseña ya no es válida.")):(S.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${r(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$(e)))}}function me(e,t,a){return a?`${e} +`:`${e} – ${t}`}function T(e,t,a,n,i,o,l){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${r(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${i}"
        max="${o}"
        step="${l}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function be(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return T(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,i)=>T(e.key,`bucket:${i}`,me(n[0],n[1],i===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>T(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function ge(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${r(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${r(X[e.key]??"—")} · clave: <code>${r(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${T(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${be(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function fe(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var i;const n=(i=a.closest(".scoring-slider-row"))==null?void 0:i.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,i=Q.find(d=>d.key===n),o=document.querySelector(`[data-rule-card="${n}"]`);if(!i||!o)return;const l=o.querySelector(".scoring-rule-status"),u=new Map;o.querySelectorAll("input[data-field]").forEach(d=>{u.set(d.dataset.field,d.type==="checkbox"?String(d.checked):d.value)});const c=Number(u.get("weight")),g=u.get("active")==="true",b=i.config;let p;typeof b.value=="number"&&Object.keys(b).length===1?p={value:Number(u.get("value"))}:Array.isArray(b.buckets)?p={buckets:b.buckets.map((d,s)=>[d[0],d[1],Number(u.get(`bucket:${s}`))])}:(p={},Object.keys(b).forEach(d=>{p[d]=Number(u.get(`opt:${d}`))})),a.disabled=!0,l.textContent="Guardando…",l.className="scoring-rule-status";try{await ce(e,n,p,c,g),i.config=p,i.weight=c,i.active=g,l.textContent="✓ Guardado",l.className="scoring-rule-status ok",setTimeout(()=>{l.textContent=""},2500)}catch{l.textContent="Error al guardar",l.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,i=document.querySelector(`[data-rule-card="${n}"]`);if(!i||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const o=i.querySelector(".scoring-rule-status");a.disabled=!0,o.textContent="Restaurando…",o.className="scoring-rule-status";try{await le(e,n),await q(e)}catch{o.textContent="Error al restaurar",o.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await ue(e),await q(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function q(e){S.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await de(e);Q=t,S.innerHTML=`
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
          ${t.map(ge).join("")}
        </div>
      </div>
    `,U(e),fe(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(k),w("Tu sesión ha caducado o la contraseña ya no es válida.")):(S.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${r(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>q(e)))}}const x=sessionStorage.getItem(k);x?O(x):w();
