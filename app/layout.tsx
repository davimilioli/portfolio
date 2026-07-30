import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

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
  title: "Davi Milioli - Desenvolvedor Front-End",
  description: "Sou um Desenvolvedor Front-End dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade. Estou sempre em busca de novos desafios e oportunidades para evoluir profissionalmente.",
  authors: [{ name: "Davi Milioli", url: "https://www.davimilioli.dev" }],
  creator: "Davi Milioli",
  publisher: "Davi Milioli",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Davi Milioli - Desenvolvedor Front-End",
    description: "Sou um Desenvolvedor Front-End dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade.",
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
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}