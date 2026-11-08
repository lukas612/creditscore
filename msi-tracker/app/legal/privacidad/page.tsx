import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-sm px-4 py-8 text-sm text-gray-700">
      <Link href="/" className="mb-4 inline-block text-gray-500 underline">
        Volver
      </Link>
      <h1 className="mb-4 text-lg font-semibold text-gray-900">Aviso de privacidad</h1>

      <p className="mb-3">
        MSI Tracker es una herramienta para llevar el control de tus compras a
        meses sin intereses (MSI). Esta página resume, en términos simples,
        qué datos usamos y para qué.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Qué datos guardamos</h2>
      <p className="mb-3">
        Tu correo (para iniciar sesión sin contraseña), tu ingreso mensual
        aproximado, y los datos de las tarjetas y compras que tú registras a
        mano: nombre de la tarjeta, día de corte, día límite de pago,
        descripción e importe de cada compra. No pedimos ni guardamos el
        número de tu tarjeta ni nos conectamos a tu banco.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Para qué los usamos</h2>
      <p className="mb-3">
        Para calcular cuánto tienes comprometido cada mes, mostrarte tu
        dashboard, y (si activas los avisos del plan Pro) mandarte un correo
        antes de cada fecha límite de pago.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Con quién lo compartimos</h2>
      <p className="mb-3">
        Con los proveedores que hacen funcionar la app: Supabase (base de
        datos y login), Stripe (cobro del plan Pro) y Resend (envío de
        correos). No vendemos tus datos a nadie.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Borrar tus datos</h2>
      <p className="mb-3">
        Puedes borrar todas tus tarjetas y compras tú mismo desde Ajustes,
        cuando quieras.
      </p>

      <p className="mt-6 text-xs text-gray-400">
        Este es un aviso mínimo para una versión de prueba (v1). Antes de un
        lanzamiento real en México conviene que lo revise un abogado.
      </p>
    </main>
  );
}
