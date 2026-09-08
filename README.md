# Creditio Credit Score

Landing + quiz de "puntuación crediticia" pensado como canal de captación alternativo
al de las landings de pago: en vez de pedir directamente una solicitud de préstamo, se
ofrece un test gratuito que calcula una puntuación orientativa y captura el lead
(nombre, email, teléfono) para pasarlo al equipo comercial.

Las preguntas del quiz están basadas en los campos reales usados en el funnel de
solicitud de crédito (importe, plazo, ingresos, deudas, vivienda, edad, código postal),
condensadas a ~9-10 pasos para maximizar la conversión del test.

## Stack

- **Frontend**: Vite + React + TypeScript, sin backend propio.
- **Datos**: Supabase (proyecto `creditscore`, región eu-west-3).
  - `quiz_sessions`: una fila por intento de quiz (respuestas + score).
  - `leads`: se crea solo cuando la persona desbloquea su resultado dejando sus datos.
  - `scoring_rules`: pesos del cálculo heurístico. No es accesible desde el cliente;
    solo la función `calculate_score` (SECURITY DEFINER) puede leerla, así el frontend
    nunca ve la fórmula de puntuación.
- El scoring es una heurística de marketing (base 300-850 estilo FICO), **no** un
  scoring bancario real ni una decisión de crédito.

## Desarrollo local

```bash
npm install
cp .env.example .env   # ya viene con la URL y la clave pública del proyecto
npm run dev
```

## Ajustar la fórmula de puntuación

Las reglas viven en la tabla `scoring_rules` de Supabase (columna `config`, en JSON).
Cambiarlas ahí no requiere desplegar código nuevo.

## Publicado en GitHub Pages

**https://creditscore.creditio.es/** (dominio propio; `https://lukas612.github.io/creditscore/`
redirige automáticamente ahí en cuanto detecta el `CNAME`).

Se sirve como página estática desde la carpeta `/docs` de `main` (Source: rama `main`,
carpeta `/docs`, en Settings → Pages del repo). El build usa rutas relativas
(`base: "./"` en `vite.config.ts`) para que el mismo `dist/` funcione tanto en la
raíz del dominio propio como en la subcarpeta de `github.io`. `public/CNAME` se
copia automáticamente a `dist/` (y de ahí a `docs/`) en cada build, así que no hay
que recrearlo a mano. No hay build automático: tras cualquier cambio hay que
regenerar `docs/` a mano y commitear:

```bash
npm run build
rm -rf docs && cp -r dist docs && touch docs/.nojekyll
git add docs && git commit -m "chore: rebuild docs for GitHub Pages" && git push
```

## Panel interno (estadísticas y leads)

**https://lukas612.github.io/creditscore/admin.html**

Protegido con una contraseña compartida (no es una cuenta de usuario real): se
comprueba en el servidor vía funciones `admin_*` (SECURITY DEFINER), así que
`leads`/`quiz_sessions` nunca son legibles directamente por el cliente, con o sin
contraseña. La contraseña se guarda en texto plano en `admin_config.password_plain`
(antes iba cifrada con pgcrypto; se simplificó tras un bug que rompía el login).
Sin límite de intentos ni expiración de sesión más allá de `sessionStorage` —
suficiente para un panel interno de un solo administrador, pero si esto crece
conviene pasar a Supabase Auth real (email/contraseña de verdad). Se intentó
crear un usuario de Supabase Auth insertándolo directamente en `auth.users`, pero
GoTrue lo rechazó ("Database error querying schema") — sin acceso a la Admin API
(service role) no es un camino fiable; para un login real habría que crear el
usuario desde el dashboard de Supabase (Authentication → Users → Add user) y
adaptar `src/admin/main.ts` para usar `supabase.auth.signInWithPassword`.

Todo el panel (stats, embudo, distribución por banda y la lista de leads) se
puede filtrar por periodo: Hoy, 7 días, Todo, o un rango de fechas propio. Las
funciones `admin_get_stats`, `admin_list_leads`, `admin_get_funnel_overview` y
`admin_get_funnel_steps` aceptan `p_since`/`p_until`; "Leads totales" en la
primera tarjeta es la única cifra que no cambia con el periodo (histórico
completo, para tener siempre una referencia).

