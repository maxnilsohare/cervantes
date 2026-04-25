import type { Property } from "@/app/data/properties";

type PropertySummaryProps = {
  property: Property;
};

export function PropertySummary({ property }: PropertySummaryProps) {
  return (
    <section className="mt-12 border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-6 sm:p-9 lg:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="border border-[var(--color-dark-gold)]/60 bg-[var(--color-deep-olive)]/95 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-[var(--color-gold)] uppercase">
          {property.status}
        </span>
        <span className="text-xs tracking-[0.16em] text-[var(--color-olive)] uppercase">
          {property.reference}
        </span>
      </div>

      <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--color-text)] sm:text-5xl md:text-6xl">
        {property.title}
      </h1>
      <p className="mt-3 text-base text-[var(--color-text)]/80">{property.location}</p>
      <p className="mt-6 font-serif text-4xl text-[var(--color-dark-gold)] sm:text-5xl">{property.price}</p>

      <div className="mt-9 grid gap-3 border-t border-[var(--color-gold)]/20 pt-7 text-sm sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Bedrooms" value={String(property.bedrooms)} />
        <Stat label="Bathrooms" value={String(property.bathrooms)} />
        <Stat label="Built size" value={property.builtSize} />
        <Stat label="Terrace" value={property.terraceSize} />
        <Stat label="Plot" value={property.plotSize} />
      </div>

      <div className="mt-9 flex flex-wrap gap-3">
        <a
          href="#enquiry"
          className="inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          Enquire About This Property
        </a>
        <a
          href="#enquiry"
          className="inline-flex border border-[var(--color-dark-gold)]/70 px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-dark-gold)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          Book a Private Viewing
        </a>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-[10px] tracking-[0.15em] text-[var(--color-olive)] uppercase">{label}</span>
      <span className="mt-1 block text-[var(--color-text)]">{value}</span>
    </p>
  );
}
