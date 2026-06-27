import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Após migrar DNS para Vercel, trocar para "https://icb.org.br"
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icb-website-nextjs.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Iate Clube Brasileiro — Niterói, RJ",
    template: "%s — Iate Clube Brasileiro",
  },
  description:
    "Fundado em 10 de setembro de 1906, o Iate Clube Brasileiro é o primeiro e mais tradicional clube náutico do Brasil, às margens da Baía de Guanabara em Niterói.",
  keywords: [
    "iate clube brasileiro",
    "clube náutico niterói",
    "vela niterói",
    "regatas baía de guanabara",
    "clube niterói",
    "ICB",
    "escola de vela",
    "iatismo rio de janeiro",
  ],
  authors: [{ name: "Iate Clube Brasileiro" }],
  creator: "Iate Clube Brasileiro",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Iate Clube Brasileiro",
    title: "Iate Clube Brasileiro — O Primeiro Clube de Vela do Brasil",
    description:
      "Fundado em 1906, o ICB é o mais tradicional clube náutico do Brasil. Vela, regatas, eventos e vida social às margens da Baía de Guanabara em Niterói.",
    images: [
      {
        url: "/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "Iate Clube Brasileiro — vista aérea da sede em Niterói",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iate Clube Brasileiro",
    description: "O primeiro clube de vela do Brasil, desde 1906.",
    images: ["/images/hero1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Iate Clube Brasileiro",
  alternateName: "ICB",
  description:
    "Fundado em 10 de setembro de 1906, o Iate Clube Brasileiro é o primeiro clube náutico do Brasil.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo/logo-icb-colorido.png`,
  image: `${BASE_URL}/images/hero1.webp`,
  foundingDate: "1906-09-10",
  sport: "Sailing",
  telephone: "+55-21-2714-8252",
  email: "secretaria@icb.org.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Estrada Leopoldo Fróes, 400",
    addressLocality: "Niterói",
    addressRegion: "RJ",
    postalCode: "24360-005",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.9418,
    longitude: -43.1147,
  },
  sameAs: [
    "https://www.instagram.com/iateclubebrasileiro",
    "https://www.facebook.com/iateclubebrasileiro",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
