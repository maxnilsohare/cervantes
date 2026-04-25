import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import type { Property } from "@/app/data/properties";
import Link from "next/link";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group overflow-hidden border border-[var(--color-light-gold)]/20 bg-[var(--color-forest-green)]/86 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-light-gold)]/45">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={property.heroImage}
          alt={`${property.title} in ${property.location}`}
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 border border-[var(--color-light-gold)]/50 bg-[var(--color-deep-green)]/80 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-[var(--color-light-gold)] uppercase">
          {property.status}
        </span>
      </div>
      <div className="space-y-3 p-7 text-[var(--color-ivory)]">
        <p className="font-serif text-[1.7rem] text-[var(--color-light-gold)]">{property.price}</p>
        <h3 className="font-serif text-[2rem] leading-tight">{property.title}</h3>
        <p className="text-sm tracking-[0.02em] text-[var(--color-cream)]/90">{property.location}</p>
        <p className="line-clamp-2 min-h-12 text-sm leading-relaxed text-[var(--color-cream)]/75">
          {property.shortDescription}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.12em] text-[var(--color-cream)]/80">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.builtSize}</span>
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="inline-flex items-center gap-2 pt-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-light-gold)] uppercase hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
        >
          View Property
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
