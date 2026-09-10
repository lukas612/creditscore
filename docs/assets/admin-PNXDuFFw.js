import{C as Pe,c as Ce}from"./validation-DnU8phWm.js";import{q as Ae}from"./questions-D4Dn-9Ya.js";import{W as ae,S as $e}from"./witmeQuestions-CUfeMVUG.js";const be={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(Pe.map(e=>[e.id,e.name]))};function Y(e){if(e in be)return be[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function ye(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(n=>[n.value,n.label])));return t}const je=ye(Ae),qe=ye(ae),Oe={si:"Sí",no:"No"};function Re(e,t,a){const n=e==="quiz"?je[t]:qe[t];return(n==null?void 0:n[a])??Oe[a]??a}const xe={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},De={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Me=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","requestedAmount"]),Ne="https://pgyaigdsedkdqvhtexrz.supabase.co",ze="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",b=Ce(Ne,ze),j="cs_admin_pw",h=document.getElementById("admin-root");function Se(e){return e.toISOString().slice(0,10)}const Ee=new Date;let k="all",F=Se(Ee),H=Se(Ee),m="all";const J=10;let E=0;const K=10;let T=0;const X=10;let P=0;const ee=10;let C=0,z="dashboard";const Be={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},te={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree"};function Q(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${F}T00:00:00`),n=new Date(`${H}T23:59:59.999`);return a.getTime()>n.getTime()?{since:n.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:n.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const ge=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function Fe(e,t){return e==="all"?"Todo el histórico":`${ge.format(new Date(t.since))} – ${ge.format(new Date(t.until))}`}const He=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],We=ae.filter(e=>$e.includes(e.phase)),Qe=ae.filter(e=>!$e.includes(e.phase)),_e=e=>({key:e.key,label:e.label,conditional:!!e.condition}),Ue=[...We.map(_e),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...Qe.map(_e),{key:"application_completed",label:"✅ Termina la solicitud completa"}],D=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function x(e){return e==="all"?null:e}async function ke(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:x(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function Ve(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:x(a)}).single();if(s||!n)throw s??new Error("No data");return n}async function Ge(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:x(a)});if(s)throw s;return n??[]}async function Ze(e,t,a,n){const{data:s,error:d}=await b.rpc("admin_list_leads",{p_password:e,p_limit:J,p_offset:n*J,p_since:t.since,p_until:t.until,p_source:x(a)});if(d)throw d;return s??[]}async function Ye(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_applications",{p_password:e,p_limit:K,p_offset:t*K});if(n)throw n;return a??[]}async function Je(e,t){const{data:a,error:n}=await b.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:X,p_offset:t*X});if(n)throw n;return a??[]}async function Ke(e,t){const{data:a,error:n}=await b.rpc("admin_get_pingtree_applications",{p_password:e,p_limit:ee,p_offset:t*ee});if(n)throw n;return a??[]}async function Xe(e){const{data:t,error:a}=await b.rpc("admin_get_pingtree_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}async function et(e){const{data:t,error:a}=await b.rpc("admin_get_witme_response_stats",{p_password:e}).single();if(a||!t)throw a??new Error("No data");return t}function y(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function Z(e){return e==null?"—":`${e}%`}async function tt(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:x(a)});if(s)throw s;return n??[]}let Le=[];async function at(e){const{data:t,error:a}=await b.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function nt(e,t,a,n,s){const{error:d}=await b.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:n,p_active:s});if(d)throw d}async function it(e,t){const{error:a}=await b.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function st(e){const{error:t}=await b.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function ot(e,t,a){const{data:n,error:s}=await b.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return n}function q(e){h.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await ke(a,Q("all"),"all"),sessionStorage.setItem(j,a),A(a)}catch{q("Contraseña incorrecta.")}})}function r(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function M(e,t,a,n){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${n}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function he(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function dt(e,t,a){var g;const n=new Map(t.map(u=>[u.question_key,Number(u.reached)])),s=e.engaged_visits;let d="",c=(g=a[0])==null?void 0:g.key;return a.forEach((u,L)=>{const f=n.get(u.key)??0,v=s>0?Math.round(f/s*100):0;let l="";if(L>0&&!u.conditional){const $=n.get(c)??0;if($>0){const p=Math.round((1-f/$)*100),O=p>=25?"high":p>=10?"mid":"low";l=p>0?`<span class="funnel-drop funnel-drop-${O}">-${p}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}d+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${L+1}. ${o(u.label)}${u.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${f} · ${v}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${v}%"></div></div>
        ${l}
      </div>
    `,u.conditional||(c=u.key)}),d}function A(e){z==="scoring"?W(e):z==="fieldstats"?Ie(e):z==="leads"?S(e):we(e)}function U(e){return`
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
  `}function V(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{z=t.dataset.tab,A(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>A(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(j),q()})}function ne(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(te).map(t=>`<button class="admin-period-btn ${m===t?"active":""}" data-source="${t}">${te[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${k==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${k==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${k==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${k==="custom"?"active":""}">
        <input type="date" id="period-from" value="${F}" />
        <span>–</span>
        <input type="date" id="period-to" value="${H}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(Fe(k,e))}</p>
    </section>
  `}function ie(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{m=a.dataset.source,E=0,A(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{k=a.dataset.preset,E=0,A(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{F=document.getElementById("period-from").value||F,H=document.getElementById("period-to").value||H,k="custom",E=0,A(e)})}async function we(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Q(k);try{const[a,n,s,d]=await Promise.all([ke(e,t,m),Ve(e,t,m),Ge(e,t,m),tt(e,t,m)]),c=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,g=m==="solicitud"||m==="pingtree"?Ue:He;h.innerHTML=`
      <div class="admin-shell">
        ${U("dashboard")}

        ${ne(t)}

        <section class="admin-stats-grid">
          ${r("Leads totales (histórico)",String(a.total_leads))}
          ${r("Leads en el periodo",String(a.period_leads))}
          ${r("Sesiones en el periodo",String(a.period_sessions))}
          ${r("Tasa de conversión",`${a.period_conversion_rate}%`)}
          ${r("Score medio (periodo)",a.avg_score!=null?String(a.avg_score):"—")}
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
            ${r("Visitas",String(n.total_visits))}
            ${r("Rebote instantáneo",`${n.bounce_rate}%`)}
            ${r("Quiz → lead",`${n.quiz_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre el total de visitas (incluye rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Completan el quiz",`${n.visit_to_quiz_rate}%`)}
            ${r("Dejan sus datos (lead)",`${n.visit_to_lead_rate}%`)}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Sobre interesados reales (descuenta el rebote)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Completan el quiz",`${n.engaged_to_quiz_rate}%`)}
            ${r("Dejan sus datos (lead)",`${n.engaged_to_lead_rate}%`)}
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
                ${dt(n,s,g)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${M("Excelente",a.band_excelente,c,"band-excelente")}
          ${M("Bueno",a.band_bueno,c,"band-bueno")}
          ${M("Regular",a.band_regular,c,"band-regular")}
          ${M("Bajo",a.band_bajo,c,"band-bajo")}
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
                    <td>${o(Y(u.offer_id))}</td>
                    <td>${u.clicks}</td>
                  </tr>
                `).join("")}
                ${d.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,V(e),ie(e)}catch(a){const n=a instanceof Error?a.message:String(a);n.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(n)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>we(e)))}}async function S(e){var a,n,s,d,c,g,u,L,f,v;h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Q(k);try{const[l,$,p,O,G,I]=await Promise.all([Ze(e,t,m,E),Ye(e,T),et(e),Je(e,P),Ke(e,C),Xe(e)]),se=((a=l[0])==null?void 0:a.total_count)??0,oe=Math.max(1,Math.ceil(se/J)),de=((n=$[0])==null?void 0:n.total_count)??0,re=Math.max(1,Math.ceil(de/K)),ce=((s=O[0])==null?void 0:s.total_count)??0,le=Math.max(1,Math.ceil(ce/X)),ue=((d=G[0])==null?void 0:d.total_count)??0,me=Math.max(1,Math.ceil(ue/ee));h.innerHTML=`
      <div class="admin-shell">
        ${U("leads")}

        ${ne(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${se})</p>
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
                ${l.map(i=>`
                  <tr>
                    <td>${D.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.first_name)} ${o(i.last_name??"")}">${o(i.first_name)} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email)}">${o(i.email)}</div></td>
                    <td>${o(i.phone??"")}</td>
                    <td>${o(i.zip_code??"")}</td>
                    <td>${i.score??"—"}</td>
                    <td><span class="admin-badge band-${i.score_band??""}">${i.score_band??"—"}</span></td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${he(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${o(i.status)}</td>
                    <td>${o(i.source==="pingtree"?"Pingtree":te[i.source]??i.source)}</td>
                    <td>${i.source==="pingtree"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:i.source!=="solicitud"?'<span title="El quiz corto no envía a Witme">n/a</span>':i.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?i.offer_clicks.map(_=>o(Y(_))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${l.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${E===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${E+1} de ${oe}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${E+1>=oe?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        ${m==="all"||m==="solicitud"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme (${de})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Tiempo medio de respuesta",y(p.avg_ms))}
            ${r("Mediana",y(p.median_ms))}
            ${r("P95",y(p.p95_ms))}
            ${r("Máximo",y(p.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("% Aceptados (con oferta)",Z(p.pct_accepted))}
            ${r("% Rechazados por Witme",Z(p.pct_failed))}
            ${r("Con oferta",String(p.count_accepted))}
            ${r("Total solicitudes",String(p.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${p.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${p.count_error} terminaron
            en error de conexión con Witme${p.count_timeout>0?` y ${p.count_timeout} en timeout (de cuando sí cortábamos a los 20s)`:""}.
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
                ${$.map(i=>{const _=[];i.witme_message!=null&&_.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&_.push(`Redirect URL: ${i.witme_redirect_url}`);const w=_.join(`
`);return`
                  <tr>
                    <td>${D.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${y(i.witme_response_ms)}</td>
                    <td>${i.score??"—"}</td>
                    <td>${i.approval_probability!=null?`<span class="admin-badge ${he(i.approval_probability)}">${i.approval_probability}%</span>`:"—"}</td>
                    <td>${i.offer_clicks&&i.offer_clicks.length>0?`✅ ${i.offer_clicks.map(R=>o(Y(R))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${$.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-prev-btn" ${T===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${T+1} de ${re}</span>
            <button class="admin-btn-ghost" id="witme-next-btn" ${T+1>=re?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${ce})</p>
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
                ${O.map(i=>{const _=[];i.witme_message!=null&&_.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&_.push(`Redirect URL: ${i.witme_redirect_url}`);const w=_.join(`
`),R=i.product==="car_collateral+debt_consolidation"?"Aval coche + Reunificación deudas":i.product==="car_collateral"?"Aval coche":i.product==="debt_consolidation"?"Reunificación deudas":"—";return`
                  <tr>
                    <td>${D.format(new Date(i.created_at))}</td>
                    <td>${o(R)}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${i.requested_amount!=null?`${i.requested_amount} €`:"—"}</td>
                    <td>${i.witme_id??"—"}</td>
                    <td><span class="admin-badge ${i.witme_status==="processed"?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${o(i.witme_status??"—")}</span></td>
                    <td>${y(i.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${O.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${P===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${P+1} de ${le}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${P+1>=le?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}

        ${m==="all"||m==="pingtree"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Pingtree (${ue})</p>
          <p class="admin-card-sub">
            Versión independiente de la solicitud completa (<code>/pingtree.html</code>):
            usa solo el endpoint <code>servy-form-wait</code> con los servy_id 151
            (Creditio Pingtree), 154 (reunificación) y 171 (aval coche) juntos, y
            redirige directamente a la <code>redirectUrl</code> de Witme en vez de
            mostrar resultados propios.
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("Tiempo medio de respuesta",y(I.avg_ms))}
            ${r("Mediana",y(I.median_ms))}
            ${r("P95",y(I.p95_ms))}
            ${r("Máximo",y(I.max_ms))}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${r("% Aceptados (con redirectUrl)",Z(I.pct_accepted))}
            ${r("Con oferta",String(I.count_accepted))}
            ${r("Total solicitudes",String(I.count_total))}
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
                ${G.map(i=>{const _=[];i.witme_message!=null&&_.push(`Mensaje: ${JSON.stringify(i.witme_message)}`),i.witme_redirect_url&&_.push(`Redirect URL: ${i.witme_redirect_url}`);const w=_.join(`
`),R=i.response_status!=null,pe=i.witme_status==="processed",Te=i.witme_redirect_url!=null;return`
                  <tr>
                    <td>${D.format(new Date(i.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(i.name??"")} ${o(i.last_name??"")}">${o(i.name??"")} ${o(i.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(i.email??"")}">${o(i.email??"")}</div></td>
                    <td>${y(i.response_ms)}</td>
                    <td>${R?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td><span class="admin-badge ${pe?"band-excelente":"band-bajo"}" ${w?`title="${o(w)}"`:""}>${pe?"✅ Sí":"❌ No"}</span></td>
                    <td>${Te?`<span class="admin-badge band-excelente" title="${o(i.witme_redirect_url??"")}">✅ Sí</span>`:'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                  </tr>
                `}).join("")}
                ${G.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="pingtree-prev-btn" ${C===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${C+1} de ${me}</span>
            <button class="admin-btn-ghost" id="pingtree-next-btn" ${C+1>=me?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}
      </div>
    `,V(e),ie(e),document.getElementById("leads-prev-btn").addEventListener("click",()=>{E>0&&(E--,S(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{E++,S(e)}),(c=document.getElementById("witme-prev-btn"))==null||c.addEventListener("click",()=>{T>0&&(T--,S(e))}),(g=document.getElementById("witme-next-btn"))==null||g.addEventListener("click",()=>{T++,S(e)}),(u=document.getElementById("witme-car-prev-btn"))==null||u.addEventListener("click",()=>{P>0&&(P--,S(e))}),(L=document.getElementById("witme-car-next-btn"))==null||L.addEventListener("click",()=>{P++,S(e)}),(f=document.getElementById("pingtree-prev-btn"))==null||f.addEventListener("click",()=>{C>0&&(C--,S(e))}),(v=document.getElementById("pingtree-next-btn"))==null||v.addEventListener("click",()=>{C++,S(e)})}catch(l){const $=l instanceof Error?l.message:String(l);$.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o($)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>S(e)))}}function rt(e,t,a){return a?`${e} +`:`${e} – ${t}`}function B(e,t,a,n,s,d,c){return`
    <div class="scoring-slider-row">
      <span class="scoring-slider-label">${o(a)}</span>
      <input
        type="range"
        class="scoring-slider"
        min="${s}"
        max="${d}"
        step="${c}"
        value="${n}"
        data-rule-key="${e}"
        data-field="${t}"
      />
      <span class="scoring-slider-value">${n}</span>
    </div>
  `}function ct(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return B(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((n,s)=>B(e.key,`bucket:${s}`,rt(n[0],n[1],s===a.length-1),n[2],-200,200,5)).join("")}return Object.entries(t).map(([a,n])=>B(e.key,`opt:${a}`,a,Number(n),-200,200,5)).join("")}function lt(e){return`
    <div class="scoring-rule-card" data-rule-card="${e.key}">
      <div class="scoring-rule-header">
        <div>
          <p class="scoring-rule-label">${o(e.label)}</p>
          <p class="scoring-rule-used-by">Usado en: ${o(Be[e.key]??"—")} · clave: <code>${o(e.key)}</code></p>
        </div>
        <label class="scoring-rule-active">
          <input type="checkbox" data-field="active" ${e.active?"checked":""} />
          Regla activa
        </label>
      </div>
      ${B(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${ct(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function ut(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const n=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");n&&(n.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.saveRule,s=Le.find(l=>l.key===n),d=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!d)return;const c=d.querySelector(".scoring-rule-status"),g=new Map;d.querySelectorAll("input[data-field]").forEach(l=>{g.set(l.dataset.field,l.type==="checkbox"?String(l.checked):l.value)});const u=Number(g.get("weight")),L=g.get("active")==="true",f=s.config;let v;typeof f.value=="number"&&Object.keys(f).length===1?v={value:Number(g.get("value"))}:Array.isArray(f.buckets)?v={buckets:f.buckets.map((l,$)=>[l[0],l[1],Number(g.get(`bucket:${$}`))])}:(v={},Object.keys(f).forEach(l=>{v[l]=Number(g.get(`opt:${l}`))})),a.disabled=!0,c.textContent="Guardando…",c.className="scoring-rule-status";try{await nt(e,n,v,u,L),s.config=v,s.weight=u,s.active=L,c.textContent="✓ Guardado",c.className="scoring-rule-status ok",setTimeout(()=>{c.textContent=""},2500)}catch{c.textContent="Error al guardar",c.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const n=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${n}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const d=s.querySelector(".scoring-rule-status");a.disabled=!0,d.textContent="Restaurando…",d.className="scoring-rule-status";try{await it(e,n),await W(e)}catch{d.textContent="Error al restaurar",d.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await st(e),await W(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function W(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await at(e);Le=t,h.innerHTML=`
      <div class="admin-shell">
        ${U("scoring")}

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
          ${t.map(lt).join("")}
        </div>
      </div>
    `,V(e),ut(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>W(e)))}}const fe=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function N(e,t){return e==null?"—":t?`${fe.format(e)} €`:fe.format(e)}function mt(e,t,a){const n=Me.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${N(a.median,n)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${N(a.avg,n)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${N(a.min,n)} – ${N(a.max,n)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function pt(e,t,a,n){const s=t.reduce((d,c)=>d+c.count,0);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      ${t.map(d=>{const c=s>0?Math.round(d.count/s*100):0;return`
            <div class="admin-band-row">
              <span class="admin-band-label">${o(Re(a,n,d.value))}</span>
              <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${c}%"></div></div>
              <span class="admin-band-count">${d.count} (${c}%)</span>
            </div>
          `}).join("")}
      ${t.length===0?'<p class="fieldstat-count">Sin datos todavía.</p>':""}
    </div>
  `}function bt(e,t){const a=e==="quiz"?xe:De;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,d])=>mt(a[s]??s,s,d)).join("")}
        ${Object.entries(t.categorical).map(([s,d])=>pt(a[s]??s,d,e,s)).join("")}
      </div>
    </section>
  `}async function Ie(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Q(k),a=m==="solicitud"||m==="quiz"||m==="pingtree"?[m]:["quiz","solicitud","pingtree"];try{const n=await Promise.all(a.map(s=>ot(e,t,s)));h.innerHTML=`
      <div class="admin-shell">
        ${U("fieldstats")}

        ${ne(t)}

        <section class="admin-card">
          <p class="admin-card-title">Estadísticas de leads</p>
          <p class="admin-card-sub">
            Importes, deuda, edad y el resto de campos del formulario, agregados sobre el
            periodo y embudo seleccionados. La mediana pesa menos que la media cuando hay
            valores atípicos (alguien que escribe un importe absurdo, por ejemplo).
          </p>
        </section>

        ${a.map((s,d)=>bt(s,n[d])).join("")}
      </div>
    `,V(e),ie(e)}catch(n){const s=n instanceof Error?n.message:String(n);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(j),q("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Ie(e)))}}const ve=sessionStorage.getItem(j);ve?A(ve):q();