Además del periodo, hay un selector de **embudo** (Todos / Quiz corto /
Solicitud completa) que filtra las mismas funciones vía `p_source` (columna
`source` en `quiz_sessions`, `leads` y `funnel_events`, valores `'quiz'` o
`'solicitud'`). Con "Todos" seleccionado no se muestra el desglose pregunta a
pregunta (mezclar dos formularios distintos no tiene sentido); hay que elegir
un embudo concreto para verlo.

El panel incluye un embudo de conversión (visita → completa el quiz → deja sus
datos) y, por debajo, cuántas visitas llegan a cada pregunta, para ver en qué
paso se cae más gente. Se alimenta de una tabla nueva, `funnel_events`, que
registra `page_view` (al cargar la página) y `question_reached` (al llegar a
cada pregunta) con un id de sesión de navegador (`sessionStorage`, no
identifica a la persona). El envío es "best effort": si falla, nunca bloquea ni
rompe el quiz/formulario. Las preguntas condicionales no muestran una caída
propia, porque no todo el mundo las ve; el siguiente paso obligatorio calcula
su caída respecto al último paso que sí ven todos. El orden/etiquetas del quiz
corto está hardcodeado en `src/admin/main.ts` (`STEP_DEFS`) — si cambia el quiz
en `src/data/questions.ts`, hay que actualizar esa lista a mano; el de la
solicitud completa (`STEP_DEFS_SOLICITUD`) se deriva automáticamente de
`src/data/witmeQuestions.ts`, así que ese no hace falta mantenerlo a mano.

También muestra una tabla con cada solicitud enviada a la API de Witme
(`admin_get_witme_applications`, ver más abajo).

Para cambiar la contraseña, desde la consola SQL de Supabase o vía RPC:

```sql
select admin_set_password('contraseña_actual', 'contraseña_nueva');
-- o directamente, si no se conoce la actual:
update admin_config set password_plain = 'contraseña_nueva' where id = 1;
```

## Tracking de campaña (servy_click)

Los enlaces de campaña llevan el click id del proveedor de tráfico:

```
https://lukas612.github.io/creditscore/?servy_click={clickid}
```

`getClickId()` (`src/lib/postback.ts`) lo captura al cargar la página (también acepta
`click_id`/`clickid` como alternativas) y se guarda en `quiz_sessions.click_id`. Cuando
el usuario deja sus datos de contacto (lead real, no solo terminar el quiz) se dispara
un pixel de postback a:

```
https://go.servy.es/postback?cid={clickId}&payout=0&currency=EUR&param1=Creditio_score
```

Se dispara solo si hay `clickId` y solo tras guardar el lead con éxito (`ResultGate`).
Es un pixel (`new Image().src = ...`), no una llamada `fetch`, para no depender de CORS.

## Opciones de crédito (pingtree) tras el resultado

Además del score, `ResultFull` muestra un bloque "Opciones de crédito para ti"
(`src/components/CreditOffers.tsx` + `src/data/offers.ts`) con enlaces a partners
de captación (Moneya, InstaDinero Card, Financiar24, Prestalight). Cada
`buildUrl(clickId)` arma la URL propia de cada partner y, cuando hay `clickId`
disponible (el mismo `servy_click` capturado al entrar), lo añade con el
nombre de parámetro que cada uno espera (`servy_click`, `aff_click_id` o
`clickid`). Si no hay `clickId` el parámetro simplemente se omite.

## Plan de mejora personalizado ("credit builder")

`ResultFull` incluye, tras el desglose, un plan ordenado por impacto
(`src/components/CreditBuilder.tsx` + `src/data/creditBuilder.ts`): solo los
factores con puntos negativos del propio usuario, ordenados de mayor a menor
impacto, cada uno con una explicación de por qué resta y qué hacer al respecto,
más una etiqueta de esfuerzo (Rápido / En tus manos / Requiere tiempo /
Automático). El contenido está alineado a mano con lo que `calculate_score`
realmente pondera, para no prometer mejoras que el modelo no contempla — si se
añade o cambia un factor de scoring, hay que añadir su entrada en
`CREDIT_BUILDER_TIPS`. Si el usuario no tiene ningún factor en negativo, se
muestra un mensaje de "todo en orden" en vez de una lista vacía.

