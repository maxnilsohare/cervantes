"use client";

import { useState } from "react";

const locations = [
  "Marbella Golden Mile",
  "Sierra Blanca",
  "Nueva Andalucia",
  "Puerto Banus",
  "La Zagaleta",
  "Benahavis",
  "Estepona",
  "San Pedro de Alcantara",
  "Fuengirola",
  "Reserva del Higueron",
  "Mijas Costa",
  "Sotogrande",
];

const propertyTypes = [
  { label: "Any type", value: "" },
  { label: "Apartments", value: "apartment" },
  { label: "Penthouses", value: "penthouse" },
  { label: "Houses", value: "house" },
  { label: "Villas", value: "villa" },
  { label: "Townhouses", value: "townhouse" },
  { label: "Plots", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "New Developments", value: "new development" },
];

const minPrices = [
  { label: "No min", value: "" },
  { label: "€100,000", value: "100000" },
  { label: "€150,000", value: "150000" },
  { label: "€200,000", value: "200000" },
  { label: "€300,000", value: "300000" },
  { label: "€500,000", value: "500000" },
  { label: "€750,000", value: "750000" },
  { label: "€1,000,000", value: "1000000" },
  { label: "€1,500,000", value: "1500000" },
  { label: "€2,000,000", value: "2000000" },
];

const maxPrices = [
  { label: "No max", value: "" },
  { label: "€300,000", value: "300000" },
  { label: "€500,000", value: "500000" },
  { label: "€750,000", value: "750000" },
  { label: "€1,000,000", value: "1000000" },
  { label: "€1,500,000", value: "1500000" },
  { label: "€2,000,000", value: "2000000" },
  { label: "€3,000,000", value: "3000000" },
  { label: "€5,000,000", value: "5000000" },
  { label: "€10,000,000+", value: "10000000" },
];

const bedroomOptions = [
  { label: "Any", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5+", value: "5+" },
];

type SearchBarProps = {
  inHero?: boolean;
  className?: string;
};

export function SearchBar({ inHero = false, className = "" }: SearchBarProps) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const wrapperClassName = inHero
    ? "relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
    : "relative z-20 mx-auto -mt-12 w-full max-w-7xl px-4 sm:-mt-16 sm:px-6 lg:px-10";

  const panelClassName = inHero
    ? "border border-[var(--color-gold)]/30 bg-[var(--color-ivory)]/97 p-4 shadow-[0_24px_46px_-30px_rgba(34,42,24,0.58)] backdrop-blur-[2px] sm:p-5 md:p-6"
    : "border border-[var(--color-gold)]/30 bg-[var(--color-ivory)]/98 p-4 sm:p-5 md:p-6";

  const fieldClass =
    "h-11 w-full rounded-lg border border-[var(--color-gold)]/28 bg-[var(--color-ivory)] px-3.5 text-sm text-[var(--color-text)] transition duration-200 hover:border-[var(--color-gold)]/48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35";
  const labelClass = "mb-1.5 text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase";

  return (
    <section className={`${wrapperClassName} ${className}`.trim()}>
      <form
        method="get"
        action="/properties"
        className={panelClassName}
        aria-label="Property search"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[var(--color-gold)]/22 pb-3">
          <p className="eyebrow text-[var(--color-olive)]">Concierge Search</p>
          <span className="hidden text-[10px] tracking-[0.18em] text-[var(--color-olive)] uppercase sm:inline">
            Curated selections
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <label className="lg:col-span-2">
            <span className={labelClass}>Location</span>
            <select name="location" className={fieldClass} defaultValue="">
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Property type</span>
            <select name="type" className={fieldClass} defaultValue="">
              {propertyTypes.map((type) => (
                <option key={type.label} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Min price</span>
            <select name="minPrice" className={fieldClass} defaultValue="">
              {minPrices.map((price) => (
                <option key={price.label} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Max price</span>
            <select name="maxPrice" className={fieldClass} defaultValue="">
              {maxPrices.map((price) => (
                <option key={price.label} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Bedrooms</span>
            <select name="bedrooms" className={fieldClass} defaultValue="">
              {bedroomOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="h-11 border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 text-[11px] font-medium tracking-[0.2em] text-[var(--color-deep-green)] uppercase transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] md:col-span-2 lg:col-span-1 lg:self-end"
          >
            Search
          </button>
        </div>

        <div className="mt-3 border-t border-[var(--color-gold)]/18 pt-3">
          <button
            type="button"
            onClick={() => setShowMoreFilters((prev) => !prev)}
            className="text-[10px] tracking-[0.14em] text-[var(--color-olive)] uppercase transition hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
            aria-expanded={showMoreFilters}
            aria-controls="search-more-filters"
          >
            More filters
          </button>
          {showMoreFilters ? (
            <div
              id="search-more-filters"
              className="mt-3 border border-[var(--color-gold)]/18 bg-[var(--color-cream)]/55 p-3"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
                  Reference no
                </span>
                <input
                  name="reference"
                  type="text"
                  placeholder="Enter reference"
                  className="h-10 rounded-md border border-[var(--color-gold)]/28 bg-[var(--color-ivory)] px-3 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
                />
              </label>
            </div>
          ) : (
            <input type="hidden" name="reference" value="" />
          )}
        </div>
      </form>
    </section>
  );
}
