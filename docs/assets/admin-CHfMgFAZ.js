import{c as ze}from"./index-DBuN83Yj.js";import{q as Be}from"./questions-D4Dn-9Ya.js";import{C as He}from"./validation-Cz5T3okC.js";import{W as ue,S as Te}from"./witmeQuestions-BqphOVtp.js";import{W as Ae,R as Re}from"./witmeQuestionsRo-DJoEYp7S.js";const Pe={witme_featured:"Witme (oferta destacada)",...Object.fromEntries(He.map(e=>[e.id,e.name]))};function se(e){if(e in Pe)return Pe[e];const t=e.match(/^witme_featured_(\d+)$/);return t?`Witme (oferta destacada ${t[1]})`:e}function xe(e){const t={};for(const a of e)a.options&&(t[a.key]=Object.fromEntries(a.options.map(i=>[i.value,i.label])));return t}const We=xe(Be),Ue=xe(ue),Qe={si:"Sí",no:"No"};function Ve(e,t,a){const i=e==="quiz"?We[t]:Ue[t];return(i==null?void 0:i[a])??Qe[a]??a}const Ge={ingreso_mensual:"Ingreso mensual",importe_total_de_la_deuda:"Deuda total (entre quienes tienen)",creditos_cantidad_a_solicitar:"Importe solicitado",age:"Edad",esta_en_asnef:"En ASNEF",antiguedad_laboral:"Antigüedad laboral",tienes_otros_creditos:"Tiene otras deudas",proposito_del_prestamo:"Propósito del préstamo",fuente_principal_de_ingreso:"Fuente de ingresos",tienes_vivienda_en_propiedad:"Vivienda en propiedad",en_cuantos_meses_deseas_devolverlo:"Plazo de devolución"},Xe={monthlyIncome:"Ingreso mensual",totalDebtAmount:"Deuda total (entre quienes tienen)",monthlyDebtPayment:"Cuota mensual de deudas (entre quienes tienen)",requestedAmount:"Importe solicitado",numberOfdependents:"Personas a cargo",age:"Edad",incomeSource:"Fuente de ingresos",hasOwnedHouse:"Situación de vivienda",badCreditHistory:"En ASNEF",hasOtherLoans:"Tiene otras deudas",loanPurpose:"Propósito del préstamo",hasOwnVehicle:"Tiene vehículo propio",hasBankAccount:"Tiene cuenta bancaria",maritalStatus:"Estado civil",educationLevel:"Nivel de estudios",gender:"Género",countryOfBirth:"País de nacimiento",state:"Comunidad autónoma"},Ze=new Set(["ingreso_mensual","importe_total_de_la_deuda","creditos_cantidad_a_solicitar","monthlyIncome","totalDebtAmount","monthlyDebtPayment","requestedAmount"]),Ye="https://pgyaigdsedkdqvhtexrz.supabase.co",Je="sb_publishable_yL99vHU_H5kGZ3SMuPS0hA_GJ_TWTMr",_=ze(Ye,Je),D="cs_admin_pw",h=document.getElementById("admin-root");function Oe(e){return e.toISOString().slice(0,10)}const De=new Date;let k="all",Q=Oe(De),V=Oe(De),r="all";function Ke(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"RO":e==="solicitud"||e==="pingtree"||e==="quiz"?"ES":null}function et(e){return e==="multiping_ro"||e==="pingtree_ro"||e==="credit_ro"?"LEI":"€"}const oe=10;let E=0;const re=10;let T=0;const de=10;let A=0;const ce=10;let R=0;const le=10;let x=0,W="dashboard";const tt={base:"Quiz corto + Solicitud",ingreso_mensual:"Quiz corto + Solicitud",otros_creditos:"Quiz corto + Solicitud",asnef:"Quiz corto + Solicitud",ratio_deuda_ingreso:"Quiz corto + Solicitud",edad:"Quiz corto + Solicitud",fuente_ingreso:"Quiz corto",antiguedad_laboral:"Quiz corto",vivienda_propiedad:"Quiz corto",solicitud_fuente_ingreso:"Solicitud",solicitud_antiguedad:"Solicitud",solicitud_vivienda:"Solicitud",solicitud_dependientes:"Solicitud",aprobacion_base:"Probabilidad de aprobación (quiz + solicitud)",aprobacion_ratio_importe:"Probabilidad de aprobación (quiz + solicitud)"},z={all:"Todos",quiz:"Quiz corto",solicitud:"Solicitud completa",pingtree:"Pingtree",multiping_ro:"Multiping RO",pingtree_ro:"Pingtree RO",credit_ro:"Credit RO",credito_claro_mx:"Scorea (MX)",credito_claro_mx_pro:"Scorea Pro (MX)",credito_claro_mx_resultado:"Scorea Resultado (MX)",credito_claro_mx_resultado_v2:"Scorea Resultado V2 (MX)"};function Z(e){const t=new Date;if(e==="today")return{since:new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).toISOString(),until:t.toISOString()};if(e==="7d")return{since:new Date(t.getTime()-6048e5).toISOString(),until:t.toISOString()};if(e==="custom"){const a=new Date(`${Q}T00:00:00`),i=new Date(`${V}T23:59:59.999`);return a.getTime()>i.getTime()?{since:i.toISOString(),until:a.toISOString()}:{since:a.toISOString(),until:i.toISOString()}}return{since:"2000-01-01T00:00:00.000Z",until:t.toISOString()}}const Ie=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"short",year:"numeric"});function at(e,t){return e==="all"?"Todo el histórico":`${Ie.format(new Date(t.since))} – ${Ie.format(new Date(t.until))}`}const nt=[{key:"fecha_de_nacimiento",label:"Fecha de nacimiento"},{key:"codigo_postal",label:"Código postal"},{key:"fuente_principal_de_ingreso",label:"Fuente de ingresos"},{key:"antiguedad_laboral",label:"Antigüedad laboral",conditional:!0},{key:"tienes_vivienda_en_propiedad",label:"Vivienda en propiedad"},{key:"ingreso_mensual",label:"Ingreso mensual"},{key:"esta_en_asnef",label:"Asnef"},{key:"tienes_otros_creditos",label:"Otros créditos"},{key:"importe_total_de_la_deuda",label:"Importe de la deuda",conditional:!0},{key:"proposito_del_prestamo",label:"Propósito del préstamo"},{key:"creditos_cantidad_a_solicitar",label:"Importe a solicitar"},{key:"en_cuantos_meses_deseas_devolverlo",label:"Plazo de devolución"}],it=ue.filter(e=>Te.includes(e.phase)),st=ue.filter(e=>!Te.includes(e.phase)),G=e=>({key:e.key,label:e.label,conditional:!!e.condition}),ot=[...it.map(G),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...st.map(G),{key:"application_completed",label:"✅ Termina la solicitud completa"}],rt=Ae.filter(e=>Re.includes(e.phase)),dt=Ae.filter(e=>!Re.includes(e.phase)),ct=[...rt.map(G),{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},...dt.map(G),{key:"application_completed",label:"✅ Termina la solicitud completa"}],lt=[{key:"requestedAmount_loanPurpose",label:"Importe y propósito del préstamo"},{key:"gate_contact",label:"Deja sus datos de contacto (nombre, email, teléfono)"},{key:"financial_details",label:"Detalles financieros (nacimiento, ingresos, estado civil)"},{key:"final_details",label:"Últimos datos (CNP, ciudad, dirección)"},{key:"application_completed",label:"✅ Termina la solicitud"}],ut=[{key:"activo",label:"¿Tiene crédito activo?"},{key:"atrasos",label:"Atrasos en pagos (12 meses)"},{key:"uso",label:"Uso del límite de crédito"},{key:"antiguedad",label:"Antigüedad del crédito más viejo"},{key:"solicitudes",label:"Solicitudes de crédito recientes"},{key:"application_completed",label:"✅ Termina el quiz"}],mt=[{key:"application_completed",label:"✅ Ve su resultado"}],pt=[{key:"activo",label:"¿Tiene crédito activo?"},{key:"atrasos",label:"Atrasos en pagos (12 meses)"},{key:"uso",label:"Uso del límite de crédito"},{key:"endeudamiento",label:"% de ingreso en pagar deudas"},{key:"antiguedad",label:"Antigüedad del crédito más viejo"},{key:"tipos",label:"Variedad de productos de crédito"},{key:"solicitudes",label:"Solicitudes de crédito recientes"},{key:"gate_contact",label:"Deja su email para ver el score completo"},{key:"application_completed",label:"✅ Termina el análisis"}],F=new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});function o(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function M(e){return e==="all"?null:e}async function _t(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_credito_claro_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a}).single();if(s||!i)throw s??new Error("No data");return i}async function bt(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_price_variant_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return i??[]}async function Me(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)}).single();if(s||!i)throw s??new Error("No data");return i}async function gt(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_funnel_overview",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)}).single();if(s||!i)throw s??new Error("No data");return i}async function ht(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_funnel_steps",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)});if(s)throw s;return i??[]}async function vt(e,t,a,i){const{data:s,error:d}=await _.rpc("admin_list_leads",{p_password:e,p_limit:oe,p_offset:i*oe,p_since:t.since,p_until:t.until,p_source:M(a)});if(d)throw d;return s??[]}async function ft(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_witme_applications",{p_password:e,p_limit:re,p_offset:t*re,p_source:a});if(s)throw s;return i??[]}async function $t(e,t){const{data:a,error:i}=await _.rpc("admin_get_witme_car_applications",{p_password:e,p_limit:de,p_offset:t*de});if(i)throw i;return a??[]}async function yt(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_pingtree_applications",{p_password:e,p_limit:ce,p_offset:t*ce,p_country:a});if(s)throw s;return i??[]}async function St(e,t,a,i){const{data:s,error:d}=await _.rpc("admin_get_credito_claro_orders",{p_password:e,p_since:t.since,p_until:t.until,p_limit:le,p_offset:a*le,p_source:i});if(d)throw d;return s??[]}async function Et(e,t){const{data:a,error:i}=await _.rpc("admin_get_pingtree_response_stats",{p_password:e,p_country:t}).single();if(i||!a)throw i??new Error("No data");return a}async function kt(e,t){const{data:a,error:i}=await _.rpc("admin_get_witme_response_stats",{p_password:e,p_source:t}).single();if(i||!a)throw i??new Error("No data");return a}function y(e){return e==null?"—":`${(e/1e3).toFixed(1)} s`}function ie(e){return e==null?"—":`${e}%`}async function Pt(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_offer_clicks",{p_password:e,p_since:t.since,p_until:t.until,p_source:M(a)});if(s)throw s;return i??[]}let je=[];async function It(e){const{data:t,error:a}=await _.rpc("admin_get_scoring_rules",{p_password:e});if(a)throw a;return t??[]}async function Lt(e,t,a,i,s){const{error:d}=await _.rpc("admin_update_scoring_rule",{p_password:e,p_key:t,p_config:a,p_weight:i,p_active:s});if(d)throw d}async function wt(e,t){const{error:a}=await _.rpc("admin_reset_scoring_rule",{p_password:e,p_key:t});if(a)throw a}async function Ct(e){const{error:t}=await _.rpc("admin_reset_all_scoring_rules",{p_password:e});if(t)throw t}async function Tt(e,t,a){const{data:i,error:s}=await _.rpc("admin_get_field_stats",{p_password:e,p_since:t.since,p_until:t.until,p_source:a});if(s)throw s;return i}function j(e){h.innerHTML=`
    <div class="admin-login-shell">
      <form class="admin-login-card" id="login-form">
        <h1>Panel interno</h1>
        <p class="admin-sub">Creditio Credit Score &middot; acceso restringido</p>
        <input type="password" id="pw-input" placeholder="Contraseña" autocomplete="current-password" required />
        ${e?`<p class="admin-error">${o(e)}</p>`:""}
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("pw-input").value;try{await Me(a,Z("all"),"all"),sessionStorage.setItem(D,a),O(a)}catch{j("Contraseña incorrecta.")}})}function c(e,t){return`<div class="admin-stat"><span class="admin-stat-value">${t}</span><span class="admin-stat-label">${e}</span></div>`}function B(e,t,a,i){const s=a>0?Math.round(t/a*100):0;return`
    <div class="admin-band-row">
      <span class="admin-band-label">${e}</span>
      <div class="admin-band-track"><div class="admin-band-fill ${i}" style="width:${s}%"></div></div>
      <span class="admin-band-count">${t}</span>
    </div>
  `}function Le(e){return e>=60?"band-excelente":e>=35?"band-bueno":e>=15?"band-regular":"band-bajo"}function At(e,t,a){var b;const i=new Map(t.map(m=>[m.question_key,Number(m.reached)])),s=e.engaged_visits;let d="",l=(b=a[0])==null?void 0:b.key;return a.forEach((m,S)=>{const u=i.get(m.key)??0,v=s>0?Math.round(u/s*100):0;let p="";if(S>0&&!m.conditional){const L=i.get(l)??0;if(L>0){const w=Math.round((1-u/L)*100),P=w>=25?"high":w>=10?"mid":"low";p=w>0?`<span class="funnel-drop funnel-drop-${P}">-${w}% respecto al paso anterior</span>`:'<span class="funnel-drop funnel-drop-low">sin caída</span>'}}d+=`
      <div class="funnel-step">
        <div class="funnel-step-top">
          <span class="funnel-step-label">${S+1}. ${o(m.label)}${m.conditional?' <span class="funnel-conditional">(condicional, no todos la ven)</span>':""}</span>
          <span class="funnel-step-count">${u} · ${v}%</span>
        </div>
        <div class="admin-band-track"><div class="admin-band-fill funnel-fill" style="width:${v}%"></div></div>
        ${p}
      </div>
    `,m.conditional||(l=m.key)}),d}function O(e){W==="scoring"?X(e):W==="fieldstats"?Fe(e):W==="leads"?$(e):qe(e)}function Y(e){return`
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
  `}function J(e){document.querySelectorAll(".admin-tab-btn").forEach(t=>{t.addEventListener("click",()=>{W=t.dataset.tab,O(e)})}),document.getElementById("refresh-btn").addEventListener("click",()=>O(e)),document.getElementById("logout-btn").addEventListener("click",()=>{sessionStorage.removeItem(D),j()})}function me(e){return`
    <section class="admin-card admin-source-bar">
      <span class="admin-source-label">Embudo:</span>
      <div class="admin-period-presets">
        ${Object.keys(z).map(t=>`<button class="admin-period-btn ${r===t?"active":""}" data-source="${t}">${z[t]}</button>`).join("")}
      </div>
    </section>

    <section class="admin-card admin-period-bar">
      <div class="admin-period-presets">
        <button class="admin-period-btn ${k==="today"?"active":""}" data-preset="today">Hoy</button>
        <button class="admin-period-btn ${k==="7d"?"active":""}" data-preset="7d">7 días</button>
        <button class="admin-period-btn ${k==="all"?"active":""}" data-preset="all">Todo</button>
      </div>
      <div class="admin-period-custom ${k==="custom"?"active":""}">
        <input type="date" id="period-from" value="${Q}" />
        <span>–</span>
        <input type="date" id="period-to" value="${V}" />
        <button class="admin-btn-ghost" id="period-apply-btn">Aplicar</button>
      </div>
      <p class="admin-period-label">${o(at(k,e))}</p>
    </section>
  `}function pe(e){var t;document.querySelectorAll(".admin-period-btn[data-source]").forEach(a=>{a.addEventListener("click",()=>{r=a.dataset.source,E=0,O(e)})}),document.querySelectorAll(".admin-period-btn[data-preset]").forEach(a=>{a.addEventListener("click",()=>{k=a.dataset.preset,E=0,O(e)})}),(t=document.getElementById("period-apply-btn"))==null||t.addEventListener("click",()=>{Q=document.getElementById("period-from").value||Q,V=document.getElementById("period-to").value||V,k="custom",E=0,O(e)})}async function qe(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(k);try{const[a,i,s,d,l,b]=await Promise.all([Me(e,t,r),gt(e,t,r),ht(e,t,r),Pt(e,t,r),r==="credito_claro_mx"||r==="credito_claro_mx_pro"||r==="credito_claro_mx_resultado"||r==="credito_claro_mx_resultado_v2"?_t(e,t,M(r)):Promise.resolve(null),r==="credito_claro_mx_resultado"||r==="credito_claro_mx_resultado_v2"?bt(e,t,r):Promise.resolve(null)]),m=a.band_excelente+a.band_bueno+a.band_regular+a.band_bajo,S=r==="solicitud"||r==="pingtree"?ot:r==="multiping_ro"||r==="pingtree_ro"?ct:r==="credit_ro"?lt:r==="credito_claro_mx"?ut:r==="credito_claro_mx_pro"?pt:r==="credito_claro_mx_resultado"||r==="credito_claro_mx_resultado_v2"?mt:nt;h.innerHTML=`
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

        ${l?`
        <section class="admin-card">
          <p class="admin-card-title">Altas ${o(z[r])} · guía PDF (periodo seleccionado)</p>
          <p class="admin-card-sub">
            "Alta" = alguien que llegó a dejar su email para comprar la guía (crea una
            orden en <code>credito_claro_orders</code>), compre o no llegue a pagar.
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Altas (total pedidos)",String(l.total_orders))}
            ${c("Pagados",String(l.paid_orders))}
            ${c("Pendientes",String(l.pending_orders))}
            ${c("Tasa de pago",`${l.conversion_rate}%`)}
          </section>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Ingresos (pagados)",`$${(l.revenue_cents/100).toFixed(2)} MXN`)}
            ${c("Fallidos/expirados",String(l.failed_orders))}
          </section>
        </section>
        `:""}

        ${b?`
        <section class="admin-card">
          <p class="admin-card-title">A/B test de precios ($49 / $149 / $299)</p>
          <p class="admin-card-sub">
            "Sesiones" = visitantes a los que les tocó esa variante (hayan comprado o no).
            La tasa de conversión compara eso contra pagos reales - es la métrica que
            importa para decidir el precio, no solo la tasa de pago entre quien ya
            empezó el checkout.
          </p>
          <table class="admin-table">
            <thead><tr><th>Precio</th><th>Sesiones</th><th>Pagados</th><th>Conversión</th><th>Ingresos</th></tr></thead>
            <tbody>
              ${b.map(u=>`<tr>
                    <td>$${(u.price_cents/100).toFixed(0)} MXN</td>
                    <td>${u.sessions}</td>
                    <td>${u.paid_orders}</td>
                    <td>${u.conversion_rate}%</td>
                    <td>$${(u.revenue_cents/100).toFixed(2)} MXN</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>
        `:""}

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
                ${At(i,s,S)}`}
        </section>

        <section class="admin-card">
          <p class="admin-card-title">Distribución por banda</p>
          ${B("Excelente",a.band_excelente,m,"band-excelente")}
          ${B("Bueno",a.band_bueno,m,"band-bueno")}
          ${B("Regular",a.band_regular,m,"band-regular")}
          ${B("Bajo",a.band_bajo,m,"band-bajo")}
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
                    <td>${o(se(u.offer_id))}</td>
                    <td>${u.clicks}</td>
                  </tr>
                `).join("")}
                ${d.length===0?'<tr><td colspan="2" class="admin-empty">Todavía no hay clics registrados.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,J(e),pe(e)}catch(a){const i=a instanceof Error?a.message:String(a);i.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(D),j("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(i)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>qe(e)))}}async function $(e){var a,i,s,d,l,b,m,S,u,v,p,L,w;h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(k);try{const P=Ke(r),q=M(r),[K,ee,f,te,ae,C,ne]=await Promise.all([vt(e,t,r,E),ft(e,T,q),kt(e,q),$t(e,A),yt(e,R,P),Et(e,P),St(e,t,x,q)]),_e=((a=K[0])==null?void 0:a.total_count)??0,be=Math.max(1,Math.ceil(_e/oe)),ge=((i=ee[0])==null?void 0:i.total_count)??0,he=Math.max(1,Math.ceil(ge/re)),ve=((s=te[0])==null?void 0:s.total_count)??0,fe=Math.max(1,Math.ceil(ve/de)),$e=((d=ae[0])==null?void 0:d.total_count)??0,ye=Math.max(1,Math.ceil($e/ce)),Se=((l=ne[0])==null?void 0:l.total_count)??0,Ee=Math.max(1,Math.ceil(Se/le));h.innerHTML=`
      <div class="admin-shell">
        ${Y("leads")}

        ${me(t)}

        <section class="admin-card">
          <p class="admin-card-title">Leads (${_e})</p>
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
                    <td>${F.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.first_name??"")} ${o(n.last_name??"")}">${o(n.first_name??"—")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email)}">${o(n.email)}</div></td>
                    <td>${o(n.phone??"")}</td>
                    <td>${o(n.zip_code??"")}</td>
                    <td>${n.score??"—"}</td>
                    <td><span class="admin-badge band-${n.score_band??""}">${n.score_band??"—"}</span></td>
                    <td>${n.approval_probability!=null?`<span class="admin-badge ${Le(n.approval_probability)}">${n.approval_probability}%</span>`:"—"}</td>
                    <td>${o(n.status)}</td>
                    <td>${o(n.source==="pingtree"?"Pingtree":z[n.source]??n.source)}</td>
                    <td>${n.source==="pingtree"||n.source==="pingtree_ro"?`<span title="Este flujo usa solo la API pingtree - ver sección 'Solicitudes enviadas a Pingtree'">Ver Pingtree</span>`:n.source!=="solicitud"&&n.source!=="multiping_ro"&&n.source!=="credit_ro"?'<span title="El quiz corto no envía a Witme">n/a</span>':n.witme_submitted?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo" title="No completó el formulario de identidad/domicilio/vehículo que exige Witme">❌ No</span>'}</td>
                    <td>${n.offer_clicks&&n.offer_clicks.length>0?n.offer_clicks.map(g=>o(se(g))).join(", "):"—"}</td>
                  </tr>
                `).join("")}
                ${K.length===0?'<tr><td colspan="12" class="admin-empty">Todavía no hay leads.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="leads-prev-btn" ${E===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${E+1} de ${be}</span>
            <button class="admin-btn-ghost" id="leads-next-btn" ${E+1>=be?"disabled":""}>Siguiente →</button>
          </div>
        </section>

        ${r==="all"||r==="solicitud"||r==="multiping_ro"||r==="credit_ro"?`
        <section class="admin-card">
          <p class="admin-card-title">Solicitudes enviadas a Witme${r==="multiping_ro"||r==="credit_ro"?" · Rumanía":r==="solicitud"?" · España":""} (${ge})</p>
          <p class="admin-card-sub">
            Copia propia de cada envío a la API de Witme, con su respuesta, el score y la
            probabilidad de aprobación de ese lead, y si hizo click en la oferta que se le
            presentó (la destacada de Witme si hubo <code>redirectUrl</code>, o alguna de
            las estáticas si no).
          </p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("Tiempo medio de respuesta",y(f.avg_ms))}
            ${c("Mediana",y(f.median_ms))}
            ${c("P95",y(f.p95_ms))}
            ${c("Máximo",y(f.max_ms))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">Tasa de aceptación (histórico completo)</p>
          <section class="admin-stats-grid admin-stats-grid-compact">
            ${c("% Aceptados (con oferta)",ie(f.pct_accepted))}
            ${c("% Rechazados por Witme",ie(f.pct_failed))}
            ${c("Con oferta",String(f.count_accepted))}
            ${c("Total solicitudes",String(f.total_applications))}
          </section>
          <p class="admin-card-sub admin-card-sub-tight">
            Sobre ${f.count_with_timing} intentos con tiempo registrado
            (histórico completo, no solo el periodo/página actual). ${f.count_error} terminaron
            en error de conexión con Witme${f.count_timeout>0?` y ${f.count_timeout} en timeout (de cuando sí cortábamos a los 20s)`:""}.
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
                ${ee.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const I=g.join(`
`);return`
                  <tr>
                    <td>${F.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} ${et(r)}`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}" ${I?`title="${o(I)}"`:""}>${o(n.witme_status??"—")}</span></td>
                    <td>${y(n.witme_response_ms)}</td>
                    <td>${n.score??"—"}</td>
                    <td>${n.approval_probability!=null?`<span class="admin-badge ${Le(n.approval_probability)}">${n.approval_probability}%</span>`:"—"}</td>
                    <td>${n.offer_clicks&&n.offer_clicks.length>0?`✅ ${n.offer_clicks.map(N=>o(se(N))).join(", ")}`:"—"}</td>
                  </tr>
                `}).join("")}
                ${ee.length===0?'<tr><td colspan="10" class="admin-empty">Todavía no hay solicitudes enviadas a Witme.</td></tr>':""}
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
          <p class="admin-card-title">Solicitudes enviadas a Witme · aval coche / reunificación (${ve})</p>
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
                ${te.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const I=g.join(`
`),N=n.product==="car_collateral+debt_consolidation"?"Aval coche + Reunificación deudas":n.product==="car_collateral"?"Aval coche":n.product==="debt_consolidation"?"Reunificación deudas":"—";return`
                  <tr>
                    <td>${F.format(new Date(n.created_at))}</td>
                    <td>${o(N)}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${n.requested_amount!=null?`${n.requested_amount} €`:"—"}</td>
                    <td>${n.witme_id??"—"}</td>
                    <td><span class="admin-badge ${n.witme_status==="processed"?"band-excelente":"band-bajo"}" ${I?`title="${o(I)}"`:""}>${o(n.witme_status??"—")}</span></td>
                    <td>${y(n.response_ms)}</td>
                  </tr>
                `}).join("")}
                ${te.length===0?'<tr><td colspan="8" class="admin-empty">Todavía no hay solicitudes de estos productos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="witme-car-prev-btn" ${A===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${A+1} de ${fe}</span>
            <button class="admin-btn-ghost" id="witme-car-next-btn" ${A+1>=fe?"disabled":""}>Siguiente →</button>
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
            ${c("% Aceptados (con redirectUrl)",ie(C.pct_accepted))}
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
                ${ae.map(n=>{const g=[];n.witme_message!=null&&g.push(`Mensaje: ${JSON.stringify(n.witme_message)}`),n.witme_redirect_url&&g.push(`Redirect URL: ${n.witme_redirect_url}`);const I=g.join(`
`),N=n.response_status!=null,ke=n.witme_status==="processed",Ne=n.witme_redirect_url!=null;return`
                  <tr>
                    <td>${F.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.name??"")} ${o(n.last_name??"")}">${o(n.name??"")} ${o(n.last_name??"")}</div></td>
                    <td><div class="admin-table-name-cell" title="${o(n.email??"")}">${o(n.email??"")}</div></td>
                    <td>${y(n.response_ms)}</td>
                    <td>${N?'<span class="admin-badge band-excelente">✅ Sí</span>':'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                    <td><span class="admin-badge ${ke?"band-excelente":"band-bajo"}" ${I?`title="${o(I)}"`:""}>${ke?"✅ Sí":"❌ No"}</span></td>
                    <td>${Ne?`<span class="admin-badge band-excelente" title="${o(n.witme_redirect_url??"")}">✅ Sí</span>`:'<span class="admin-badge band-bajo">❌ No</span>'}</td>
                  </tr>
                `}).join("")}
                ${ae.length===0?'<tr><td colspan="7" class="admin-empty">Todavía no hay solicitudes de Pingtree.</td></tr>':""}
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

        ${r==="all"||r==="credito_claro_mx"||r==="credito_claro_mx_pro"||r==="credito_claro_mx_resultado"||r==="credito_claro_mx_resultado_v2"?`
        <section class="admin-card">
          <p class="admin-card-title">Pedidos ${o(z[r])} · guía PDF (${Se})</p>
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
                ${ne.map(n=>`
                  <tr>
                    <td>${F.format(new Date(n.created_at))}</td>
                    <td><div class="admin-table-name-cell" title="${o(n.email)}">${o(n.email)}</div></td>
                    <td>${(n.amount_cents/100).toFixed(2)} ${o(n.currency)}</td>
                    <td><span class="admin-badge ${n.status==="paid"?"band-excelente":n.status==="pending"?"band-regular":"band-bajo"}">${o(n.status)}</span></td>
                    <td>${n.paid_at?F.format(new Date(n.paid_at)):"—"}</td>
                    <td>${n.score!=null?`${n.score} (${o(n.score_band??"")})`:"—"}</td>
                  </tr>
                `).join("")}
                ${ne.length===0?'<tr><td colspan="6" class="admin-empty">Todavía no hay pedidos.</td></tr>':""}
              </tbody>
            </table>
          </div>
          <div class="admin-pagination">
            <button class="admin-btn-ghost" id="credito-claro-prev-btn" ${x===0?"disabled":""}>← Anterior</button>
            <span class="admin-pagination-label">Página ${x+1} de ${Ee}</span>
            <button class="admin-btn-ghost" id="credito-claro-next-btn" ${x+1>=Ee?"disabled":""}>Siguiente →</button>
          </div>
        </section>
        `:""}
      </div>
    `,J(e),pe(e),(b=document.getElementById("credito-claro-prev-btn"))==null||b.addEventListener("click",()=>{x>0&&(x--,$(e))}),(m=document.getElementById("credito-claro-next-btn"))==null||m.addEventListener("click",()=>{x++,$(e)}),document.getElementById("leads-prev-btn").addEventListener("click",()=>{E>0&&(E--,$(e))}),document.getElementById("leads-next-btn").addEventListener("click",()=>{E++,$(e)}),(S=document.getElementById("witme-prev-btn"))==null||S.addEventListener("click",()=>{T>0&&(T--,$(e))}),(u=document.getElementById("witme-next-btn"))==null||u.addEventListener("click",()=>{T++,$(e)}),(v=document.getElementById("witme-car-prev-btn"))==null||v.addEventListener("click",()=>{A>0&&(A--,$(e))}),(p=document.getElementById("witme-car-next-btn"))==null||p.addEventListener("click",()=>{A++,$(e)}),(L=document.getElementById("pingtree-prev-btn"))==null||L.addEventListener("click",()=>{R>0&&(R--,$(e))}),(w=document.getElementById("pingtree-next-btn"))==null||w.addEventListener("click",()=>{R++,$(e)})}catch(P){const q=P instanceof Error?P.message:String(P);q.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(D),j("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el panel: ${o(q)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>$(e)))}}function Rt(e,t,a){return a?`${e} +`:`${e} – ${t}`}function U(e,t,a,i,s,d,l){return`
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
  `}function xt(e){const t=e.config;if(typeof t.value=="number"&&Object.keys(t).length===1)return U(e.key,"value","Puntos base",t.value,300,850,5);if(Array.isArray(t.buckets)){const a=t.buckets;return a.map((i,s)=>U(e.key,`bucket:${s}`,Rt(i[0],i[1],s===a.length-1),i[2],-200,200,5)).join("")}return Object.entries(t).map(([a,i])=>U(e.key,`opt:${a}`,a,Number(i),-200,200,5)).join("")}function Ot(e){return`
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
      ${U(e.key,"weight","Peso (multiplica todos los puntos de esta regla)",Number(e.weight),0,3,.1)}
      <div class="scoring-rule-fields">
        ${xt(e)}
      </div>
      <div class="scoring-rule-footer">
        <button class="admin-btn-ghost" data-save-rule="${e.key}">Guardar cambios</button>
        <button class="admin-btn-ghost" data-reset-rule="${e.key}">↺ Restaurar por defecto</button>
        <span class="scoring-rule-status"></span>
      </div>
    </div>
  `}function Dt(e){var t;document.querySelectorAll(".scoring-slider").forEach(a=>{a.addEventListener("input",()=>{var s;const i=(s=a.closest(".scoring-slider-row"))==null?void 0:s.querySelector(".scoring-slider-value");i&&(i.textContent=a.value)})}),document.querySelectorAll("[data-save-rule]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.saveRule,s=je.find(p=>p.key===i),d=document.querySelector(`[data-rule-card="${i}"]`);if(!s||!d)return;const l=d.querySelector(".scoring-rule-status"),b=new Map;d.querySelectorAll("input[data-field]").forEach(p=>{b.set(p.dataset.field,p.type==="checkbox"?String(p.checked):p.value)});const m=Number(b.get("weight")),S=b.get("active")==="true",u=s.config;let v;typeof u.value=="number"&&Object.keys(u).length===1?v={value:Number(b.get("value"))}:Array.isArray(u.buckets)?v={buckets:u.buckets.map((p,L)=>[p[0],p[1],Number(b.get(`bucket:${L}`))])}:(v={},Object.keys(u).forEach(p=>{v[p]=Number(b.get(`opt:${p}`))})),a.disabled=!0,l.textContent="Guardando…",l.className="scoring-rule-status";try{await Lt(e,i,v,m,S),s.config=v,s.weight=m,s.active=S,l.textContent="✓ Guardado",l.className="scoring-rule-status ok",setTimeout(()=>{l.textContent=""},2500)}catch{l.textContent="Error al guardar",l.className="scoring-rule-status error"}finally{a.disabled=!1}})}),document.querySelectorAll("[data-reset-rule]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.resetRule,s=document.querySelector(`[data-rule-card="${i}"]`);if(!s||!confirm("¿Restaurar esta regla a sus valores por defecto? Se aplicará de inmediato."))return;const d=s.querySelector(".scoring-rule-status");a.disabled=!0,d.textContent="Restaurando…",d.className="scoring-rule-status";try{await wt(e,i),await X(e)}catch{d.textContent="Error al restaurar",d.className="scoring-rule-status error",a.disabled=!1}})}),(t=document.getElementById("reset-all-rules-btn"))==null||t.addEventListener("click",async()=>{if(confirm("¿Restaurar TODAS las reglas de scoring a sus valores por defecto? Esto sobrescribe cualquier ajuste manual y se aplica de inmediato a las puntuaciones reales."))try{await Ct(e),await X(e)}catch{alert("No se ha podido restaurar. Inténtalo de nuevo.")}})}async function X(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';try{const t=await It(e);je=t,h.innerHTML=`
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
          ${t.map(Ot).join("")}
        </div>
      </div>
    `,J(e),Dt(e)}catch(t){const a=t instanceof Error?t.message:String(t);a.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(D),j("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando el algoritmo: ${o(a)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>X(e)))}}const we=new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});function H(e,t){return e==null?"—":t?`${we.format(e)} €`:we.format(e)}function Mt(e,t,a){const i=Ze.has(t);return`
    <div class="fieldstat-card">
      <p class="fieldstat-label">${o(e)}</p>
      <div class="fieldstat-row"><span>Mediana</span><strong>${H(a.median,i)}</strong></div>
      <div class="fieldstat-row"><span>Media</span><strong>${H(a.avg,i)}</strong></div>
      <div class="fieldstat-row"><span>Rango</span><strong>${H(a.min,i)} – ${H(a.max,i)}</strong></div>
      <p class="fieldstat-count">${a.count} respuestas</p>
    </div>
  `}function jt(e,t,a,i){const s=t.reduce((d,l)=>d+l.count,0);return`
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
  `}function qt(e,t){const a=e==="quiz"?Ge:Xe;return`
    <section class="admin-card">
      <p class="admin-card-title">${e==="solicitud"?"Solicitud completa":e==="pingtree"?"Pingtree":"Quiz corto"} (${t.count} sesiones)</p>
      <div class="fieldstats-grid">
        ${Object.entries(t.numeric).map(([s,d])=>Mt(a[s]??s,s,d)).join("")}
        ${Object.entries(t.categorical).map(([s,d])=>jt(a[s]??s,d,e,s)).join("")}
      </div>
    </section>
  `}async function Fe(e){h.innerHTML='<div class="admin-shell"><p class="admin-loading">Cargando…</p></div>';const t=Z(k),a=r==="solicitud"||r==="quiz"||r==="pingtree"?[r]:["quiz","solicitud","pingtree"];try{const i=await Promise.all(a.map(s=>Tt(e,t,s)));h.innerHTML=`
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

        ${a.map((s,d)=>qt(s,i[d])).join("")}
      </div>
    `,J(e),pe(e)}catch(i){const s=i instanceof Error?i.message:String(i);s.toLowerCase().includes("unauthorized")?(sessionStorage.removeItem(D),j("Tu sesión ha caducado o la contraseña ya no es válida.")):(h.innerHTML=`
        <div class="admin-shell">
          <p class="admin-error">Ha ocurrido un error inesperado cargando las estadísticas: ${o(s)}</p>
          <button class="admin-btn-ghost" id="retry-btn">Reintentar</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",()=>Fe(e)))}}const Ce=sessionStorage.getItem(D);Ce?O(Ce):j();
