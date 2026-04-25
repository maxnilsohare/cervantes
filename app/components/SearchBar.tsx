"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  "Apartments",
  "Penthouses",
  "Houses",
  "Villas",
  "Townhouses",
  "Plots",
  "Commercial",
  "New Developments",
];

const minPrices = [
  "No min",
  "€100,000",
  "€150,000",
  "€200,000",
  "€300,000",
  "€500,000",
  "€750,000",
  "€1,000,000",
  "€1,500,000",
  "€2,000,000",
];

const maxPrices = [
  "No max",
  "€300,000",
  "€500,000",
  "€750,000",
  "€1,000,000",
  "€1,500,000",
  "€2,000,000",
  "€3,000,000",
  "€5,000,000",
  "€10,000,000+",
];

const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];

const popoverBaseClass =
  "absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-64 overflow-y-auto rounded-xl border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-1.5 shadow-[0_22px_40px_-26px_rgba(34,42,24,0.5)]";

type OpenField = "location" | "type" | "minPrice" | "maxPrice" | "bedrooms" | null;

type SearchBarProps = {
  inHero?: boolean;
  className?: string;
};

export function SearchBar({ inHero = false, className = "" }: SearchBarProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [openField, setOpenField] = useState<OpenField>(null);
  const [locationQuery, setLocationQuery] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("No min");
  const [maxPrice, setMaxPrice] = useState("No max");
  const [bedrooms, setBedrooms] = useState("Any");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [reference, setReference] = useState("");
  const [exclusiveOnly, setExclusiveOnly] = useState(false);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenField(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenField(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const filteredLocations = useMemo(() => {
    const query = locationQuery.trim().toLowerCase();
    if (!query) return locations;
    return locations.filter((item) => item.toLowerCase().includes(query));
  }, [locationQuery]);

  function toggleField(field: OpenField) {
    setOpenField((current) => (current === field ? null : field));
  }

  function normalizeSearchValue(value: string, emptyText: string) {
    return value === emptyText ? "" : value;
  }

  const wrapperClassName = inHero
    ? "relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
    : "relative z-20 mx-auto -mt-12 w-full max-w-7xl px-4 sm:-mt-16 sm:px-6 lg:px-10";

  const panelClassName = inHero
    ? "border border-[var(--color-gold)]/30 bg-[var(--color-ivory)]/97 p-4 shadow-[0_24px_46px_-30px_rgba(34,42,24,0.58)] backdrop-blur-[2px] sm:p-5 md:p-6"
    : "border border-[var(--color-gold)]/30 bg-[var(--color-ivory)]/98 p-4 sm:p-5 md:p-6";

  const fieldTriggerClass =
    "flex h-11 w-full items-center justify-between rounded-lg border border-[var(--color-gold)]/28 bg-[var(--color-ivory)] px-3.5 text-sm text-[var(--color-text)] transition duration-200 hover:border-[var(--color-gold)]/48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35";

  const fieldLabelClass = "mb-1.5 text-[10px] tracking-[0.12em] text-[var(--color-bronze)] uppercase";

  const optionClass =
    "block w-full rounded-md px-3 py-2 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35";

  return (
    <section ref={rootRef} className={`${wrapperClassName} ${className}`.trim()}>
      <form
        method="get"
        action="/properties"
        className={panelClassName}
        aria-label="Property search"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[var(--color-gold)]/22 pb-3">
          <p className="eyebrow text-[var(--color-bronze)]">Concierge Search</p>
          <span className="hidden text-[10px] tracking-[0.18em] text-[var(--color-bronze)] uppercase sm:inline">
            Curated selections
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <p className={fieldLabelClass}>Location</p>
            <button
              type="button"
              onClick={() => toggleField("location")}
              aria-haspopup="listbox"
              aria-expanded={openField === "location"}
              className={fieldTriggerClass}
            >
              <span className={location ? "text-[var(--color-text)]" : "text-[var(--color-olive)]/70"}>
                {location || "Select location"}
              </span>
              <span aria-hidden="true" className="text-xs text-[var(--color-olive)]/78">
                ▾
              </span>
            </button>
            {openField === "location" ? (
              <div className={popoverBaseClass}>
                <div className="px-1.5 pb-1.5">
                  <input
                    value={locationQuery}
                    onChange={(event) => setLocationQuery(event.target.value)}
                    placeholder="Search location"
                    className="h-9 w-full rounded-md border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] px-3 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
                  />
                </div>
                {filteredLocations.length ? (
                  <ul role="listbox">
                    {filteredLocations.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          className={optionClass}
                          onClick={() => {
                            setLocation(item);
                            setOpenField(null);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-3 py-2 text-sm text-[var(--color-olive)]/75">No matching locations</p>
                )}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <p className={fieldLabelClass}>Property type</p>
            <button
              type="button"
              onClick={() => toggleField("type")}
              aria-haspopup="listbox"
              aria-expanded={openField === "type"}
              className={fieldTriggerClass}
            >
              <span className={propertyType ? "text-[var(--color-text)]" : "text-[var(--color-olive)]/70"}>
                {propertyType || "Property type"}
              </span>
              <span aria-hidden="true" className="text-xs text-[var(--color-olive)]/78">
                ▾
              </span>
            </button>
            {openField === "type" ? (
              <div className={popoverBaseClass}>
                <ul role="listbox">
                  {propertyTypes.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={optionClass}
                        onClick={() => {
                          setPropertyType(item);
                          setOpenField(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <p className={fieldLabelClass}>Min price</p>
            <button
              type="button"
              onClick={() => toggleField("minPrice")}
              aria-haspopup="listbox"
              aria-expanded={openField === "minPrice"}
              className={fieldTriggerClass}
            >
              <span>{minPrice}</span>
              <span aria-hidden="true" className="text-xs text-[var(--color-olive)]/78">
                ▾
              </span>
            </button>
            {openField === "minPrice" ? (
              <div className={popoverBaseClass}>
                <ul role="listbox">
                  {minPrices.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={optionClass}
                        onClick={() => {
                          setMinPrice(item);
                          setOpenField(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <p className={fieldLabelClass}>Max price</p>
            <button
              type="button"
              onClick={() => toggleField("maxPrice")}
              aria-haspopup="listbox"
              aria-expanded={openField === "maxPrice"}
              className={fieldTriggerClass}
            >
              <span>{maxPrice}</span>
              <span aria-hidden="true" className="text-xs text-[var(--color-olive)]/78">
                ▾
              </span>
            </button>
            {openField === "maxPrice" ? (
              <div className={popoverBaseClass}>
                <ul role="listbox">
                  {maxPrices.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={optionClass}
                        onClick={() => {
                          setMaxPrice(item);
                          setOpenField(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <p className={fieldLabelClass}>Bedrooms</p>
            <button
              type="button"
              onClick={() => toggleField("bedrooms")}
              aria-haspopup="listbox"
              aria-expanded={openField === "bedrooms"}
              className={fieldTriggerClass}
            >
              <span>{bedrooms}</span>
              <span aria-hidden="true" className="text-xs text-[var(--color-olive)]/78">
                ▾
              </span>
            </button>
            {openField === "bedrooms" ? (
              <div className={popoverBaseClass}>
                <ul role="listbox">
                  {bedroomOptions.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={optionClass}
                        onClick={() => {
                          setBedrooms(item);
                          setOpenField(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

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
              className="mt-3 grid gap-3 border border-[var(--color-gold)]/18 bg-[var(--color-cream)]/55 p-3 sm:grid-cols-[1.4fr_auto]"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-[0.12em] text-[var(--color-bronze)] uppercase">
                  Reference no
                </span>
                <input
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  type="text"
                  name="reference"
                  placeholder="Enter reference"
                  className="h-10 rounded-md border border-[var(--color-gold)]/28 bg-[var(--color-ivory)] px-3 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
                />
              </label>
              <label className="inline-flex items-center gap-2 self-end pb-1 text-sm text-[var(--color-text)]">
                <input
                  checked={exclusiveOnly}
                  onChange={(event) => setExclusiveOnly(event.target.checked)}
                  type="checkbox"
                  name="exclusive"
                  className="h-4 w-4 border-[var(--color-gold)]/40 text-[var(--color-dark-gold)] focus-visible:ring-[var(--color-gold)]/35"
                />
                Exclusives only
              </label>
            </div>
          ) : null}
        </div>

        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="type" value={propertyType} />
        <input type="hidden" name="minPrice" value={normalizeSearchValue(minPrice, "No min")} />
        <input type="hidden" name="maxPrice" value={normalizeSearchValue(maxPrice, "No max")} />
        <input type="hidden" name="bedrooms" value={normalizeSearchValue(bedrooms, "Any")} />
      </form>
    </section>
  );
}
