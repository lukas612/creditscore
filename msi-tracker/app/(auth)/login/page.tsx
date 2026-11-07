import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-2 text-2xl font-semibold">MSI Tracker</h1>
      <p className="mb-6 text-sm text-gray-600">
        Entra con tu correo, te mandamos un enlace para iniciar sesión sin
        contraseña.
      </p>

      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
