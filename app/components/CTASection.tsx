import { ImageWithFallback } from "@/app/components/ImageWithFallback";

type CTASectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function CTASection({
  id,
  label,
  title,
  description,
  buttonLabel,
  buttonHref,
  imageSrc,
  imageAlt,
}: CTASectionProps) {
  return (
    <section
      id={id}
      className="relative isolate my-16 overflow-hidden px-5 py-20 sm:px-6 lg:my-18 lg:px-10 lg:py-24"
    >
      <ImageWithFallback
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-deep-green)]/78" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl text-center text-[var(--color-ivory)]">
        <p className="eyebrow text-[var(--color-light-gold)]">{label}</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-cream)]/90 md:text-lg">
          {description}
        </p>
        <a
          href={buttonHref}
          className="mt-8 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-7 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-deep-green)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)]"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
