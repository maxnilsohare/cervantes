import Link from "next/link";
import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import type { Property } from "@/app/data/properties";

type SimilarPropertiesProps = {
  currentSlug: string;
  properties: Property[];
};

export function SimilarProperties({ currentSlug, properties }: SimilarPropertiesProps) {
  const similar = properties.filter((property) => property.slug !== currentSlug).slice(0, 3);

  return (
    <section id="similar" className="mt-10 border-t border-[var(--color-gold)]/18 pt-8 lg:mt-12 lg:pt-10">
      <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Similar Properties</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {similar.map((property) => (
          <article
            key={property.slug}
            className="group border border-[var(--color-gold)]/20 bg-[var(--color-ivory)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-dark-gold)]/45"
          >
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback
                src={property.heroImage}
                alt={`${property.title} in ${property.location}`}
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="space-y-2 p-5">
              <p className="font-serif text-2xl text-[var(--color-dark-gold)]">{property.price}</p>
              <h3 className="font-serif text-[1.72rem] leading-tight text-[var(--color-text)]">{property.title}</h3>
              <p className="text-sm text-[var(--color-text)]/75">{property.location}</p>
              <p className="text-[11px] tracking-[0.14em] text-[var(--color-olive)] uppercase">
                {property.bedrooms} Beds · {property.bathrooms} Baths · {property.builtSize}
              </p>
              <p className="border-l border-[var(--color-gold)]/45 pl-3 text-sm leading-relaxed text-[var(--color-text)]/82">
                {property.reasonToView}
              </p>
              <Link
                href={`/properties/${property.slug}`}
                className="inline-flex pt-2 text-[11px] tracking-[0.16em] text-[var(--color-dark-gold)] uppercase hover:text-[var(--color-deep-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                View Property
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
