import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import { SearchBar } from "@/app/components/SearchBar";

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[78vh] flex-col items-center justify-center overflow-visible px-4 py-24 pb-16 text-center sm:min-h-[82vh] sm:px-6 sm:py-28 sm:pb-20 md:min-h-[92vh] md:py-36 md:pb-24 lg:min-h-[94vh] lg:pb-28"
      aria-label="Hero"
    >
      <ImageWithFallback
        src="/images/hero.jpg"
        alt="Elegant Spanish luxury villa exterior at sunset"
        priority
        className="absolute inset-0 scale-[1.04] object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-deep-green)]/80" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl text-[var(--color-ivory)]">
        <p className="eyebrow mb-7 text-[var(--color-light-gold)]">CERVANTES</p>
        <h1 className="mx-auto max-w-[14ch] font-serif text-3xl leading-[1.08] sm:text-5xl md:max-w-none md:text-7xl">
          Boutique Property Advisory
        </h1>
        <p className="mx-auto mt-6 max-w-[28ch] text-sm leading-relaxed text-[var(--color-cream)] sm:mt-7 sm:max-w-2xl sm:text-base md:text-xl">
          Local Knowledge. International Expertise.
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href="#properties"
            className="inline-flex w-full justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] px-7 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-deep-green)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)] sm:w-auto"
          >
            View Properties
          </a>
          <a
            href="#contact"
            className="inline-flex w-full justify-center border border-[var(--color-gold)]/80 px-7 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-ivory)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)] sm:w-auto"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      <div className="relative z-20 mt-10 w-full md:mt-12 md:translate-y-12 lg:translate-y-14">
        <SearchBar inHero />
      </div>
    </section>
  );
}
