import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import { siteConfig } from "@/app/config/site";
import "./globals.css";

const bodyFont = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cervantesadvisory.com"),
  title: "Cervantes Boutique Property Advisory",
  description:
    "Luxury property advisory for clients buying, selling and investing in exceptional homes across Spain.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Cervantes Boutique Property Advisory",
    description:
      "Luxury property advisory for clients buying, selling and investing in exceptional homes across Spain.",
    url: "/",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cervantes Boutique Property Advisory",
    description:
      "Luxury property advisory for clients buying, selling and investing in exceptional homes across Spain.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description:
      "Founder-led boutique advisory for buying, selling and investing in exceptional homes across the Costa del Sol.",
    areaServed: "Costa del Sol, Spain",
    telephone: siteConfig.contact.companyPhone,
    email: siteConfig.contact.companyEmail,
    url: siteConfig.url,
  };

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only z-[100] bg-[var(--color-ivory)] px-4 py-2 text-sm font-medium text-[var(--color-text)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
