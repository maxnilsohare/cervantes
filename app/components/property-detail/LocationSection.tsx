import type { Property } from "@/app/data/properties";

type LocationSectionProps = {
  property: Property;
};

export function LocationSection({ property }: LocationSectionProps) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Discover the Area</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid min-h-[300px] place-items-center border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] text-sm tracking-[0.12em] text-[var(--color-olive)] uppercase sm:min-h-[340px]">
          Map placeholder
        </div>
        <div className="border border-[var(--color-gold)]/20 bg-[var(--color-ivory)] p-5">
          <p className="text-xs tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">{property.area}</p>
          <p className="mt-3 text-sm leading-loose text-[var(--color-text)]/82">
            {property.area} offers an enviable mix of Mediterranean lifestyle, premium dining, beach
            access, and year-round connectivity. It continues to attract both lifestyle buyers and
            long-term investors seeking resilient demand and quality surroundings.
          </p>
          <p className="mt-4 text-xs text-[var(--color-olive)]">
            Coordinates: {property.latitude.toFixed(4)}, {property.longitude.toFixed(4)}
          </p>
        </div>
      </div>
    </section>
  );
}
