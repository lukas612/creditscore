import path from "node:path";
import type { NextConfig } from "next";

// Export estático (sin servidor Node) para desplegar como archivos planos,
// igual que el resto de creditscore en GitHub Pages. `NEXT_PUBLIC_BASE_PATH`
// se fija en build time cuando se sirve desde una subcarpeta (/msi-tracker).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
