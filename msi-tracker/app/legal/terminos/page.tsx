import Link from "next/link";

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-sm px-4 py-8 text-sm text-gray-700">
      <Link href="/" className="mb-4 inline-block text-gray-500 underline">
        Volver
      </Link>
      <h1 className="mb-4 text-lg font-semibold text-gray-900">Términos de uso</h1>

      <p className="mb-3">
        MSI Tracker es una herramienta informativa para que sumes y organices
        tus compras a meses sin intereses. <strong>No es asesoría financiera</strong>,
        no está afiliada a ningún banco ni institución financiera, y los
        cálculos que muestra son estimaciones basadas en los datos que tú
        mismo capturas.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Plan gratis y plan Pro</h2>
      <p className="mb-3">
        El plan gratis permite probar la herramienta con hasta 1 tarjeta y 3
        compras. El plan Pro quita esos límites y añade avisos por email antes
        de cada pago, por una suscripción mensual o anual que puedes cancelar
        cuando quieras desde el portal de pagos.
      </p>

      <h2 className="mb-1 mt-4 font-medium text-gray-900">Responsabilidad</h2>
      <p className="mb-3">
        Tú eres responsable de verificar los montos y fechas reales con tu
        banco o emisor de tarjeta. MSI Tracker no se hace responsable de
        pagos tardíos, cargos o intereses derivados de información
        incorrecta o desactualizada en tu cuenta.
      </p>

      <p className="mt-6 text-xs text-gray-400">
        Estos son términos mínimos para una versión de prueba (v1). Antes de
        un lanzamiento real en México conviene que los revise un abogado.
      </p>
    </main>
  );
}
