import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { PropertyCard } from "@/app/components/PropertyCard";
import { getAllProperties } from "@/app/lib/propertyRepository";

type PropertiesPageProps = {
  searchParams: Promise<{
    type?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    reference?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Properties | Cervantes",
  description: "Browse premium Spanish properties with Cervantes Boutique Property Advisory.",
  alternates: {
    canonical: "/properties",
  },
  openGraph: {
    title: "Properties | Cervantes",
    description: "Browse premium Spanish properties with Cervantes Boutique Property Advisory.",
    url: "/properties",
    images: ["/images/coast.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties | Cervantes",
    description: "Browse premium Spanish properties with Cervantes Boutique Property Advisory.",
    images: ["/images/coast.jpg"],
  },
};

function includesValue(source: string, query?: string) {
  if (!query) {
    return true;
  }
  return source.toLowerCase().includes(query.toLowerCase());
}

function normalizeTypeValue(value?: string) {
  if (!value) return "";
  return value
    .toLowerCase()
    .replace(/new developments?/, "new development")
    .replace(/ies$/, "y")
    .replace(/s$/, "")
    .trim();
}

function parseMoney(value?: string) {
  if (!value) return null;
  const parsed = Number(value.replace(/[^\d]/g, ""));
  return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
}

function formatMoneyParam(value?: string) {
  const parsed = parseMoney(value);
  return parsed === null ? "Any" : `€${parsed.toLocaleString("en-GB")}`;
}

function parseBedroomsFilter(value?: string) {
  if (!value) return null;
  if (value === "5+") return { min: 5, exact: null as number | null };
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return { min: null as number | null, exact: parsed };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const properties = await getAllProperties();
  const bedroomFilter = parseBedroomsFilter(params.bedrooms);
  const selectedMinPrice = parseMoney(params.minPrice);
  const selectedMaxPrice = parseMoney(params.maxPrice);
  const selectedType = normalizeTypeValue(params.type);

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = includesValue(property.location, params.location);
    const propertyType = normalizeTypeValue(property.propertyType);
    const matchesType =
      !selectedType || propertyType.includes(selectedType) || includesValue(property.title, params.type);
    const propertyPrice = Number(property.price.replace(/[^\d]/g, ""));
    const matchesMinPrice = selectedMinPrice === null || propertyPrice >= selectedMinPrice;
    const matchesMaxPrice = selectedMaxPrice === null || propertyPrice <= selectedMaxPrice;
    const matchesBedrooms = !bedroomFilter
      ? true
      : bedroomFilter.min !== null
        ? property.bedrooms >= bedroomFilter.min
        : property.bedrooms === bedroomFilter.exact;
    const matchesReference = includesValue(property.reference, params.reference);

    return (
      matchesLocation &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesBedrooms &&
      matchesReference
    );
  });

  const hasFilters = Boolean(
    params.type || params.location || params.minPrice || params.maxPrice || params.bedrooms || params.reference
  );

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
                Type: {params.type || "Any"} | Location: {params.location || "Any"} | Min:{" "}
                {formatMoneyParam(params.minPrice)} | Max: {formatMoneyParam(params.maxPrice)} |
                Bedrooms: {params.bedrooms || "Any"} | Reference: {params.reference || "Any"}
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

          <section id="locations" className="mt-16 border-t border-[var(--color-gold)]/20 pt-10">
            <p className="eyebrow text-[var(--color-dark-gold)]">Locations</p>
            <h2 className="mt-3 font-serif text-3xl text-[var(--color-text)] sm:text-4xl">
              Costa del Sol Focus Areas
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from(new Set(properties.map((property) => property.area))).map((area) => (
                <Link
                  key={area}
                  href={`/properties?location=${encodeURIComponent(area)}`}
                  className="border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-4 py-3 text-sm text-[var(--color-text)] transition hover:border-[var(--color-dark-gold)]/45 hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  {area}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
