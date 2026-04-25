import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/app/components/CTASection";
import { Footer } from "@/app/components/Footer";
import { FounderAdvisorSection } from "@/app/components/FounderAdvisorSection";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { PropertyCard } from "@/app/components/PropertyCard";
import { Testimonials } from "@/app/components/Testimonials";
import { properties } from "@/app/data/properties";

export const metadata: Metadata = {
  title: "Cervantes | Boutique Property Advisory",
  description:
    "Cervantes is a boutique property advisory firm offering local knowledge and international expertise for buyers, sellers and investors in premium Spanish real estate.",
};

export default function Home() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main">
        <Hero />

        <section
          id="properties"
          className="bg-[var(--color-deep-green)] px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-10 lg:pt-28 lg:pb-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-[var(--color-light-gold)]">Featured Properties</p>
                <h2 className="mt-3 font-serif text-[2.2rem] leading-[1.12] text-[var(--color-ivory)] sm:text-4xl md:text-[3.35rem]">
                  Chosen For You
                </h2>
              </div>
            </div>
            <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                href="/properties"
                className="inline-flex border border-[var(--color-gold)]/70 px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] text-[var(--color-gold)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)]"
              >
                View all properties
              </Link>
            </div>
          </div>
        </section>

        <CTASection
          id="explore-properties"
          label="Curated Collection"
          title="Explore All Properties"
          description="Browse a carefully selected collection of villas, penthouses and new developments across the Costa del Sol."
          buttonLabel="View Properties"
          buttonHref="/properties"
          imageSrc="/images/coast.jpg"
          imageAlt="Curated luxury homes along the Costa del Sol"
        />
        <CTASection
          id="sell"
          label="For Owners"
          title="List With Cervantes"
          description="Position your property with discreet marketing, refined presentation and direct founder-led guidance."
          buttonLabel="Arrange a Valuation"
          buttonHref="/#contact"
          imageSrc="/images/sell.jpg"
          imageAlt="Luxury residence prepared for listing with Cervantes"
        />
        <FounderAdvisorSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
