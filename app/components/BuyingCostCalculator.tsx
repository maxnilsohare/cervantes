"use client";

import { useMemo, useState } from "react";

type BuyingCostCalculatorProps = {
  propertyPrice: string;
  listedCommunityFees?: number;
};

function parsePrice(price: string) {
  const numeric = price.replace(/[^\d]/g, "");
  const parsed = Number.parseInt(numeric, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function euro(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function BuyingCostCalculator({
  propertyPrice,
  listedCommunityFees,
}: BuyingCostCalculatorProps) {
  const listedPrice = useMemo(() => Math.max(100000, parsePrice(propertyPrice)), [propertyPrice]);
  const minPrice = Math.round(listedPrice * 0.7);
  const maxPrice = Math.round(listedPrice * 1.3);
  const hasLockedCommunityFees =
    typeof listedCommunityFees === "number" &&
    Number.isFinite(listedCommunityFees) &&
    listedCommunityFees > 0;

  const [price, setPrice] = useState(clamp(listedPrice, minPrice, maxPrice));
  const [depositPercent, setDepositPercent] = useState(30);
  const [termYears, setTermYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [purchaseCostsPercent, setPurchaseCostsPercent] = useState(10);
  const [communityFees, setCommunityFees] = useState(hasLockedCommunityFees ? listedCommunityFees : 350);

  const results = useMemo(() => {
    const depositAmount = price * (depositPercent / 100);
    const loanAmount = Math.max(0, price - depositAmount);
    const totalPayments = Math.max(1, termYears * 12);
    const monthlyRate = interestRate > 0 ? interestRate / 100 / 12 : 0;

    let monthlyMortgagePayment = 0;
    if (monthlyRate === 0) {
      monthlyMortgagePayment = loanAmount / totalPayments;
    } else {
      const factor = (1 + monthlyRate) ** totalPayments;
      monthlyMortgagePayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    }

    const purchaseCosts = price * (purchaseCostsPercent / 100);
    const totalCashRequired = depositAmount + purchaseCosts;
    const monthlyOwnershipEstimate = monthlyMortgagePayment + Math.max(0, communityFees);

    return {
      loanAmount,
      monthlyMortgagePayment,
      purchaseCosts,
      totalCashRequired,
      monthlyOwnershipEstimate,
    };
  }, [communityFees, depositPercent, interestRate, price, purchaseCostsPercent, termYears]);

  const inputClassName =
    "h-10 w-full border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] px-3 text-sm text-[var(--color-text)] outline-none transition focus-visible:border-[var(--color-dark-gold)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35";
  const sliderClassName =
    "mt-2 h-1.5 w-full cursor-pointer appearance-none bg-[var(--color-gold)]/18 accent-[var(--color-dark-gold)]";

  return (
    <section id="costs" className="mt-10 border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-4 sm:p-6 lg:mt-12">
      <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Buying Cost Snapshot</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-olive)]/84">
        Estimate monthly payments and key acquisition costs before requesting a private viewing.
      </p>
      <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-[var(--color-olive)]/80">
        Built for cross-border buyers who want a quick capital and monthly ownership snapshot before
        progressing to legal and lending due diligence.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)]">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Property Price
            </span>
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              step={1000}
              value={price}
              onChange={(event) => setPrice(clamp(Number(event.target.value), minPrice, maxPrice))}
              className={inputClassName}
            />
            <input
              aria-label="Property price slider"
              type="range"
              min={minPrice}
              max={maxPrice}
              step={10000}
              value={clamp(price || minPrice, minPrice, maxPrice)}
              onChange={(event) => setPrice(clamp(Number(event.target.value), minPrice, maxPrice))}
              className={sliderClassName}
            />
            <p className="mt-1 text-[10px] text-[var(--color-olive)]/80">
              Range based on listing: {euro(minPrice)} to {euro(maxPrice)}
            </p>
          </label>

          <label className="block">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Deposit %
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={depositPercent}
              onChange={(event) => setDepositPercent(Number(event.target.value))}
              className={inputClassName}
            />
            <input
              aria-label="Deposit percentage slider"
              type="range"
              min={0}
              max={90}
              step={1}
              value={Math.max(0, Math.min(90, depositPercent || 0))}
              onChange={(event) => setDepositPercent(Number(event.target.value))}
              className={sliderClassName}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Mortgage Term (Years)
            </span>
            <input
              type="number"
              min={1}
              max={40}
              step={1}
              value={termYears}
              onChange={(event) => setTermYears(Number(event.target.value))}
              className={inputClassName}
            />
            <input
              aria-label="Mortgage term slider"
              type="range"
              min={5}
              max={40}
              step={1}
              value={Math.max(5, Math.min(40, termYears || 5))}
              onChange={(event) => setTermYears(Number(event.target.value))}
              className={sliderClassName}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Interest Rate %
            </span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={interestRate}
              onChange={(event) => setInterestRate(Number(event.target.value))}
              className={inputClassName}
            />
            <input
              aria-label="Interest rate slider"
              type="range"
              min={0}
              max={12}
              step={0.1}
              value={Math.max(0, Math.min(12, interestRate || 0))}
              onChange={(event) => setInterestRate(Number(event.target.value))}
              className={sliderClassName}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Purchase Costs %
            </span>
            <input
              type="number"
              min={0}
              step={0.5}
              value={purchaseCostsPercent}
              onChange={(event) => setPurchaseCostsPercent(Number(event.target.value))}
              className={inputClassName}
            />
            <input
              aria-label="Purchase costs slider"
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={Math.max(0, Math.min(20, purchaseCostsPercent || 0))}
              onChange={(event) => setPurchaseCostsPercent(Number(event.target.value))}
              className={sliderClassName}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1 block text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
              Monthly Community Fees
            </span>
            <input
              type="number"
              min={0}
              step={10}
              value={communityFees}
              onChange={(event) =>
                setCommunityFees(hasLockedCommunityFees ? (listedCommunityFees ?? 0) : Number(event.target.value))
              }
              className={inputClassName}
              disabled={hasLockedCommunityFees}
            />
            <input
              aria-label="Community fees slider"
              type="range"
              min={0}
              max={3000}
              step={25}
              value={Math.max(0, Math.min(3000, communityFees || 0))}
              onChange={(event) =>
                setCommunityFees(hasLockedCommunityFees ? (listedCommunityFees ?? 0) : Number(event.target.value))
              }
              className={sliderClassName}
              disabled={hasLockedCommunityFees}
            />
            {hasLockedCommunityFees ? (
              <p className="mt-1 text-[10px] text-[var(--color-olive)]/80">Locked from listing details</p>
            ) : null}
          </label>
        </div>

        <aside className="border border-[var(--color-gold)]/20 bg-[var(--color-cream)] p-4 sm:p-5">
          <p className="text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
            Primary Estimate
          </p>
          <h3 className="mt-1.5 text-sm text-[var(--color-olive)]">Estimated monthly payment</h3>
          <p className="mt-1 font-serif text-[2.15rem] leading-none text-[var(--color-deep-olive)] sm:text-[2.35rem]">
            {euro(results.monthlyMortgagePayment)}
          </p>

          <div className="mt-4 border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3.5 py-3">
            <p className="text-[10px] tracking-[0.12em] text-[var(--color-dark-gold)] uppercase">
              Total Estimated Cash Required
            </p>
            <p className="mt-1 font-serif text-2xl text-[var(--color-deep-olive)]">
              {euro(results.totalCashRequired)}
            </p>
          </div>

          <dl className="mt-4 space-y-2.5 border-t border-[var(--color-gold)]/20 pt-3.5">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-sm text-[var(--color-olive)]">Estimated loan amount</dt>
              <dd className="font-medium text-[var(--color-deep-olive)]">{euro(results.loanAmount)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[var(--color-gold)]/14 pt-2.5">
              <dt className="text-sm text-[var(--color-olive)]">Estimated purchase costs</dt>
              <dd className="font-medium text-[var(--color-deep-olive)]">{euro(results.purchaseCosts)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[var(--color-gold)]/14 pt-2.5">
              <dt className="text-sm text-[var(--color-olive)]">Monthly ownership estimate</dt>
              <dd className="font-medium text-[var(--color-deep-olive)]">
                {euro(results.monthlyOwnershipEstimate)}
              </dd>
            </div>
          </dl>

          <p className="mt-4 border-t border-[var(--color-gold)]/18 pt-3 text-[11px] leading-relaxed text-[var(--color-olive)]/80">
            Figures are indicative only and do not constitute mortgage, tax or financial advice. Final
            costs depend on lender terms, buyer profile, property type, region and legal due diligence.
          </p>
        </aside>
      </div>
    </section>
  );
}
