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

**https://lukas612.github.io/creditscore/**

Se sirve como página estática desde la carpeta `/docs` de `main` (Source: rama `main`,
carpeta `/docs`, en Settings → Pages del repo). No hay build automático: tras cualquier
cambio hay que regenerar `docs/` a mano y commitear:

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

El panel incluye un embudo de conversión (visita → completa el quiz → deja sus
datos) y, por debajo, cuántas visitas llegan a cada pregunta del quiz, para ver
en qué paso se cae más gente. Se alimenta de una tabla nueva, `funnel_events`,
que registra `page_view` (al cargar la página) y `question_reached` (al llegar
a cada pregunta) con un id de sesión de navegador (`sessionStorage`, no
identifica a la persona). El envío es "best effort": si falla, nunca bloquea ni
rompe el quiz. Las preguntas condicionales (`antiguedad_laboral`,
`importe_total_de_la_deuda`) no muestran una caída propia, porque no todo el
mundo las ve; el siguiente paso obligatorio calcula su caída respecto al último
paso que sí ven todos. El orden/etiquetas de las preguntas está hardcodeado en
`src/admin/main.ts` (`STEP_DEFS`) — si cambia el quiz en `src/data/questions.ts`,
hay que actualizar esa lista a mano.

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

## Pendiente / siguientes pasos

- Si el volumen crece, pasar a un pipeline de build automático (Action) en vez de commitear `docs/` a mano.
