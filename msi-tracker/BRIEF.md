# Brief técnico — MSI Tracker v1 (México)

## Objetivo y alcance de la v1

La v1 es una web app móvil en español de México que suma todas las compras a meses sin intereses (MSI) del usuario, de todas sus tarjetas, y le muestra cuánto tiene comprometido cada mes. El objetivo es validar con 300–500 € en Meta Ads que la gente paga por esto, con lanzamiento propuesto para la primera semana de enero de 2027 (cuesta de enero).

- Entrada manual de compras, sin conexión bancaria.
- Simulador "¿Me cabe esta compra?" gratis y sin registro, como gancho de los anuncios.
- Calendario de cuotas, porcentaje sobre el ingreso y avisos de pago para usuarios registrados.
- Pendiente: nombre de marca y dominio.

## Usuario objetivo y flujos principales

El usuario es un adulto de 25–45 años en México, con 1–4 tarjetas de crédito y varias compras a MSI activas, que hace todo desde el móvil.

Flujo 1 — visitante que llega de un anuncio:
1. Aterriza en la landing, donde el simulador está arriba del todo.
2. Introduce su ingreso mensual neto, su total actual en cuotas (opcional) y la compra que está pensando hacer.
3. Ve el resultado: cuota mensual nueva, su peor mes, porcentaje del ingreso y un semáforo.
4. Ve el CTA "Guarda tus compras y te avisamos antes de cada pago" y se registra con email (magic link).
5. Al superar el límite del plan gratis, ve el paywall.

Flujo 2 — usuario registrado:
1. Da de alta sus tarjetas con día de corte y día límite de pago.
2. Añade sus compras a MSI.
3. Consulta el dashboard con el compromiso de cada mes.
4. Recibe un email antes de cada fecha límite de pago.
5. Marca una compra como liquidada si la adelanta.

## Funcionalidades: gratis vs de pago

El plan gratis deja probar el valor con pocas compras; el plan Pro quita los límites y añade los avisos, que son lo que justifica pagar cada mes.

| Funcionalidad | Gratis | Pro |
| --- | --- | --- |
| Simulador "¿Me cabe?" | Sí, sin registro | Sí |
| Compras guardadas | Hasta 3 | Ilimitadas |
| Tarjetas | 1 | Ilimitadas |
| Calendario de cuotas | Mes actual y siguiente | 12 meses |
| Porcentaje del ingreso y semáforo | Sí | Sí |
| Avisos por email antes de cada pago | No | Sí |
| Exportar a CSV | No | Sí |

## Lógica de cálculo de las cuotas MSI

Todo el cálculo vive en una función pura (`lib/msi.ts`) con tests unitarios, porque es el corazón del producto y lo usan tanto el simulador público como el dashboard.

- **Cuota mensual:** importe dividido entre meses, redondeado a centavos. La última cuota absorbe el redondeo para que el total cuadre exacto.
- **Primera cuota:** cae en el primer estado de cuenta cuyo día de corte sea igual o posterior a la fecha de compra. Su vencimiento es el día límite de pago siguiente a ese corte.
- **Compromiso del mes:** suma de todas las cuotas que vencen en ese mes, de todas las tarjetas.
- **Porcentaje del ingreso:** compromiso del mes dividido entre el ingreso mensual neto.
- **Semáforo (propuesta, configurable):** verde por debajo del 15%, amarillo entre 15% y 30%, rojo por encima del 30%.
- **Simulador:** añade una compra hipotética, recalcula los próximos 12 meses y devuelve la cuota, el peor mes y su porcentaje.
- **Liquidación anticipada:** si una compra se marca como liquidada en un mes, deja de generar cuotas desde ese mes.
- **Moneda:** MXN. Plazos admitidos: 3, 6, 9, 12, 18 y 24 meses.
- **Casos de test mínimos:** compra el día de corte, compra el día después del corte, corte el día 31 en meses cortos, cambio de año y redondeo con importes no divisibles.

## Modelo de datos en Supabase

Bastan tres tablas y un log; las cuotas no se guardan, se calculan al vuelo desde las compras. Todas las tablas llevan `user_id` con RLS `user_id = auth.uid()`.

| Tabla | Campos clave | Notas |
| --- | --- | --- |
| `profiles` | `id` (= `auth.users.id`), `ingreso_mensual`, `plan` (`free` / `pro`), `stripe_customer_id`, `avisos_activos` | Se crea al registrarse |
| `cards` | `id`, `user_id`, `nombre`, `banco`, `dia_corte`, `dia_limite_pago` | Días entre 1 y 31 |
| `purchases` | `id`, `user_id`, `card_id`, `descripcion`, `comercio`, `importe` (numeric 12,2), `meses`, `fecha_compra`, `liquidada_en` (nullable) | `meses` con check en 3, 6, 9, 12, 18 y 24 |
| `reminders_log` | `id`, `user_id`, `card_id`, `mes`, `enviado_en` | Evita enviar el mismo aviso dos veces |

