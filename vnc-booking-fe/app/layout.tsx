import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://vncbooking.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VNC Booking — Aluguer de Carros e Guest Houses em São Tomé e Príncipe",
    template: "%s | VNC Booking",
  },
  description:
    "Reserve carros e guest houses em São Tomé e Príncipe. Frota premium, alojamentos confortáveis e serviço de excelência para a sua viagem. Reserva fácil e rápida online.",
  keywords: [
    "aluguer de carros São Tomé",
    "guest house São Tomé e Príncipe",
    "rent a car São Tomé",
    "alojamento São Tomé",
    "VNC Booking",
    "turismo São Tomé",
    "reserva online carros",
    "hospedagem São Tomé",
    "car rental São Tomé and Príncipe",
    "accommodation São Tomé",
  ],
  authors: [{ name: "VNC Booking" }],
  creator: "VNC Booking",
  publisher: "VNC Booking",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US", "fr_FR"],
    url: SITE_URL,
    siteName: "VNC Booking",
    title: "VNC Booking — Aluguer de Carros e Guest Houses em São Tomé e Príncipe",
    description:
      "Reserve carros e guest houses em São Tomé e Príncipe. Frota premium, alojamentos confortáveis e serviço de excelência.",
    images: [
      {
        url: "/placeholder-01.jpg",
        width: 1200,
        height: 630,
        alt: "VNC Booking — Descubra São Tomé e Príncipe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VNC Booking — Aluguer de Carros e Guest Houses",
    description:
      "Reserve carros e guest houses em São Tomé e Príncipe. Serviço premium e reserva fácil online.",
    images: ["/placeholder-01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Adicione aqui o código de verificação do Google Search Console:
    // google: "seu-codigo-de-verificacao",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VNC Booking",
  description:
    "Aluguer de carros e guest houses em São Tomé e Príncipe. Serviço premium e reserva online.",
  url: SITE_URL,
  logo: `${SITE_URL}/placeholder-logo.png`,
  image: `${SITE_URL}/placeholder-01.jpg`,
  telephone: "+239 9029575",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ST",
    addressLocality: "São Tomé",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "0.1864",
    longitude: "6.6131",
  },
  sameAs: [],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços VNC Booking",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aluguer de Carros",
          description: "Frota premium de veículos para a sua viagem em São Tomé e Príncipe.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Guest Houses",
          description: "Alojamentos confortáveis com localizações privilegiadas.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorBackground: "hsl(var(--background))",
          colorInputBackground: "hsl(var(--background))",
          colorInputText: "hsl(var(--foreground))",
        },
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          card: "bg-card text-card-foreground shadow-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
        },
      }}
    >
      <html lang="pt">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
