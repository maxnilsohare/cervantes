import Image from "next/image";
import Link from "next/link";

export function FounderAdvisorSection() {
  return (
    <section id="jennifer" className="bg-[var(--color-cream)] px-4 py-16 sm:px-6 sm:py-18 lg:px-10 lg:py-22">
      <div className="mx-auto grid w-full max-w-7xl gap-8 border border-[var(--color-gold)]/20 bg-[var(--color-ivory)] p-5 sm:p-7 lg:grid-cols-[minmax(290px,0.85fr)_minmax(0,1fr)] lg:gap-10 lg:p-10">
        <div className="relative border border-[var(--color-gold)]/25 bg-[var(--color-cream)] p-3 sm:p-4">
          <div className="mx-auto w-full max-w-[420px] overflow-hidden border border-[var(--color-gold)]/18 bg-[var(--color-ivory)]">
            <Image
              src="/images/founder.jpg"
              alt="Jennifer Fogelberg, founder of Cervantes"
              width={1100}
              height={1460}
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="h-auto w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:pr-5">
          <p className="eyebrow text-[var(--color-dark-gold)]">Founder-Led Advisory</p>
          <h2 className="mt-3 max-w-[20ch] font-serif text-[2.2rem] leading-[1.08] text-[var(--color-text)] sm:text-[2.8rem]">
            Personal guidance, from search to signature.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.95] text-[var(--color-text)]/84 sm:text-base">
            Cervantes is led by Jennifer Fogelberg, a boutique property advisor helping buyers,
            sellers and investors navigate the Costa del Sol with clarity, discretion and local
            insight.
          </p>
          <p className="mt-3.5 max-w-[62ch] text-[15px] leading-[1.95] text-[var(--color-text)]/84 sm:text-base">
            As a founder-led advisory, every client works directly with the person behind the
            business - no handovers, no call-centre process, just considered guidance from first
            conversation to completion.
          </p>

          <ul className="mt-6 grid gap-2.5 text-sm text-[var(--color-olive)] sm:grid-cols-2">
            {[
              "Local market knowledge",
              "Discreet one-to-one guidance",
              "Buyer and seller advisory",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/65 px-3 py-2">
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/45 bg-[var(--color-cream)] text-[11px] text-[var(--color-dark-gold)]"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-[var(--color-deep-olive)] uppercase transition hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Book a Private Consultation
            </Link>
            <Link
              href="/about"
              className="inline-flex px-2 py-2 text-[11px] font-medium tracking-[0.16em] text-[var(--color-dark-gold)] uppercase transition hover:text-[var(--color-deep-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Learn more about Cervantes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
