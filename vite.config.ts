import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Ruta relativa: el mismo build sirve tanto desde el dominio propio
  // (creditscore.creditio.es, raíz) como desde lukas612.github.io/creditscore/
  // (subcarpeta) sin tener que elegir una base fija.
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
        solicitud: resolve(__dirname, "solicitud.html"),
      },
    },
  },
});
