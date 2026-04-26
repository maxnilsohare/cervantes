import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getAllProperties, getPropertyBySlug } from "@/app/lib/propertyRepository";
import { PropertyMediaShowcase } from "@/app/components/PropertyMediaShowcase";
import { SectionProgressNav } from "@/app/components/property-detail/SectionProgressNav";
import { PropertyFacts } from "@/app/components/property-detail/PropertyFacts";
import { BuyingCostCalculator } from "@/app/components/BuyingCostCalculator";
import { EnquiryCard } from "@/app/components/property-detail/EnquiryCard";
import { PropertyMap } from "@/app/components/PropertyMap";
import { SimilarProperties } from "@/app/components/property-detail/SimilarProperties";
import { PropertyDetailsAccordion } from "@/app/components/property-detail/PropertyDetailsAccordion";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function toTelHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Cervantes",
    };
  }

  return {
    title: property.seoTitle || `${property.title} | Cervantes`,
    description: property.seoDescription || property.shortDescription,
    alternates: {
      canonical: `/properties/${property.slug}`,
    },
    openGraph: {
      title: property.seoTitle || `${property.title} | Cervantes`,
      description: property.seoDescription || property.shortDescription,
      url: `/properties/${property.slug}`,
      images: [property.ogImage || property.heroImage],
    },
    twitter: {
      card: "summary_large_image",
      title: property.seoTitle || `${property.title} | Cervantes`,
      description: property.seoDescription || property.shortDescription,
      images: [property.ogImage || property.heroImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  const properties = await getAllProperties();

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="px-4 pb-32 pt-14 sm:px-7 lg:px-10 lg:pb-24 lg:pt-16">
        <article id="property-detail-content" className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-olive)]/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[var(--color-dark-gold)]">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/properties" className="hover:text-[var(--color-dark-gold)]">
                  Properties
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-text)]">{property.title}</li>
            </ol>
          </nav>

          <PropertyMediaShowcase
            title={property.title}
            location={property.location}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            builtSize={property.builtSize}
            galleryImages={property.galleryImages}
          />

          <SectionProgressNav contentRootId="property-detail-content" />

          <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(250px,290px)] lg:items-start">
            <div>
              <PropertyFacts property={property} />
              <PropertyMap
                location={property.location}
                latitude={property.latitude}
                longitude={property.longitude}
                nearbyGuide={property.nearbyGuide}
              />
              <BuyingCostCalculator
                propertyPrice={property.price}
                listedCommunityFees={property.communityFees}
              />
              <PropertyDetailsAccordion property={property} />
              <SimilarProperties currentSlug={property.slug} properties={properties} />
            </div>
            <div className="mx-auto w-full max-w-md lg:sticky lg:top-[130px] lg:max-w-none">
              <EnquiryCard property={property} />
            </div>
          </div>
        </article>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-gold)]/30 bg-[var(--color-ivory)] p-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-[11px] font-medium tracking-[0.16em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)]"
            >
              Enquire
            </a>
            <a
              href={`tel:${toTelHref(property.agentPhone)}`}
              className="inline-flex items-center justify-center border border-[var(--color-dark-gold)]/70 px-4 py-3 text-[11px] font-medium tracking-[0.16em] text-[var(--color-dark-gold)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)]"
            >
              Call
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
