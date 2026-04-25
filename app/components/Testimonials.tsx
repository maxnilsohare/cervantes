export function Testimonials() {
  return (
    <section className="bg-[var(--color-ivory)] px-5 py-14 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="eyebrow text-[var(--color-dark-gold)]">Testimonials</p>
        <h2 className="mt-3 font-serif text-3xl leading-[1.15] text-[var(--color-text)] md:text-4xl">
          Kind Words
        </h2>
        <blockquote className="mx-auto mt-7 max-w-3xl font-serif text-xl leading-relaxed text-[var(--color-text)]/90 md:text-[1.6rem]">
          &ldquo;Cervantes managed every detail with discretion, warmth, and precision. Their local
          insight and international network made all the difference to our family&apos;s move to
          Marbella.&rdquo;
        </blockquote>
        <p className="mt-5 text-xs font-medium tracking-[0.2em] text-[var(--color-olive)] uppercase">
          Elena R. — Marbella
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-1.5 w-5 bg-[var(--color-gold)]" />
          <span className="h-1.5 w-5 bg-[var(--color-gold)]/35" />
        </div>
      </div>
    </section>
  );
}
