import{C as V,c as G}from"./offers-B_t2kAWT.js";import{W as Y}from"./witmeQuestions-DlX0lagW.js";const q={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(V.map(e=>[e.id,e.name]))},Z="https://pgyaigdsedkdqvhtexrz.supabase.co",J="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",h=G(Z,J),k="cs_admin_pw",S=document.getElementById("admin-root");function B(e){return e.toISOString().slice(0,10)}const H=new Date;let f="all",L=B(H),C=B(H),_="all";const z=25;let b=0,x="dashboard";const K={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud"},D={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa"};function M(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const n=new Date(`${L}T00:00:00`),a=new Date(`${C}T23:59:59.999`);return n.getTime()>a.getTime()?{since:a.toISOString(),until:n.toISOString()}:{since:n.toISOString(),until:a.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const A=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function X(e,t){return e==="all"?"Todo el histórico":`${A.format(new Date(t.since))} – ${A.format(new Date(t.until))}`}const ee=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],te=Y.map(e=>({key:e.key,label:e.label,conditional:!!e.condition})),j=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function d(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function E(e){return e==="all"?null:e}async function P(e,t,n){const{data:a,error:i}=await h.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(n)}).single();if(i||!a)throw i??new Error("No data");return a}async function ae(e,t,n){const{data:a,error:i}=await h.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(n)}).single();if(i||!a)throw i??new Error("No data");return a}async function ne(e,t,n){const{data:a,error:i}=await h.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(n)});if(i)throw i;return a??[]}async function se(e,t,n,a){const{data:i,error:o}=await h.rpc("admin_list_leads",{p_password:e,p_limit:z,p_offset:a*z,p_since:t.since,p_until:t.until,p_source:E(n)});if(o)throw o;return i??[]}async function ie(e){const{data:t,error:n}=await h.rpc("admin_get_witme_applications",{p_password:e,p_limit:100,p_offset:0});if(n)throw n;return t??[]}async function oe(e,t,n){const{data:a,error:i}=await h.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:E(n)});if(i)throw i;return a??[]}let R=[];async function de(e){const{data:t,error:n}=await h.rpc("admin_get_scoring_rules",{p_password:e});if(n)throw n;return t??[]}async function re(e,t,n,a,i){const{error:o}=await h.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:n,p_weight:a,p_active:i});if(o)throw o}function w(e){S.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${d(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("pw-input").value;try{await P(n,M("all"),"all"),sessionStorage.setItem(k,n),O(n)}catch{w("Contraseña incorrecta.")}})}function p(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function I(e,t,n,a){const i=n>0?Math.round(t/n*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${a}" style="width:${i}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function ce(e,t,n){var g;const a=new Map(t.map(c=>[c.question_key,Number(c.reached)])),i=e.engaged_visits;let o="",l=(g=n[0])==null?void 0:g.key;return n.forEach((c,u)=>{const m=a.get(c.key)??0,r=i>0?Math.round(m/i*100):0;let v="";if(u>0&&!c.conditional){const s=a.get(l)??0;if(s>0){const y=Math.round((1-m/s)*100),U=y>=25?"high":y>=10?"mid":"low";v=y>0?`<span class="funnel-drop funnel-drop-${U}">-${y}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}o+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${u+1}. ${d(c.label)}${c.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${m} · ${r}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${r}%"></div></div>
        ${v}
      </div>
    `,c.conditional||(l=c.key)}),o}function O(e){x==="scoring"?W(e):$(e)}function N(e){return`
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
  `}function Q(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{x=t.dataset.tab,O(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>O(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(k),w()})}async function $(e){var n;S.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=M(f);try{const[a,i,o,l,g,c]=await Promise.all([P(e,t,_),se(e,t,_,b),ae(e,t,_),ne(e,t,_),ie(e),oe(e,t,_)]),u=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,m=_==="solicitud"?te:ee,r=((n=i[0])==null?void 0:n.total_count)??0,v=Math.max(1,Math.ceil(r/z));S.innerHTML=`
      <div class="admin-shell">
        ${N("dashboard")}

        <section class="admin-card admin-source-bar">
          <span class="admin-source-label">Embudo:</span>
          <div class="admin-period-presets">
            ${Object.keys(D).map(s=>`<button class="admin-period-btn ${_===s?"active":""}" data-source="${s}">${D[s]}</button>`).join("")}
          </div>
        </section>

        <section class="admin-card admin-period-bar">
          <div class="admin-period-presets">
            <button class="admin-period-btn ${f==="today"?"active":""}" data-preset="today">Hoy</button>
            <button class="admin-period-btn ${f==="7d"?"active":""}" data-preset="7d">7 días</button>
            <button class="admin-period-btn ${f==="all"?"active":""}" data-preset="all">Todo</button>
          </div>
          <div class="admin-period-custom ${f==="custom"?"active":""}">
            <input type="date" id="period-from" value="${L}" />
            <span>–</span>
            <input type="date" id="period-to" value="${C}" />
            <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
          </div>
          <p class="admin-period-label">${d(X(f,t))}</p>
        </section>

        <section class="admin-stats-grid">
          ${p("Leads totales (histórico)",String(a.total_leads))}
          ${p("Leads en el periodo",String(a.period_leads))}
          ${p("Sesiones en el periodo",String(a.period_sessions))}
          ${p("Tasa de conversión",`${a.period_conversion_rate}%`)}
          ${p("Score medio (periodo)",a.avg_score!=null?String(a.avg_score):"—")}
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
          ${_==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto o Solicitud completa) para ver la caída pregunta a pregunta — mezclar los dos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${o.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${ce(o,l,m)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${I("Excelente",a.band_excelente,u,"band-excelente")}
          ${I("Bueno",a.band_bueno,u,"band-bueno")}
          ${I("Regular",a.band_regular,u,"band-regular")}
          ${I("Bajo",a.band_bajo,u,"band-bajo")}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Leads (${r})</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                  <th>CP</th><th>Score</th><th>Banda</th><th>Estado</th><th>Fuente</th><th>Ofertas clicadas</th>
                </tr>
              </thead>
              <tbody>
                ${i.map(s=>`
                  <tr>
                    <td>${j.format(new Date(s.created_at))}</td>
                    <td>${d(s.first_name)} ${d(s.last_name??"")}</td>
                    <td>${d(s.email)}</td>
                    <td>${d(s.phone??"")}</td>
                    <td>${d(s.zip_code??"")}</td>
                    <td>${s.score??"—"}</td>
                    <td><span class="admin-badge band-${s.score_band??""}">${s.score_band??"—"}</span></td>
                    <td>${d(s.status)}</td>
                    <td>${d(D[s.source]??s.source)}</td>
                    <td>${s.offer_clicks&&s.offer_clicks.length>0?s.offer_clicks.map(y=>d(q[y]??y)).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${i.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${b===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${b+1} de ${v}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${b+1>=v?"disabled":""}>Siguiente →</button>
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
                ${g.map(s=>`
                  <tr>
                    <td>${j.format(new Date(s.created_at))}</td>
                    <td>${d(s.name??"")} ${d(s.last_name??"")}</td>
                    <td>${d(s.email??"")}</td>
                    <td>${s.requested_amount!=null?`${s.requested_amount} €`:"—"}</td>
                    <td>${s.witme_id??"—"}</td>
                    <td><span class="admin-badge ${s.witme_status==="processed"?"band-excelente":"band-bajo"}">${d(s.witme_status??"—")}</span></td>
                    <td>${d(JSON.stringify(s.witme_message??""))}</td>
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
                ${c.map(s=>`
                  <tr>
                    <td>${d(q[s.offer_id]??s.offer_id)}</td>
                    <td>${s.clicks}</td>
                  </tr>
                `).join("")}
                ${c.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,Q(e),document.querySelectorAll(".admin-period-btn[data-source]").forEach(s=>{s.addEventListener("click",()=>{_=s.dataset.source,b=0,$(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(s=>{s.addEventListener("click",()=>{f=s.dataset.preset,b=0,$(e)})}),document.getElementById("period-apply-btn").addEventListener("click",()=>{L=document.getElementById("period-from").value||L,C=document.getElementById("period-to").value||C,f="custom",b=0,$(e)}),document.getElementById("leads-prev-btn").addEventListener("click",()=>{b>0&&(b--,$(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{b++,$(e)})}catch(a){const i=a instanceof Error?a.message:String(a);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(k),w("Tu sesión ha caducado o la contraseña ya no es válida.")):(S.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${d(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$(e)))}}function le(e,t,n){return n?`${e} +`:`${e} – ${t}`}function T(e,t,n,a,i,o,l){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${d(n)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${i}"
        max="${o}"
        step="${l}"
        value="${a}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${a}</span>
    </div>
  `}function ue(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return T(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const n=t.buckets;return n.map((a,i)=>T(e.key,`bucket:${i}`,le(a[0],a[1],i===n.length-1),a[2],-200,200,5)).join("")}return Object.entries(t).map(([n,a])=>T(e.key,`opt:${n}`,n,Number(a),-200,200,5)).join("")}function me(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${d(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${d(K[e.key]??"—")} · clave: <code>${d(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${T(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${ue(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function pe(e){document.querySelectorAll(".scoring-slider").forEach(t=>{t.addEventListener("input",()=>{var a;const n=(a=t.closest(".scoring-slider-row"))==null?void 0:a.querySelector(".scoring-slider-value");n&&(n.textContent=t.value)})}),document.querySelectorAll("[data-save-rule]").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.saveRule,a=R.find(r=>r.key===n),i=document.querySelector(`[data-rule-card="${n}"]`);if(!a||!i)return;const o=i.querySelector(".scoring-rule-status"),l=new Map;i.querySelectorAll("input[data-field]").forEach(r=>{l.set(r.dataset.field,r.type==="checkbox"?String(r.checked):r.value)});const g=Number(l.get("weight")),c=l.get("active")==="true",u=a.config;let m;typeof u.value=="number"&&Object.keys(u).length===1?m={value:Number(l.get("value"))}:Array.isArray(u.buckets)?m={buckets:u.buckets.map((r,v)=>[r[0],r[1],Number(l.get(`bucket:${v}`))])}:(m={},Object.keys(u).forEach(r=>{m[r]=Number(l.get(`opt:${r}`))})),t.disabled=!0,o.textContent="Guardando…",o.className="scoring-rule-status";try{await re(e,n,m,g,c),a.config=m,a.weight=g,a.active=c,o.textContent="✓ Guardado",o.className="scoring-rule-status ok",setTimeout(()=>{o.textContent=""},2500)}catch{o.textContent="Error al guardar",o.className="scoring-rule-status error"}finally{t.disabled=!1}})})}async function W(e){S.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await de(e);R=t,S.innerHTML=`
      <div class="admin-shell">
        ${N("scoring")}

        <section class="admin-card">
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
        </section>

        <div class="scoring-rules-grid">
          ${t.map(me).join("")}
        </div>
      </div>
    `,Q(e),pe(e)}catch(t){const n=t instanceof Error?t.message:String(t);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(k),w("Tu sesión ha caducado o la contraseña ya no es válida.")):(S.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${d(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>W(e)))}}const F=sessionStorage.getItem(k);F?O(F):w();