Los límites del plan gratis (3 compras, 1 tarjeta) se validan en el servidor, no solo en la interfaz.

## Stack, arquitectura y despliegue

Un stack estándar que Claude Code domina y que se despliega sin servidor propio.

- **Frontend y backend:** Next.js (App Router) con TypeScript y Tailwind, mobile-first, desplegado en Vercel.
- **Base de datos y login:** Supabase (Postgres, Auth con magic link por email, RLS).
- **Pagos:** Stripe Checkout con webhook que actualiza `profiles.plan`.
- **Emails:** Resend para el magic link y los avisos de pago.
- **Avisos:** Vercel Cron diario que envía el email 3 días antes del día límite de pago de cada tarjeta con cuotas ese mes.
- **Medición:** Meta Pixel y Conversions API con tres eventos: simulación completada, registro y compra del plan Pro.
- **Calidad:** Vitest para `lib/msi.ts`; variables de entorno en Vercel, nunca en el repo.

## Pagos y precios

Precio propuesto para el test: 49 MXN al mes o 399 MXN al año. Es una hipótesis a validar con los anuncios, no una decisión.

- Sin prueba gratuita: el plan gratis ya cumple ese papel.
- Cobro con Stripe Checkout en MXN; el webhook activa o desactiva el plan Pro.
- Portal de cliente de Stripe para cancelar sin escribir a soporte.
- Pregunta abierta: ¿suscripción o pago único anual? Decidir antes de configurar Stripe.
- Pregunta abierta: ¿añadir Mercado Pago u OXXO para quien no quiere pagar con tarjeta?

## Pantallas y textos clave

Nueve pantallas, todas pensadas primero para móvil.

1. **Landing con simulador.** Título: "¿Te cabe otra compra a meses?". Subtítulo: "Suma todos tus meses sin intereses y descubre cuánto tienes comprometido cada mes". Botón: "Calcula gratis".
2. **Resultado del simulador.** Cuota, peor mes, porcentaje y semáforo; CTA "Guarda tus compras y te avisamos antes de cada pago".
3. **Registro y login** con magic link.
4. **Onboarding:** ingreso mensual neto y primera tarjeta (nombre, día de corte, día límite de pago).
5. **Dashboard:** compromiso del mes, porcentaje del ingreso, barras de los próximos 12 meses y lista de compras con progreso (por ejemplo, "cuota 3 de 12").
6. **Añadir o editar compra.**
7. **Tarjetas.**
8. **Plan Pro** con el comparativo gratis vs Pro.
9. **Ajustes:** ingreso, avisos, cuenta y borrar todos mis datos.

Legal mínimo antes de lanzar: aviso de privacidad, términos y la nota "Herramienta informativa, no es asesoría financiera". Conviene que lo revise un abogado en México.

## Fuera de alcance y v2

La v1 no incluye nada que dependa de terceros o de datos bancarios; eso se deja para cuando el test confirme demanda.

Fuera de la v1:
- Conexión directa con bancos.
- App nativa de iOS o Android.
- Comisiones por diferir compras y multimoneda.

Candidatos para la v2:
- Importar el estado de cuenta en PDF y extraer las compras a MSI con la API de Claude.
- Avisos por WhatsApp.
- Plan pareja o familia.
- Campañas estacionales (Buen Fin, Hot Sale) con el simulador como gancho.
- Cross-sell de productos financieros por afiliación.

## Plan de entrega y prompt inicial para Claude Code

Siete fases cortas; cada una se revisa antes de pasar a la siguiente.

1. Repo, Next.js, Supabase y login con magic link.
2. `lib/msi.ts` con todos los tests de la sección de cálculo.
3. Landing con simulador público.
4. Dashboard, tarjetas y compras con límites del plan gratis.
5. Stripe Checkout, webhook y portal de cliente.
6. Cron de avisos por email.
7. Meta Pixel, Conversions API, textos legales y despliegue en el dominio.

Prompt para pegar en Claude Code (exporta antes este documento como `BRIEF.md` en la raíz del repo):

```markdown
Lee BRIEF.md: es la especificación de la v1 de una web app de control de compras a meses sin intereses para México.

Construyela por las fases del apartado "Plan de entrega", de una en una. Antes de escribir código:
1. Propón la estructura de carpetas.
2. Escribe el esquema SQL de Supabase con RLS.
3. Escribe la firma y los casos de test de lib/msi.ts.
Espera mi visto bueno antes de implementar.

Reglas: TypeScript estricto, mobile-first, textos en español de México, sin secretos en el repo, y al terminar cada fase dime qué tengo que configurar yo (claves, dominios, webhooks).
```
