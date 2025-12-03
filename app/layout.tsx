import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "Tenant CRM - Piattaforma Completa per la Gestione Immobiliare",
  description: "Semplifica la gestione immobiliare con Tenant CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="w-full m-0 p-0">
      <body className="antialiased w-full m-0 p-0">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
