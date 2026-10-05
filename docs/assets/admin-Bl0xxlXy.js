import{c as ze}from"./index-DBuN83Yj.js";import{q as Be}from"./questions-D4Dn-9Ya.js";import{C as He}from"./validation-Cz5T3okC.js";import{W as ue,S as Te}from"./witmeQuestions-BqphOVtp.js";import{W as Ae,R as Re}from"./witmeQuestionsRo-DJoEYp7S.js";const Ie={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(He.map(e=>[e.id,e.name]))};function ie(e){if(e in Ie)return Ie[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function Oe(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(i=>[i.value,i.label])));return t}const We=Oe(Be),Qe=Oe(ue),Ue={si:"Sí",no:"No"};function Ve(e,t,a){const i=e==="quiz"?We[t]:Qe[t];return(i==null?void 0:i[a])??Ue[a]??a}const Ge={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},Ze={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",monthlyDebtPayment:"Cuota mensual de deudas (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Ye=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","monthlyDebtPayment","requestedAmount"]),Je="https://pgyaigdsedkdqvhtexrz.supabase.co",Ke="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",p=ze(Je,Ke),j="cs_admin_pw",_=document.getElementById("admin-root");function De(e){return e.toISOString().slice(0,10)}const je=new Date;let E="all",Q=De(je),U=De(je),r="all";function Xe(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"RO":e==="solicitud"||e==="pingtree"||e==="quiz"?"ES":null}function et(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"LEI":"€"}const se=10;let S=0;const oe=10;let T=0;const re=10;let A=0;const de=10;let R=0;const ce=10;let O=0,H="dashboard";const tt={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},le={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree",multiping_ro:"Multiping RO",pingtree_ro:"Pingtree RO",credit_ro:"Credit RO",credito_claro_mx:"Scorea (MX)"};function Z(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${Q}T00:00:00`),i=new Date(`${U}T23:59:59.999`);return a.getTime()>i.getTime()?{since:i.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:i.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const Le=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function at(e,t){return e==="all"?"Todo el histórico":`${Le.format(new Date(t.since))} – ${Le.format(new Date(t.until))}`}const nt=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],it=ue.filter(e=>Te.includes(e.phase)),st=ue.filter(e=>!Te.includes(e.phase)),V=e=>({key:e.key,label:e.label,conditional:!!e.condition}),ot=[...it.map(V),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...st.map(V),{key:"application_completed",label:"✅ Termina la solicitud completa"}],rt=Ae.filter(e=>Re.includes(e.phase)),dt=Ae.filter(e=>!Re.includes(e.phase)),ct=[...rt.map(V),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...dt.map(V),{key:"application_completed",label:"✅ Termina la solicitud completa"}],lt=[{key:"requestedAmount_loanPurpose",label:"Importe y propósito del préstamo"},{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},{key:"financial_details",label:"Detalles financieros (nacimiento, ingresos, estado civil)"},{key:"final_details",label:"Últimos datos (CNP, ciudad, dirección)"},{key:"application_completed",label:"✅ Termina la solicitud"}],ut=[{key:"activo",label:"¿Tiene crédito activo?"},{key:"atrasos",label:"Atrasos en pagos (12 meses)"},{key:"uso",label:"Uso del límite de crédito"},{key:"antiguedad",label:"Antigüedad del crédito más viejo"},{key:"solicitudes",label:"Solicitudes de crédito recientes"},{key:"application_completed",label:"✅ Termina el quiz"}],q=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function M(e){return e==="all"?null:e}async function xe(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)}).single();if(s||!i)throw s??new Error("No data");return i}async function mt(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)}).single();if(s||!i)throw s??new Error("No data");return i}async function pt(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)});if(s)throw s;return i??[]}async function bt(e,t,a,i){const{data:s,error:d}=await p.rpc("admin_list_leads",{p_password:e,p_limit:se,p_offset:i*se,p_since:t.since,p_until:t.until,p_source:M(a)});if(d)throw d;return s??[]}async function gt(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_witme_applications",{p_password:e,p_limit:oe,p_offset:t*oe,p_source:a});if(s)throw s;return i??[]}async function _t(e,t){const{data:a,error:i}=await p.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:re,p_offset:t*re});if(i)throw i;return a??[]}async function ht(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_pingtree_applications",{p_password:e,p_limit:de,p_offset:t*de,p_country:a});if(s)throw s;return i??[]}async function ft(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_credito_claro_orders",{p_password:e,p_since:t.since,p_until:t.until,p_limit:ce,p_offset:a*ce});if(s)throw s;return i??[]}async function vt(e,t){const{data:a,error:i}=await p.rpc("admin_get_pingtree_response_stats",{p_password:e,p_country:t}).single();if(i||!a)throw i??new Error("No data");return a}async function $t(e,t){const{data:a,error:i}=await p.rpc("admin_get_witme_response_stats",{p_password:e,p_source:t}).single();if(i||!a)throw i??new Error("No data");return a}function y(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function ne(e){return e==null?"—":`${e}%`}async function yt(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)});if(s)throw s;return i??[]}let qe=[];async function St(e){const{data:t,error:a}=await p.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Et(e,t,a,i,s){const{error:d}=await p.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:i,p_active:s});if(d)throw d}async function kt(e,t){const{error:a}=await p.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function It(e){const{error:t}=await p.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Lt(e,t,a){const{data:i,error:s}=await p.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return i}function x(e){_.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await xe(a,Z("all"),"all"),sessionStorage.setItem(j,a),D(a)}catch{x("Contraseña incorrecta.")}})}function c(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function z(e,t,a,i){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${i}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function we(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function wt(e,t,a){var b;const i=new Map(t.map(u=>[u.question_key,Number(u.reached)])),s=e.engaged_visits;let d="",l=(b=a[0])==null?void 0:b.key;return a.forEach((u,k)=>{const h=i.get(u.key)??0,f=s>0?Math.round(h/s*100):0;let m="";if(k>0&&!u.conditional){const w=i.get(l)??0;if(w>0){const P=Math.round((1-h/w)*100),I=P>=25?"high":P>=10?"mid":"low";m=P>0?`<span class="funnel-drop funnel-drop-${I}">-${P}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}d+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${k+1}. ${o(u.label)}${u.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${h} · ${f}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${f}%"></div></div>
        ${m}
      </div>
    `,u.conditional||(l=u.key)}),d}function D(e){H==="scoring"?G(e):H==="fieldstats"?Ne(e):H==="leads"?$(e):Me(e)}function Y(e){return`
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
  `}function J(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{H=t.dataset.tab,D(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>D(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(j),x()})}function me(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(le).map(t=>`<button class="admin-period-btn ${r===t?"active":""}" data-source="${t}">${le[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${E==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${E==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${E==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${E==="custom"?"active":""}">
        <input type="date" id="period-from" value="${Q}" />
        <span>–</span>
        <input type="date" id="period-to" value="${U}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(at(E,e))}</p>
    </section>
  `}function pe(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{r=a.dataset.source,S=0,D(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{E=a.dataset.preset,S=0,D(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{Q=document.getElementById("period-from").value||Q,U=document.getElementById("period-to").value||U,E="custom",S=0,D(e)})}async function Me(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(E);try{const[a,i,s,d]=await Promise.all([xe(e,t,r),mt(e,t,r),pt(e,t,r),yt(e,t,r)]),l=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,b=r==="solicitud"||r==="pingtree"?ot:r==="multiping_ro"||r==="pingtree_ro"?ct:r==="credit_ro"?lt:r==="credito_claro_mx"?ut:nt;_.innerHTML=`
      <div class="admin-shell">
        ${Y("dashboard")}

        ${me(t)}

        <section class="admin-stats-grid">
          ${c("Leads totales (histórico)",String(a.total_leads))}
          ${c("Leads en el periodo",String(a.period_leads))}
          ${c("Sesiones en el periodo",String(a.period_sessions))}
          ${c("Tasa de conversión",`${a.period_conversion_rate}%`)}
          ${c("Score medio (periodo)",a.avg_score!=null?String(a.avg_score):"—")}
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
            ${c("Visitas",String(i.total_visits))}
            ${c("Rebote instantáneo",`${i.bounce_rate}%`)}
            ${c("Quiz → lead",`${i.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${i.visit_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${i.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Completan el quiz",`${i.engaged_to_quiz_rate}%`)}
            ${c("Dejan sus datos (lead)",`${i.engaged_to_lead_rate}%`)}
          </section>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Dónde se cae la gente</p>
          ${r==="all"?'<p class="admin-card-sub">Selecciona un embudo concreto arriba (Quiz corto, Solicitud completa o Pingtree) para ver la caída pregunta a pregunta — mezclarlos no tiene sentido, son formularios distintos.</p>':`<p class="admin-card-sub">
                  Ya excluye el rebote instantáneo: es la caída real entre quienes empiezan
                  a interactuar de verdad (${i.engaged_visits} sesiones). Las
                  preguntas condicionales no muestran caída propia (no todo el mundo las ve);
                  el siguiente paso obligatorio calcula su caída respecto al último paso que
                  ven todos.
                </p>
                ${wt(i,s,b)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${z("Excelente",a.band_excelente,l,"band-excelente")}
          ${z("Bueno",a.band_bueno,l,"band-bueno")}
          ${z("Regular",a.band_regular,l,"band-regular")}
          ${z("Bajo",a.band_bajo,l,"band-bajo")}
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
                ${d.map(u=>`
                  <tr>
                    <td>${o(ie(u.offer_id))}</td>
                    <td>${u.clicks}</td>
                  </tr>
                `).join("")}
                ${d.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,J(e),pe(e)}catch(a){const i=a instanceof Error?a.message:String(a);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),x("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Me(e)))}}async function $(e){var a,i,s,d,l,b,u,k,h,f,m,w,P;_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(E);try{const I=Xe(r),N=M(r),[K,X,v,ee,te,C,ae]=await Promise.all([bt(e,t,r,S),gt(e,T,N),$t(e,N),_t(e,A),ht(e,R,I),vt(e,I),ft(e,t,O)]),be=((a=K[0])==null?void 0:a.total_count)??0,ge=Math.max(1,Math.ceil(be/se)),_e=((i=X[0])==null?void 0:i.total_count)??0,he=Math.max(1,Math.ceil(_e/oe)),fe=((s=ee[0])==null?void 0:s.total_count)??0,ve=Math.max(1,Math.ceil(fe/re)),$e=((d=te[0])==null?void 0:d.total_count)??0,ye=Math.max(1,Math.ceil($e/de)),Se=((l=ae[0])==null?void 0:l.total_count)??0,Ee=Math.max(1,Math.ceil(Se/ce));_.innerHTML=`
      <div class="admin-shell">
        ${Y("leads")}

        ${me(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${be})</p>
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
                ${K.map(n=>`
                  <tr>
                    <td>${q.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.first_name)} ${o(n.last_name??"")}">${o(n.first_name)} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email)}">${o(n.email)}</div></td>
                    <td>${o(n.phone??"")}</td>
                    <td>${o(n.zip_code??"")}</td>
                    <td>${n.score??"—"}</td>
                    <td><span class="admin-badge band-${n.score_band??""}">${n.score_band??"—"}</span></td>
                    <td>${n.approval_probability!=null?`<span class="admin-badge ${we(n.approval_probability)}">${n.approval_probability}%</span>`:"—"}</td>
                    <td>${o(n.status)}</td>
                    <td>${o(n.source==="pingtree"?"Pingtree":le[n.source]??n.source)}</td>
                    <td>${n.source==="pingtree"||n.source==="pingtree_ro"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:n.source!=="solicitud"&&n.source!=="multiping_ro"&&n.source!=="credit_ro"?'<span title="El quiz corto no envía a Witme">n/a</span>':n.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${n.offer_clicks&&n.offer_clicks.length>0?n.offer_clicks.map(g=>o(ie(g))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${K.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${S===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${S+1} de ${ge}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${S+1>=ge?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        ${r==="all"||r==="solicitud"||r==="multiping_ro"||r==="credit_ro"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme${r==="multiping_ro"||r==="credit_ro"?" · Rumanía":r==="solicitud"?" · España":""} (${_e})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Tiempo medio de respuesta",y(v.avg_ms))}
            ${c("Mediana",y(v.median_ms))}
            ${c("P95",y(v.p95_ms))}
            ${c("Máximo",y(v.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("% Aceptados (con oferta)",ne(v.pct_accepted))}
            ${c("% Rechazados por Witme",ne(v.pct_failed))}
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
                ${X.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const L=g.join(`
`);return`
                  <tr>
                    <td>${q.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} ${et(r)}`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}" ${L?`title="${o(L)}"`:""}>${o(n.witme_status??"—")}</span></td>
                    <td>${y(n.witme_response_ms)}</td>
                    <td>${n.score??"—"}</td>
                    <td>${n.approval_probability!=null?`<span class="admin-badge ${we(n.approval_probability)}">${n.approval_probability}%</span>`:"—"}</td>
                    <td>${n.offer_clicks&&n.offer_clicks.length>0?`✅ ${n.offer_clicks.map(F=>o(ie(F))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${X.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${T===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${T+1} de ${he}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${T+1>=he?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${r==="all"||r==="solicitud"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${fe})</p>
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
                ${ee.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const L=g.join(`
`),F=n.product==="car_collateral+debt_consolidation"?"Aval coche + Reunificación deudas":n.product==="car_collateral"?"Aval coche":n.product==="debt_consolidation"?"Reunificación deudas":"—";return`
                  <tr>
                    <td>${q.format(new Date(n.created_at))}</td>
                    <td>${o(F)}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} €`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}" ${L?`title="${o(L)}"`:""}>${o(n.witme_status??"—")}</span></td>
                    <td>${y(n.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${ee.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${A===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${A+1} de ${ve}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${A+1>=ve?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${r==="all"||r==="pingtree"||r==="pingtree_ro"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Pingtree${r==="pingtree_ro"?" · Rumanía":r==="pingtree"?" · España":""} (${$e})</p>
          <p class="admin-card-sub">
            ${r==="pingtree_ro"?"Versión independiente de multiping (<code>/pingtree-ro.html</code>): usa solo el endpoint <code>servy-form-wait</code> con servy_id 259 (Creditio Pingtree RO), y redirige directamente a la <code>redirectUrl</code> de Witme en vez de mostrar resultados propios.":"Versión independiente de la solicitud completa (<code>/pingtree.html</code>): usa solo el endpoint <code>servy-form-wait</code> con los servy_id 151 (Creditio Pingtree), 154 (reunificación) y 171 (aval coche) juntos, y redirige directamente a la <code>redirectUrl</code> de Witme en vez de mostrar resultados propios."}
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Tiempo medio de respuesta",y(C.avg_ms))}
            ${c("Mediana",y(C.median_ms))}
            ${c("P95",y(C.p95_ms))}
            ${c("Máximo",y(C.max_ms))}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("% Aceptados (con redirectUrl)",ne(C.pct_accepted))}
            ${c("Con oferta",String(C.count_accepted))}
            ${c("Total solicitudes",String(C.count_total))}
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
                ${te.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const L=g.join(`
`),F=n.response_status!=null,ke=n.witme_status==="processed",Fe=n.witme_redirect_url!=null;return`
                  <tr>
                    <td>${q.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${y(n.response_ms)}</td>
                    <td>${F?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td><span class="admin-badge ${ke?"band-excelente":"band-bajo"}" ${L?`title="${o(L)}"`:""}>${ke?"✅ Sí":"❌ No"}</span></td>
                    <td>${Fe?`<span class="admin-badge band-excelente" title="${o(n.witme_redirect_url??"")}">✅ Sí</span>`:'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                  </tr>
                `}).join("")}
                ${te.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="pingtree-prev-btn" ${R===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${R+1} de ${ye}</span>
            <button class="admin-btn-ghost" id="pingtree-next-btn" ${R+1>=ye?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${r==="all"||r==="credito_claro_mx"?`
        <section class="admin-card">
          <p class="admin-card-title">Pedidos Scorea · guía PDF (${Se})</p>
          <p class="admin-card-sub">
            Compras de la guía "Scorea" ($149 MXN) pagadas con Stripe. "Pagado" solo lo
            marca el webhook de Stripe tras confirmar el cobro (nunca el checkout en sí) -
            ver supabase/functions/stripe-webhook.
          </p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr><th>Fecha</th><th>Email</th><th>Importe</th><th>Estado</th><th>Pagado</th><th>Score</th></tr>
              </thead>
              <tbody>
                ${ae.map(n=>`
                  <tr>
                    <td>${q.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.email)}">${o(n.email)}</div></td>
                    <td>${(n.amount_cents/100).toFixed(2)} ${o(n.currency)}</td>
                    <td><span class="admin-badge ${n.status==="paid"?"band-excelente":n.status==="pending"?"band-regular":"band-bajo"}">${o(n.status)}</span></td>
                    <td>${n.paid_at?q.format(new Date(n.paid_at)):"—"}</td>
                    <td>${n.score!=null?`${n.score} (${o(n.score_band??"")})`:"—"}</td>
                  </tr>
                `).join("")}
                ${ae.length===0?'<tr><td colspan="6" class="admin-empty">Todavía no hay pedidos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="credito-claro-prev-btn" ${O===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${O+1} de ${Ee}</span>
            <button class="admin-btn-ghost" id="credito-claro-next-btn" ${O+1>=Ee?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}
      </div>
    `,J(e),pe(e),(b=document.getElementById("credito-claro-prev-btn"))==null||b.addEventListener("click",()=>{O>0&&(O--,$(e))}),(u=document.getElementById("credito-claro-next-btn"))==null||u.addEventListener("click",()=>{O++,$(e)}),document.getElementById("leads-prev-btn").addEventListener("click",()=>{S>0&&(S--,$(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{S++,$(e)}),(k=document.getElementById("witme-prev-btn"))==null||k.addEventListener("click",()=>{T>0&&(T--,$(e))}),(h=document.getElementById("witme-next-btn"))==null||h.addEventListener("click",()=>{T++,$(e)}),(f=document.getElementById("witme-car-prev-btn"))==null||f.addEventListener("click",()=>{A>0&&(A--,$(e))}),(m=document.getElementById("witme-car-next-btn"))==null||m.addEventListener("click",()=>{A++,$(e)}),(w=document.getElementById("pingtree-prev-btn"))==null||w.addEventListener("click",()=>{R>0&&(R--,$(e))}),(P=document.getElementById("pingtree-next-btn"))==null||P.addEventListener("click",()=>{R++,$(e)})}catch(I){const N=I instanceof Error?I.message:String(I);N.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),x("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(N)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$(e)))}}function Pt(e,t,a){return a?`${e} +`:`${e} – ${t}`}function W(e,t,a,i,s,d,l){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${o(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${d}"
        step="${l}"
        value="${i}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${i}</span>
    </div>
  `}function Ct(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return W(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((i,s)=>W(e.key,`bucket:${s}`,Pt(i[0],i[1],s===a.length-1),i[2],-200,200,5)).join("")}return Object.entries(t).map(([a,i])=>W(e.key,`opt:${a}`,a,Number(i),-200,200,5)).join("")}function Tt(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${o(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${o(tt[e.key]??"—")} · clave: <code>${o(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${W(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${Ct(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function At(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const i=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");i&&(i.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.saveRule,s=qe.find(m=>m.key===i),d=document.querySelector(`[data-rule-card="${i}"]`);if(!s||!d)return;const l=d.querySelector(".scoring-rule-status"),b=new Map;d.querySelectorAll("input[data-field]").forEach(m=>{b.set(m.dataset.field,m.type==="checkbox"?String(m.checked):m.value)});const u=Number(b.get("weight")),k=b.get("active")==="true",h=s.config;let f;typeof h.value=="number"&&Object.keys(h).length===1?f={value:Number(b.get("value"))}:Array.isArray(h.buckets)?f={buckets:h.buckets.map((m,w)=>[m[0],m[1],Number(b.get(`bucket:${w}`))])}:(f={},Object.keys(h).forEach(m=>{f[m]=Number(b.get(`opt:${m}`))})),a.disabled=!0,l.textContent="Guardando…",l.className="scoring-rule-status";try{await Et(e,i,f,u,k),s.config=f,s.weight=u,s.active=k,l.textContent="✓ Guardado",l.className="scoring-rule-status ok",setTimeout(()=>{l.textContent=""},2500)}catch{l.textContent="Error al guardar",l.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${i}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const d=s.querySelector(".scoring-rule-status");a.disabled=!0,d.textContent="Restaurando…",d.className="scoring-rule-status";try{await kt(e,i),await G(e)}catch{d.textContent="Error al restaurar",d.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await It(e),await G(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function G(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await St(e);qe=t,_.innerHTML=`
      <div class="admin-shell">
        ${Y("scoring")}

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
          ${t.map(Tt).join("")}
        </div>
      </div>
    `,J(e),At(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),x("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>G(e)))}}const Pe=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function B(e,t){return e==null?"—":t?`${Pe.format(e)} €`:Pe.format(e)}function Rt(e,t,a){const i=Ye.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${B(a.median,i)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${B(a.avg,i)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${B(a.min,i)} – ${B(a.max,i)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function Ot(e,t,a,i){const s=t.reduce((d,l)=>d+l.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      ${t.map(d=>{const l=s>0?Math.round(d.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${o(Ve(a,i,d.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${l}%"></div></div>
              <span class="admin-band-count">${d.count} (${l}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function Dt(e,t){const a=e==="quiz"?Ge:Ze;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,d])=>Rt(a[s]??s,s,d)).join("")}
        ${Object.entries(t.categorical).map(([s,d])=>Ot(a[s]??s,d,e,s)).join("")}
      </div>
    </section>
  `}async function Ne(e){_.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(E),a=r==="solicitud"||r==="quiz"||r==="pingtree"?[r]:["quiz","solicitud","pingtree"];try{const i=await Promise.all(a.map(s=>Lt(e,t,s)));_.innerHTML=`
      <div class="admin-shell">
        ${Y("fieldstats")}

        ${me(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,d)=>Dt(s,i[d])).join("")}
      </div>
    `,J(e),pe(e)}catch(i){const s=i instanceof Error?i.message:String(i);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),x("Tu sesión ha caducado o la contraseña ya no es válida.")):(_.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Ne(e)))}}const Ce=sessionStorage.getItem(j);Ce?D(Ce):x();
