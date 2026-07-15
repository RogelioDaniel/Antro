import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lanegra.mx"),
  title: "LA NEGRA — Author Cantina | Roma-Condesa, CDMX",
  description:
    "The origin of the Mexican night. Author cantina in the heart of Roma-Condesa. Single-village mezcal, signature mixology and high-end gastronomy. Reserve a table or join the VIP list.",
  keywords: [
    "cantina",
    "mezcal",
    "CDMX",
    "Roma Condesa",
    "mixology",
    "cocktails",
    "mezcal bar",
    "nightlife Mexico City",
    "VIP list",
    "La Negra",
  ],
  authors: [{ name: "La Negra" }],
  openGraph: {
    title: "LA NEGRA — Author Cantina | Roma-Condesa, CDMX",
    description:
      "The origin of the Mexican night. Mezcal, mixology and high-end gastronomy in Roma-Condesa.",
    url: "https://lanegra.mx",
    siteName: "LA NEGRA",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/images/hero-bg.png", width: 1344, height: 768, alt: "La Negra cantina interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LA NEGRA — Author Cantina | Roma-Condesa, CDMX",
    description:
      "The origin of the Mexican night. Mezcal, mixology and high-end gastronomy in Roma-Condesa.",
    images: ["/images/hero-bg.png"],
  },
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  name: "LA NEGRA",
  description:
    "Author cantina in the heart of Roma-Condesa. Single-village mezcal, signature mixology and high-end gastronomy.",
  image: "https://lanegra.mx/images/hero-bg.png",
  url: "https://lanegra.mx",
  telephone: SITE.phoneDisplay,
  priceRange: "$$$",
  servesCuisine: ["Mexican", "Mezcal", "Signature Cocktails"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Álvaro Obregón 123",
    addressLocality: "Cuauhtémoc",
    addressRegion: "CDMX",
    postalCode: "06700",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.421,
    longitude: -99.168,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday", "Saturday"],
      opens: "20:00",
      closes: "03:00",
    },
  ],
  sameAs: [SITE.instagram, SITE.tiktok, SITE.spotify],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
