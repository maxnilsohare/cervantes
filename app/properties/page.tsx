import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { PropertyCard } from "@/app/components/PropertyCard";
import { getAllProperties } from "@/app/lib/propertyRepository";

type PropertiesPageProps = {
  searchParams: Promise<{
    type?: string;
    location?: string;
    budget?: string;
    bedrooms?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Properties | Cervantes",
  description: "Browse premium Spanish properties with Cervantes Boutique Property Advisory.",
};

function includesValue(source: string, query?: string) {
  if (!query) {
    return true;
  }
  return source.toLowerCase().includes(query.toLowerCase());
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const properties = await getAllProperties();
  const selectedBedrooms = Number(params.bedrooms);
  const selectedBudget = Number((params.budget || "").replace(/[^\d]/g, ""));

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = includesValue(property.location, params.location);
    const matchesType =
      includesValue(property.propertyType, params.type) || includesValue(property.title, params.type);
    const propertyPrice = Number(property.price.replace(/[^\d]/g, ""));
    const matchesBudget =
      !params.budget || Number.isNaN(selectedBudget) || propertyPrice <= selectedBudget;
    const matchesBedrooms =
      !params.bedrooms || Number.isNaN(selectedBedrooms) || property.bedrooms >= selectedBedrooms;

    return matchesLocation && matchesType && matchesBudget && matchesBedrooms;
  });

  const hasFilters = Boolean(params.type || params.location || params.budget || params.bedrooms);

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-[var(--color-dark-gold)]">Collection</p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--color-text)] sm:text-5xl">
            All Properties
          </h1>

          <div className="mt-8 border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-bronze)] uppercase">
              Current search
            </p>
            {hasFilters ? (
              <p className="mt-3 text-sm text-[var(--color-text)]/80">
                Type: {params.type || "Any"} | Location: {params.location || "Any"} | Budget:{" "}
                {params.budget || "Any"} | Bedrooms: {params.bedrooms || "Any"}
              </p>
            ) : (
              <p className="mt-3 text-sm text-[var(--color-text)]/75">
                No filters selected. Showing all available properties.
              </p>
            )}
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>

          {!filteredProperties.length ? (
            <p className="mt-10 text-sm text-[var(--color-text)]/75">
              No properties match this search yet. Please adjust your filters.
            </p>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