## Solicitud completa (formulario largo conectado a Witme)

**https://creditscore.creditio.es/solicitud.html**

Página totalmente independiente del quiz corto (`solicitud.html` +
`src/SolicitudApp.tsx`), pensada para enviar tráfico aparte y hacer A/B entre
ambos formularios. No comparte componentes de pregunta con el quiz original
(`src/components/WitmeQuestionStep.tsx`, `WitmeForm.tsx`, `WitmePhaseStepper.tsx`
son propios) para no arriesgar el funnel que ya convierte.

- **Preguntas**: `src/data/witmeQuestions.ts`, con las claves y catálogos
  (género, estado civil, provincias, fuente de ingresos, etc.) exactamente
  como los espera la API de Witme — ~28 campos, bastantes más que el quiz
  corto, porque la API los exige para dar de alta un lead real.
- **Score propio**: `calculate_score_solicitud` (función nueva, no reutiliza
  `calculate_score`) — mismo rango 300-850 y misma lógica base, pero lee el
  vocabulario de Witme (`incomeSource`, `hasOwnedHouse`, `dateOfBirth`...) y
  añade dos factores nuevos posibles gracias a los campos extra: personas a
  cargo y una vivienda con más matices (propietario con/sin hipoteca vs.
  alquiler). Deliberadamente **no** se usa género, estado civil, nivel de
  estudios ni país de nacimiento como factor de score — esos campos se piden
  solo porque la API de Witme los exige, nunca influyen en la puntuación que
  ve el usuario.
- **Envío a Witme**: al completar el formulario se guarda en `quiz_sessions`/
  `leads` (con `source = 'solicitud'`, igual que el resto del panel) y se llama
  a la Edge Function `witme-proxy`, que reenvía la solicitud a la API real de
  Witme (`https://gestion.servy.es/api/partners/leads/new`, documentación en
  `https://witme.docs.apiary.io/`).

### Edge Function `witme-proxy` y el token

El token de partner (`WITME_API_TOKEN`) **no está en el código ni en git**:
vive como secreto de la Edge Function en Supabase (Edge Functions → Secrets).
Si hay que rotarlo, se cambia solo ahí, sin tocar ni desplegar código.

La función soporta dos acciones (`action` en el body):
- `"catalog"`: proxy de solo lectura a `GET /catalog` (o `/catalog/{campo}`),
  útil para consultar los valores válidos de cada campo.
- `"submit"`: arma el payload completo (`partnerId: 94`, `country: "ES"`,
  `meta` con IP/user-agent leídos de la propia request, `data`, `tracking`) y
  llama a `POST /leads/new`. **Fuerza `sandbox: true` siempre**, sin que el
  cliente pueda cambiarlo — hasta que se confirme con el equipo de Witme que
  se puede pasar a producción (ellos tienen además su propio flag que
  controla si los leads se crean de verdad). Cada intento, con la respuesta
  completa de Witme, se guarda en `witme_applications` (usando el service role
  que Supabase inyecta automáticamente en toda Edge Function) para poder
  revisarlo desde el panel admin.

Código fuente de la función: `supabase/functions/witme-proxy/index.ts`. Se
despliega a mano (no hay CI para Edge Functions todavía) — tras editar el
archivo, hay que volver a desplegarlo desde el dashboard de Supabase o vía
`supabase functions deploy witme-proxy` con la CLI.

Antes de tramitar solicitudes reales hay que:
1. Confirmar con Witme que el flag de creación de leads está activo.
2. Quitar el `sandbox: true` fijo en `supabase/functions/witme-proxy/index.ts`
   (buscar el comentario correspondiente) una vez confirmado el punto 1, y
   volver a desplegar la función.

## Pendiente / siguientes pasos

- Si el volumen crece, pasar a un pipeline de build automático (Action) en vez de commitear `docs/` a mano.
- Cuando Witme confirme que se puede pasar a producción, quitar el `sandbox: true` fijo de `witme-proxy`.
