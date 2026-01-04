import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NanoBanana Pro - Generador de Anuncios con IA",
  description:
    "Crea anuncios personalizados de alta calidad combinando imágenes de personajes y productos con inteligencia artificial.",
  keywords: [
    "generador de anuncios",
    "inteligencia artificial",
    "marketing",
    "publicidad",
    "Google Gemini",
  ],
  authors: [{ name: "NanoBanana Pro" }],
  openGraph: {
    title: "NanoBanana Pro - Generador de Anuncios con IA",
    description:
      "Crea anuncios personalizados de alta calidad combinando imágenes de personajes y productos con IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
