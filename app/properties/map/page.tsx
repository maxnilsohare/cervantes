import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getAllProperties } from "@/app/lib/propertyRepository";
import { toPropertyMapListing } from "@/app/lib/propertyMapListing";
import { PropertyMapPageClient } from "./PropertyMapPageClient";

export const metadata: Metadata = {
  title: "Property Map | Cervantes",
  description:
    "Explore Cervantes properties across the Costa del Sol on an interactive property map.",
  alternates: {
    canonical: "/properties/map",
  },
  openGraph: {
    title: "Property Map | Cervantes",
    description:
      "Explore Cervantes properties across the Costa del Sol on an interactive property map.",
    url: "/properties/map",
    images: ["/images/coast.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Map | Cervantes",
    description:
      "Explore Cervantes properties across the Costa del Sol on an interactive property map.",
    images: ["/images/coast.jpg"],
  },
};

export default async function PropertyMapPage() {
  const properties = await getAllProperties();
  const listings = properties
    .map(toPropertyMapListing)
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-deep-olive)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="flex flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <div className="mx-auto w-full max-w-[1400px] flex-1">
          <PropertyMapPageClient listings={listings} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
