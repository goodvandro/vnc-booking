import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VNC Booking - Admin Panel",
  description: "Painel de administração do sistema de reservas VNC Booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
