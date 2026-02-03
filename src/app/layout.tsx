import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ferretera Ecosa - Productos de Calidad",
  description: "Encuentra herramientas, materiales de construcción y productos de ferretería de la mejor calidad en Ferretera Ecosa.",
  keywords: "ferretería, herramientas, construcción, materiales, Ecosa",
  authors: [{ name: "Ferretera Ecosa" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/logo192.png", sizes: "192x192", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Ferretera Ecosa - Productos de Calidad",
    description: "Tu ferretería de confianza para herramientas y materiales de construcción.",
    type: "website",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "Logo Ferretera Ecosa"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Ferretera Ecosa - Productos de Calidad",
    description: "Tu ferretería de confianza para herramientas y materiales de construcción.",
    images: ["/logo512.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-900 via-blue-900 to-green-800">
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
