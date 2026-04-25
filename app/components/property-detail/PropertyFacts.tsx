import type { Property } from "@/app/data/properties";
import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Banknote,
  Bath,
  BedDouble,
  CarFront,
  CheckCircle2,
  Compass,
  DoorClosed,
  Dumbbell,
  HousePlus,
  Hash,
  Home,
  Layout,
  Map,
  Mountain,
  Shield,
  Sun,
  Trees,
  Ruler,
  Waves,
} from "lucide-react";

type PropertyFactsProps = {
  property: Property;
};

export function PropertyFacts({ property }: PropertyFactsProps) {
  return (
    <>
      <section id="overview" className="mt-12 lg:mt-16">
        <p className="text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">Overview</p>
        <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Property at a Glance</h2>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <GlanceItem label="Price" value={property.price} icon={Banknote} />
          <GlanceItem label="Bedrooms" value={String(property.bedrooms)} icon={BedDouble} />
          <GlanceItem label="Bathrooms" value={String(property.bathrooms)} icon={Bath} />
          <GlanceItem label="Built Size" value={property.builtSize} icon={Ruler} />
          <GlanceItem label="Terrace Size" value={property.terraceSize} icon={Layout} />
          <GlanceItem label="Plot Size" value={property.plotSize} icon={Map} />
          <GlanceItem label="Property Type" value={property.propertyType} icon={Home} />
          <GlanceItem label="Reference" value={property.reference} icon={Hash} />
        </div>
      </section>

      <section className="mt-12 border-t border-[var(--color-gold)]/18 pt-10 lg:mt-16 lg:pt-12">
        <p className="text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">Description</p>
        <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Property Description</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-text)]/84">
          {property.fullDescription.length > 520
            ? `${property.fullDescription.slice(0, 520).trimEnd()}...`
            : property.fullDescription}
        </p>
      </section>

      <section id="features" className="mt-12 border-t border-[var(--color-gold)]/18 pt-10 lg:mt-16 lg:pt-12">
        <p className="text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">Features</p>
        <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Key Features</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {property.features.slice(0, 8).map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2.5 border border-[var(--color-gold)]/20 bg-[var(--color-ivory)] px-4 py-3.5 text-sm text-[var(--color-text)]"
            >
              <FeatureIcon feature={feature} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

function GlanceItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-4 py-3.5">
      <div className="flex items-center gap-2">
        <Icon size={18} strokeWidth={1.8} className="text-[var(--color-olive)]/82" aria-hidden="true" />
        <p className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">{label}</p>
      </div>
      <p className="mt-1.5 font-serif text-xl text-[var(--color-deep-olive)]">{value}</p>
    </div>
  );
}

function FeatureIcon({ feature }: { feature: string }) {
  const key = feature.toLowerCase();

  const Icon = key.includes("sea")
    ? Waves
    : key.includes("pool")
      ? HousePlus
      : key.includes("gated") || key.includes("security")
        ? Shield
        : key.includes("south")
          ? Sun
          : key.includes("terrace")
            ? Trees
            : key.includes("air")
              ? AirVent
              : key.includes("parking")
                ? CarFront
                : key.includes("amenit")
                  ? DoorClosed
                  : key.includes("golf")
                    ? Mountain
                    : key.includes("school")
                      ? Compass
                      : key.includes("marble") || key.includes("kitchen")
                        ? Layout
                        : key.includes("spa") || key.includes("sauna")
                          ? Dumbbell
                          : CheckCircle2;

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)] text-[var(--color-dark-gold)]"
    >
      <Icon size={14} strokeWidth={1.8} />
    </span>
  );
}
