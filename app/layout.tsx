import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ScrollNavigator from "@/components/layout/ScrollNavigator";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#6366F1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Davi Milioli - Desenvolvedor Full-Stack",
  description: "Sou um Desenvolvedor Full-Stack dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade. Estou sempre em busca de novos desafios e oportunidades para evoluir profissionalmente.",
  authors: [{ name: "Davi Milioli", url: "https://www.davimilioli.dev" }],
  creator: "Davi Milioli",
  publisher: "Davi Milioli",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Davi Milioli - Desenvolvedor Full-Stack",
    description: "Sou um Desenvolvedor Full-Stack dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade.",
    url: "https://www.davimilioli.dev",
    siteName: "Davi Milioli",
    images: [
      {
        url: "https://www.davimilioli.dev/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Davi Milioli - Portfólio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} h-full antialiased dark`}>
      <body className="font-sans" suppressHydrationWarning>
        <div className="flex flex-1 min-h-screen">
          <Sidebar className="hidden lg:flex" />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <div className="flex-1 flex flex-col">
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </div>
        <ScrollNavigator />
      </body>
    </html>
  );
}