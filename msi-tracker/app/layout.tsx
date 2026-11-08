import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "MSI Tracker",
  description: "Controla tus compras a meses sin intereses en un solo lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
