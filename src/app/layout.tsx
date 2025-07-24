import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../components/Toast";
import ClientWrapper from "./ClientWrapper";
import SessionWrapper from "./sessionwrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClinicAI - Dashboard Inteligente",
  description: "Dashboard moderno para gestão de clínicas com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <SessionWrapper>
            <ClientWrapper>{children}</ClientWrapper>
          </SessionWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
