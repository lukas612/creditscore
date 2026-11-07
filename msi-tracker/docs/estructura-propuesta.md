# MSI Tracker — estructura de carpetas propuesta

```
msi-tracker/
  BRIEF.md
  package.json
  tsconfig.json
  next.config.ts
  tailwind.config.ts
  postcss.config.js
  vitest.config.ts
  .env.example
  .gitignore
  middleware.ts                      # refresca la sesión de Supabase en cada request

  app/
    layout.tsx
    page.tsx                         # landing + simulador público (sin sesión)
    (auth)/
      login/page.tsx                 # pide el email, envía magic link
      auth/callback/route.ts         # intercambia el código de Supabase por sesión
    (app)/                           # todo lo que exige sesión, con guard en el layout
      layout.tsx
      dashboard/page.tsx
      compras/
        page.tsx                    # listado con progreso ("cuota 3 de 12")
        nueva/page.tsx
        [id]/editar/page.tsx
      tarjetas/
        page.tsx
        nueva/page.tsx
      plan/page.tsx                  # comparativo gratis/Pro + botón de checkout
      ajustes/page.tsx                # ingreso, avisos, cuenta, borrar mis datos
    api/
      stripe/
        checkout/route.ts            # crea la Checkout Session
        webhook/route.ts             # confirma el pago, actualiza profiles.plan
        portal/route.ts              # Billing Portal (cancelar sin soporte)
      cron/
        reminders/route.ts           # Vercel Cron diario, protegido con CRON_SECRET

  components/
    Simulador.tsx
    ResultadoSimulador.tsx
    SemaforoBadge.tsx
    DashboardChart.tsx                # barras de los próximos 12 meses
    PurchaseForm.tsx
    CardForm.tsx
    PlanComparisonTable.tsx

  lib/
    msi.ts                           # cálculo puro — sin imports de Next ni Supabase
    msi.test.ts
    supabase/
      client.ts                      # cliente de navegador
      server.ts                      # cliente para Server Components / route handlers
    stripe.ts
    resend.ts
    metaConversions.ts                # Conversions API, server-side
    validation.ts                    # esquemas zod de los formularios
    planLimits.ts                    # límites del plan gratis (3 compras, 1 tarjeta)

  supabase/
    migrations/
      0001_init.sql
```

## Por qué así

- **`lib/msi.ts` sin dependencias de framework.** Es el requisito explícito del brief ("función pura... lo usan tanto el simulador público como el dashboard"). Si no importa nada de Next ni de Supabase, se puede testear con Vitest sin mocks y reutilizar tal cual en el simulador (sin sesión) y en el dashboard (con sesión).
- **`(auth)` y `(app)` como route groups.** Separan limpiamente, a nivel de carpeta, lo que no exige sesión (landing, simulador, login) de lo que sí (todo detrás del guard en `app/(app)/layout.tsx`), sin ensuciar las URLs reales.
- **Stripe y el cron como Route Handlers bajo `app/api/`.** Es el patrón estándar de Next.js en Vercel — no hace falta un servidor aparte, y el cron se configura solo con un `vercel.json` apuntando a esa ruta.
- **`planLimits.ts` aparte.** El brief insiste en que el límite del plan gratis se valide en el servidor, no solo en la interfaz — mejor como función reutilizable que cada Server Action/route handler llama antes de insertar, que repetir la condición en cada sitio.

## Decisiones que te propongo (dime si cambio algo)

1. **Supabase: proyecto nuevo, no el de Scorea/creditscore.** Son usuarios y datos de un producto distinto (tarjetas, compras, ingresos) — mezclarlo en el mismo proyecto que los leads de crédito complica el RLS y el panel admin sin ganar nada. ¿Lo creo yo mismo o prefieres darlo de alta tú?
2. **`reminders_log`**: solo lectura por RLS para el usuario; la escritura la hace el cron con la `service_role` key (que salta RLS), así nadie puede marcarse avisos falsos a sí mismo.
3. **`profiles` se crea con un trigger** en `auth.users` (al registrarse), no a mano desde el cliente — evita el caso de un usuario sin perfil si falla el paso intermedio.
