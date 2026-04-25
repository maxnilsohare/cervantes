import type { Property } from "@/app/data/properties";

type MarketViewProps = {
  property: Property;
};

export function MarketView({ property }: MarketViewProps) {
  const low = parseCurrency(property.marketRangeLow);
  const high = parseCurrency(property.marketRangeHigh);
  const estimate = parseCurrency(property.marketEstimate);
  const rangePosition = high > low ? Math.max(0, Math.min(100, ((estimate - low) / (high - low)) * 100)) : 50;

  return (
    <section
      id="market-view"
      className="mt-14 border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-6 sm:p-8 lg:p-9"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Cervantes Market View</h2>
        <span className="hidden border border-[var(--color-dark-gold)]/45 px-3 py-1 text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase sm:inline-flex">
          Advisory Insight
        </span>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(280px,1.2fr)_minmax(0,1fr)]">
        <div className="border border-[var(--color-gold)]/25 bg-[var(--color-cream)] p-5 sm:p-6">
          <p className="text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
            Estimated Market Value
          </p>
          <p className="mt-2 font-serif text-4xl leading-none text-[var(--color-deep-olive)] sm:text-5xl">
            {property.marketEstimate}
          </p>
          <p className="mt-5 text-[10px] tracking-[0.14em] text-[var(--color-olive)] uppercase">
            Market Value Range
          </p>
          <p className="mt-1 text-sm text-[var(--color-text)]">
            {property.marketRangeLow} - {property.marketRangeHigh}
          </p>
          <div className="mt-3 h-2 w-full bg-[var(--color-gold)]/18">
            <span
              className="block h-2 bg-[var(--color-dark-gold)]"
              style={{ width: `${rangePosition}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
        <Metric label="Price per m²" value={property.pricePerSqm} />
        <Metric label="Local Area Trend" value={property.areaTrend} />
        <Metric
          label="Estimated Rental Potential"
          value={`${property.rentalEstimateLow} - ${property.rentalEstimateHigh}`}
        />
        <Metric label="Confidence Level" value={property.confidence} />
        </div>
      </div>

      <p className="mt-7 border-t border-[var(--color-gold)]/20 pt-5 text-xs leading-relaxed text-[var(--color-olive)]/85">
        Indicative estimate only. Final valuation depends on condition, view, legal status,
        comparable sales and market demand.
      </p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--color-gold)]/20 bg-[var(--color-cream)] p-4 sm:p-5">
      <p className="text-[10px] tracking-[0.14em] text-[var(--color-olive)] uppercase">{label}</p>
      <p className="mt-2 font-serif text-xl leading-snug text-[var(--color-deep-olive)]">{value}</p>
    </div>
  );
}

function parseCurrency(value: string) {
  const parsed = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
