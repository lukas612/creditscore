import{C as Oe,c as De}from"./validation-UxUSjfRp.js";import{q as je}from"./questions-D4Dn-9Ya.js";import{W as se,S as Se}from"./witmeQuestions-CvG3F3Ut.js";import{W as Ee,R as ke}from"./witmeQuestionsRo-DJoEYp7S.js";const fe={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(Oe.map(e=>[e.id,e.name]))};function X(e){if(e in fe)return fe[e];const a=e.match(/^witme_featured_(\d+)$/);return a?`Witme (oferta destacada ${a[1]})`:e}function Le(e){const a={};for(const t of e)t.options&&(a[t.key]=Object.fromEntries(t.options.map(n=>[n.value,n.label])));return a}const qe=Le(je),Me=Le(se),xe={si:"Sí",no:"No"};function Ne(e,a,t){const n=e==="quiz"?qe[a]:Me[a];return(n==null?void 0:n[t])??xe[t]??t}const ze={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},Fe={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",monthlyDebtPayment:"Cuota mensual de deudas (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Be=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","monthlyDebtPayment","requestedAmount"]),He="https://pgyaigdsedkdqvhtexrz.supabase.co",We="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",p=De(He,We),O="cs_admin_pw",_=document.getElementById("admin-root");function Ie(e){return e.toISOString().slice(0,10)}const we=new Date;let k="all",H=Ie(we),W=Ie(we),d="all";function Qe(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"RO":e==="solicitud"||e==="pingtree"||e==="quiz"?"ES":null}function Ue(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"LEI":"€"}const ee=10;let E=0;const te=10;let T=0;const ae=10;let C=0;const ne=10;let A=0,F="dashboard";const Ve={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},ie={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree",multiping_ro:"Multiping RO",pingtree_ro:"Pingtree RO",credit_ro:"Credit RO"};function V(e){const a=new Date;if(e==="today")return{since:new Date(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0,0).toISOString(),until:a.toISOString()};if(e==="7d")return{since:new Date(a.getTime()-6048e5).toISOString(),until:a.toISOString()};if(e==="custom"){const t=new Date(`${H}T00:00:00`),n=new Date(`${W}T23:59:59.999`);return t.getTime()>n.getTime()?{since:n.toISOString(),until:t.toISOString()}:{since:t.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:a.toISOString()}}const he=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function Ge(e,a){return e==="all"?"Todo el histórico":`${he.format(new Date(a.since))} – ${he.format(new Date(a.until))}`}const Ze=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],Ye=se.filter(e=>Se.includes(e.phase)),Je=se.filter(e=>!Se.includes(e.phase)),Q=e=>({key:e.key,label:e.label,conditional:!!e.condition}),Ke=[...Ye.map(Q),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Je.map(Q),{key:"application_completed",label:"✅ Termina la solicitud completa"}],Xe=Ee.filter(e=>ke.includes(e.phase)),et=Ee.filter(e=>!ke.includes(e.phase)),tt=[...Xe.map(Q),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...et.map(Q),{key:"application_completed",label:"✅ Termina la solicitud completa"}],at=[{key:"requestedAmount_loanPurpose",label:"Importe y propósito del préstamo"},{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},{key:"financial_details",label:"Detalles financieros (nacimiento, ingresos, estado civil)"},{key:"final_details",label:"Últimos datos (CNP, ciudad, dirección)"},{key:"application_completed",label:"✅ Termina la solicitud"}],x=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function j(e){return e==="all"?null:e}async function Pe(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_stats",{p_password:e,p_since:a.since,p_until:a.until,p_source:j(t)}).single();if(s||!n)throw s??new Error("No data");return n}async function nt(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_funnel_overview",{p_password:e,p_since:a.since,p_until:a.until,p_source:j(t)}).single();if(s||!n)throw s??new Error("No data");return n}async function it(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_funnel_steps",{p_password:e,p_since:a.since,p_until:a.until,p_source:j(t)});if(s)throw s;return n??[]}async function st(e,a,t,n){const{data:s,error:r}=await p.rpc("admin_list_leads",{p_password:e,p_limit:ee,p_offset:n*ee,p_since:a.since,p_until:a.until,p_source:j(t)});if(r)throw r;return s??[]}async function ot(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_witme_applications",{p_password:e,p_limit:te,p_offset:a*te,p_source:t});if(s)throw s;return n??[]}async function rt(e,a){const{data:t,error:n}=await p.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:ae,p_offset:a*ae});if(n)throw n;return t??[]}async function dt(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_pingtree_applications",{p_password:e,p_limit:ne,p_offset:a*ne,p_country:t});if(s)throw s;return n??[]}async function ct(e,a){const{data:t,error:n}=await p.rpc("admin_get_pingtree_response_stats",{p_password:e,p_country:a}).single();if(n||!t)throw n??new Error("No data");return t}async function lt(e,a){const{data:t,error:n}=await p.rpc("admin_get_witme_response_stats",{p_password:e,p_source:a}).single();if(n||!t)throw n??new Error("No data");return t}function $(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function K(e){return e==null?"—":`${e}%`}async function ut(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_offer_clicks",{p_password:e,p_since:a.since,p_until:a.until,p_source:j(t)});if(s)throw s;return n??[]}let Te=[];async function mt(e){const{data:a,error:t}=await p.rpc("admin_get_scoring_rules",{p_password:e});if(t)throw t;return a??[]}async function pt(e,a,t,n,s){const{error:r}=await p.rpc("admin_update_scoring_rule",{p_password:e,p_key:a,p_config:t,p_weight:n,p_active:s});if(r)throw r}async function bt(e,a){const{error:t}=await p.rpc("admin_reset_scoring_rule",{p_password:e,p_key:a});if(t)throw t}async function gt(e){const{error:a}=await p.rpc("admin_reset_all_scoring_rules",{p_password:e});if(a)throw a}async function _t(e,a,t){const{data:n,error:s}=await p.rpc("admin_get_field_stats",{p_password:e,p_since:a.since,p_until:a.until,p_source:t});if(s)throw s;return n}function D(e){_.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("pw-input").value;try{await Pe(t,V("all"),"all"),sessionStorage.setItem(O,t),R(t)}catch{D("Contraseña incorrecta.")}})}function c(e,a){return`<div class="admin-stat"><span class="admin-stat-value">${a}</span><span class="admin-stat-label">${e}</span></div>`}function N(e,a,t,n){const s=t>0?Math.round(a/t*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${a}</span>
    </div>
  `}function ve(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function ft(e,a,t){var b;const n=new Map(a.map(m=>[m.question_key,Number(m.reached)])),s=e.engaged_visits;let r="",l=(b=t[0])==null?void 0:b.key;return t.forEach((m,L)=>{const f=n.get(m.key)??0,h=s>0?Math.round(f/s*100):0;let u="";if(L>0&&!m.conditional){const y=n.get(l)??0;if(y>0){const I=Math.round((1-f/y)*100),q=I>=25?"high":I>=10?"mid":"low";u=I>0?`<span class="funnel-drop funnel-drop-${q}">-${I}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}r+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${L+1}. ${o(m.label)}${m.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${f} · ${h}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${h}%"></div></div>
        ${u}
      </div>
    `,m.conditional||(l=m.key)}),r}function R(e){F==="scoring"?U(e):F==="fieldstats"?Ae(e):F==="leads"?S(e):Ce(e)}function G(e){return`
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
  `}function Z(e){document.querySelectorAll(".admin-tab-btn").forEach(a=>{a.addEventListener("click",()=>{F=a.dataset.tab,R(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>R(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(O),D()})}function oe(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(ie).map(a=>`<button class="admin-period-btn ${d===a?"active":""}" data-source="${a}">${ie[a]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${k==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${k==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${k==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${k==="custom"?"active":""}">
        <input type="date" id="period-from" value="${H}" />
        <span>–</span>
        <input type="date" id="period-to" value="${W}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(Ge(k,e))}</p>
    </section>
  `}function re(e){var a;document.querySelectorAll(".admin-period-btn[data-source]").forEach(t=>{t.addEventListener("click",()=>{d=t.dataset.source,E=0,R(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(t=>{t.addEventListener("click",()=>{k=t.dataset.preset,E=0,R(e)})}),(a=document.getElementById("period-apply-btn"))==null||a.addEventListener("click",()=>{H=document.getElementById("period-from").value||H,W=document.getElementById("period-to").value||W,k="custom",E=0,R(e)})}async function Ce(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const a=V(k);try{const[t,n,s,r]=await Promise.all([Pe(e,a,d),nt(e,a,d),it(e,a,d),ut(e,a,d)]),l=t.band_excelente+t.band_bueno+t.band_regular+t.band_bajo,b=d==="solicitud"||d==="pingtree"?Ke:d==="multiping_ro"||d==="pingtree_ro"?tt:d==="credit_ro"?at:Ze;_.innerHTML=`
      <div class="admin-shell">
        ${G("dashboard")}

        ${oe(a)}

        <section class="admin-stats-grid">
          ${c("Leads totales (histórico)",String(t.total_leads))}
          ${c("Leads en el periodo",String(t.period_leads))}
          ${c("Sesiones en el periodo",String(t.period_sessions))}
          ${c("Tasa de conversión",`${t.period_conversion_rate}%`)}
          ${c("Score medio (periodo)",t.avg_score!=null?String(t.avg_score):"—")}
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
            ${c("Visitas",String(n.total_visits))}
            ${c("Rebote instantáneo",`${n.bounce_rate}%`)}
            ${c("Quiz → lead",`${n.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${n.visit_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${n.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${n.engaged_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${n.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${d==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto, Solicitud completa o Pingtree) para ver la caída pregunta a pregunta — mezclarlos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${n.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${ft(n,s,b)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${N("Excelente",t.band_excelente,l,"band-excelente")}
          ${N("Bueno",t.band_bueno,l,"band-bueno")}
          ${N("Regular",t.band_regular,l,"band-regular")}
          ${N("Bajo",t.band_bajo,l,"band-bajo")}
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
                ${r.map(m=>`
                  <tr>
                    <td>${o(X(m.offer_id))}</td>
                    <td>${m.clicks}</td>
                  </tr>
                `).join("")}
                ${r.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,Z(e),re(e)}catch(t){const n=t instanceof Error?t.message:String(t);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(O),D("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Ce(e)))}}async function S(e){var t,n,s,r,l,b,m,L,f,h;_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const a=V(k);try{const u=Qe(d),y=j(d),[I,q,v,Y,J,P]=await Promise.all([st(e,a,d,E),ot(e,T,y),lt(e,y),rt(e,C),dt(e,A,u),ct(e,u)]),de=((t=I[0])==null?void 0:t.total_count)??0,ce=Math.max(1,Math.ceil(de/ee)),le=((n=q[0])==null?void 0:n.total_count)??0,ue=Math.max(1,Math.ceil(le/te)),me=((s=Y[0])==null?void 0:s.total_count)??0,pe=Math.max(1,Math.ceil(me/ae)),be=((r=J[0])==null?void 0:r.total_count)??0,ge=Math.max(1,Math.ceil(be/ne));_.innerHTML=`
      <div class="admin-shell">
        ${G("leads")}

        ${oe(a)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${de})</p>
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
                ${I.map(i=>`
                  <tr>
                    <td>${x.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.first_name)} ${o(i.last_name??"")}">${o(i.first_name)} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email)}">${o(i.email)}</div></td>
                    <td>${o(i.phone??"")}</td>
                    <td>${o(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${ve(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${o(i.status)}</td>
                    <td>${o(i.source==="pingtree"?"Pingtree":ie[i.source]??i.source)}</td>
                    <td>${i.source==="pingtree"||i.source==="pingtree_ro"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:i.source!=="solicitud"&&i.source!=="multiping_ro"&&i.source!=="credit_ro"?'<span title="El quiz corto no envía a Witme">n/a</span>':i.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(g=>o(X(g))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${I.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${E===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${E+1} de ${ce}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${E+1>=ce?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        ${d==="all"||d==="solicitud"||d==="multiping_ro"||d==="credit_ro"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme${d==="multiping_ro"||d==="credit_ro"?" · Rumanía":d==="solicitud"?" · España":""} (${le})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Tiempo medio de respuesta",$(v.avg_ms))}
            ${c("Mediana",$(v.median_ms))}
            ${c("P95",$(v.p95_ms))}
            ${c("Máximo",$(v.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("% Aceptados (con oferta)",K(v.pct_accepted))}
            ${c("% Rechazados por Witme",K(v.pct_failed))}
            ${c("Con oferta",String(v.count_accepted))}
            ${c("Total solicitudes",String(v.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${v.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${v.count_error} terminaron
            en error de conexión con Witme${v.count_timeout>0?` y ${v.count_timeout} en timeout (de cuando sí cortábamos a los 20s)`:""}.
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
                ${q.map(i=>{const g=[];i.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&g.push(`Redirect URL: ${i.witme_redirect_url}`);const w=g.join(`
`);return`
                  <tr>
                    <td>${x.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} ${Ue(d)}`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${$(i.witme_response_ms)}</td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${ve(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(M=>o(X(M))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${q.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${T===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${T+1} de ${ue}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${T+1>=ue?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${d==="all"||d==="solicitud"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${me})</p>
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
                ${Y.map(i=>{const g=[];i.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&g.push(`Redirect URL: ${i.witme_redirect_url}`);const w=g.join(`
`),M=i.product==="car_collateral+debt_consolidation"?"Aval coche + Reunificación deudas":i.product==="car_collateral"?"Aval coche":i.product==="debt_consolidation"?"Reunificación deudas":"—";return`
                  <tr>
                    <td>${x.format(new Date(i.created_at))}</td>
                    <td>${o(M)}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${$(i.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${Y.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${C===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${C+1} de ${pe}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${C+1>=pe?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${d==="all"||d==="pingtree"||d==="pingtree_ro"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Pingtree${d==="pingtree_ro"?" · Rumanía":d==="pingtree"?" · España":""} (${be})</p>
          <p class="admin-card-sub">
            ${d==="pingtree_ro"?"Versión independiente de multiping (<code>/pingtree-ro.html</code>): usa solo el endpoint <code>servy-form-wait</code> con servy_id 259 (Creditio Pingtree RO), y redirige directamente a la <code>redirectUrl</code> de Witme en vez de mostrar resultados propios.":"Versión independiente de la solicitud completa (<code>/pingtree.html</code>): usa solo el endpoint <code>servy-form-wait</code> con los servy_id 151 (Creditio Pingtree), 154 (reunificación) y 171 (aval coche) juntos, y redirige directamente a la <code>redirectUrl</code> de Witme en vez de mostrar resultados propios."}
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Tiempo medio de respuesta",$(P.avg_ms))}
            ${c("Mediana",$(P.median_ms))}
            ${c("P95",$(P.p95_ms))}
            ${c("Máximo",$(P.max_ms))}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("% Aceptados (con redirectUrl)",K(P.pct_accepted))}
            ${c("Con oferta",String(P.count_accepted))}
            ${c("Total solicitudes",String(P.count_total))}
          </section>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th><th>Nombre</th><th>Email</th><th>Tiempo</th>
                  <th>Enviado</th><th>Aceptado</th><th>Redirigido</th>
                </tr>
              </thead>
              <tbody>
                ${J.map(i=>{const g=[];i.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&g.push(`Redirect URL: ${i.witme_redirect_url}`);const w=g.join(`
`),M=i.response_status!=null,_e=i.witme_status==="processed",Re=i.witme_redirect_url!=null;return`
                  <tr>
                    <td>${x.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${$(i.response_ms)}</td>
                    <td>${M?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td><span class="admin-badge ${_e?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${_e?"✅ Sí":"❌ No"}</span></td>
                    <td>${Re?`<span class="admin-badge band-excelente" title="${o(i.witme_redirect_url??"")}">✅ Sí</span>`:'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                  </tr>
                `}).join("")}
                ${J.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="pingtree-prev-btn" ${A===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${A+1} de ${ge}</span>
            <button class="admin-btn-ghost" id="pingtree-next-btn" ${A+1>=ge?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}
      </div>
    `,Z(e),re(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{E>0&&(E--,S(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{E++,S(e)}),(l=document.getElementById("witme-prev-btn"))==null||l.addEventListener("click",()=>{T>0&&(T--,S(e))}),(b=document.getElementById("witme-next-btn"))==null||b.addEventListener("click",()=>{T++,S(e)}),(m=document.getElementById("witme-car-prev-btn"))==null||m.addEventListener("click",()=>{C>0&&(C--,S(e))}),(L=document.getElementById("witme-car-next-btn"))==null||L.addEventListener("click",()=>{C++,S(e)}),(f=document.getElementById("pingtree-prev-btn"))==null||f.addEventListener("click",()=>{A>0&&(A--,S(e))}),(h=document.getElementById("pingtree-next-btn"))==null||h.addEventListener("click",()=>{A++,S(e)})}catch(u){const y=u instanceof Error?u.message:String(u);y.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(O),D("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(y)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>S(e)))}}function ht(e,a,t){return t?`${e} +`:`${e} – ${a}`}function B(e,a,t,n,s,r,l){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${o(t)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${r}"
        step="${l}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${a}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function vt(e){const a=e.config;if(typeof a.value=="number"&&Object.keys(a).length===1)return B(e.key,"value","Puntos base",a.value,300,850,5);if(Array.isArray(a.buckets)){const t=a.buckets;return t.map((n,s)=>B(e.key,`bucket:${s}`,ht(n[0],n[1],s===t.length-1),n[2],-200,200,5)).join("")}return Object.entries(a).map(([t,n])=>B(e.key,`opt:${t}`,t,Number(n),-200,200,5)).join("")}function $t(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${o(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${o(Ve[e.key]??"—")} · clave: <code>${o(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${B(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${vt(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function yt(e){var a;document.querySelectorAll(".scoring-slider").forEach(t=>{t.addEventListener("input",()=>{var s;const n=(s=t.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=t.value)})}),document.querySelectorAll("[data-save-rule]").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.saveRule,s=Te.find(u=>u.key===n),r=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!r)return;const l=r.querySelector(".scoring-rule-status"),b=new Map;r.querySelectorAll("input[data-field]").forEach(u=>{b.set(u.dataset.field,u.type==="checkbox"?String(u.checked):u.value)});const m=Number(b.get("weight")),L=b.get("active")==="true",f=s.config;let h;typeof f.value=="number"&&Object.keys(f).length===1?h={value:Number(b.get("value"))}:Array.isArray(f.buckets)?h={buckets:f.buckets.map((u,y)=>[u[0],u[1],Number(b.get(`bucket:${y}`))])}:(h={},Object.keys(f).forEach(u=>{h[u]=Number(b.get(`opt:${u}`))})),t.disabled=!0,l.textContent="Guardando…",l.className="scoring-rule-status";try{await pt(e,n,h,m,L),s.config=h,s.weight=m,s.active=L,l.textContent="✓ Guardado",l.className="scoring-rule-status ok",setTimeout(()=>{l.textContent=""},2500)}catch{l.textContent="Error al guardar",l.className="scoring-rule-status error"}finally{t.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const r=s.querySelector(".scoring-rule-status");t.disabled=!0,r.textContent="Restaurando…",r.className="scoring-rule-status";try{await bt(e,n),await U(e)}catch{r.textContent="Error al restaurar",r.className="scoring-rule-status error",t.disabled=!1}})}),(a=document.getElementById("reset-all-rules-btn"))==null||a.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await gt(e),await U(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function U(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const a=await mt(e);Te=a,_.innerHTML=`
      <div class="admin-shell">
        ${G("scoring")}

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
          ${a.map($t).join("")}
        </div>
      </div>
    `,Z(e),yt(e)}catch(a){const t=a instanceof Error?a.message:String(a);t.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(O),D("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(t)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>U(e)))}}const $e=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function z(e,a){return e==null?"—":a?`${$e.format(e)} €`:$e.format(e)}function St(e,a,t){const n=Be.has(a);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${z(t.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${z(t.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${z(t.min,n)} – ${z(t.max,n)}</strong></div>
      <p class="fieldstat-count">${t.count} respuestas</p>
    </div>
  `}function Et(e,a,t,n){const s=a.reduce((r,l)=>r+l.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      ${a.map(r=>{const l=s>0?Math.round(r.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${o(Ne(t,n,r.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${l}%"></div></div>
              <span class="admin-band-count">${r.count} (${l}%)</span>
            </div>
          `}).join("")}
      ${a.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function kt(e,a){const t=e==="quiz"?ze:Fe;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${a.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(a.numeric).map(([s,r])=>St(t[s]??s,s,r)).join("")}
        ${Object.entries(a.categorical).map(([s,r])=>Et(t[s]??s,r,e,s)).join("")}
      </div>
    </section>
  `}async function Ae(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const a=V(k),t=d==="solicitud"||d==="quiz"||d==="pingtree"?[d]:["quiz","solicitud","pingtree"];try{const n=await Promise.all(t.map(s=>_t(e,a,s)));_.innerHTML=`
      <div class="admin-shell">
        ${G("fieldstats")}

        ${oe(a)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${t.map((s,r)=>kt(s,n[r])).join("")}
      </div>
    `,Z(e),re(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(O),D("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Ae(e)))}}const ye=sessionStorage.getItem(O);ye?R(ye):D();
