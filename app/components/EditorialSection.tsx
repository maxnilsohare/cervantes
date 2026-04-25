import { ImageWithFallback } from "@/app/components/ImageWithFallback";

type EditorialSectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export function EditorialSection({
  id,
  label,
  title,
  description,
  ctaLabel,
  image,
  imageAlt,
  reverse = false,
}: EditorialSectionProps) {
  return (
    <section id={id} className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="group relative h-[280px] overflow-hidden border border-[var(--color-gold)]/25 sm:h-[340px] md:h-[420px] lg:h-[430px]">
          <ImageWithFallback
            src={image}
            alt={imageAlt}
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[var(--color-deep-green)]/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="space-y-6 lg:pl-5">
          <p className="eyebrow text-[var(--color-dark-gold)]">{label}</p>
          <h2 className="font-serif text-[2.15rem] leading-[1.12] text-[var(--color-text)] sm:text-4xl md:text-[3.1rem] xl:text-[3.45rem]">
            {title}
          </h2>
          <p className="max-w-xl text-base leading-loose text-[var(--color-text)]/78">
            {description}
          </p>
          <a
            href="/contact"
            className="inline-flex border border-[var(--color-dark-gold)]/70 px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] text-[var(--color-dark-gold)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
