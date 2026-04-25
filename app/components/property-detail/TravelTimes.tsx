"use client";

import type { RefObject } from "react";

export type TravelModeKey = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

type TravelTimesProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  destinationInput: string;
  onDestinationInputChange: (value: string) => void;
  travelMode: TravelModeKey;
  onTravelModeChange: (mode: TravelModeKey) => void;
  hasApiKey: boolean;
  placesReady: boolean;
  destinationName: string | null;
  travelDuration: string;
  travelError: string;
  onEditDestination: () => void;
  onRemoveDestination: () => void;
};

const TRAVEL_MODE_OPTIONS: { key: TravelModeKey; label: string }[] = [
  { key: "DRIVING", label: "By car" },
  { key: "WALKING", label: "Walking" },
  { key: "BICYCLING", label: "Cycling" },
  { key: "TRANSIT", label: "Transit" },
];

export function TravelTimes({
  inputRef,
  destinationInput,
  onDestinationInputChange,
  travelMode,
  onTravelModeChange,
  hasApiKey,
  placesReady,
  destinationName,
  travelDuration,
  travelError,
  onEditDestination,
  onRemoveDestination,
}: TravelTimesProps) {
  const modeLabel = TRAVEL_MODE_OPTIONS.find((option) => option.key === travelMode)?.label ?? "By car";

  return (
    <section
      aria-label="Travel times"
      className="mt-4 border border-[var(--color-gold)]/16 bg-[var(--color-ivory)] p-4 sm:p-5"
    >
      <p className="text-[11px] tracking-[0.16em] text-[var(--color-dark-gold)] uppercase">Travel Times</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--color-olive)]/78">Add your own destination.</p>

      <div className="mt-3.5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <input
          ref={inputRef}
          type="text"
          value={destinationInput}
          onChange={(event) => onDestinationInputChange(event.target.value)}
          placeholder="Add a destination"
          aria-label="Add a destination"
          className="h-11 border border-[var(--color-gold)]/30 bg-[var(--color-cream)] px-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-olive)]/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-1.5 pb-0.5">
            {TRAVEL_MODE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => onTravelModeChange(option.key)}
                className={`h-9 px-2.5 text-[10px] font-medium tracking-[0.12em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
                  travelMode === option.key
                    ? "border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-deep-olive)]"
                    : "border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] text-[var(--color-olive)] hover:border-[var(--color-dark-gold)]/45 hover:text-[var(--color-dark-gold)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!placesReady && hasApiKey ? (
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-olive)]/78">
          Places suggestions are currently unavailable. You can still enter a destination manually.
        </p>
      ) : null}

      {!destinationName ? (
        <p className="mt-4 border border-[var(--color-gold)]/18 bg-[var(--color-cream)]/55 px-3.5 py-3 text-sm text-[var(--color-olive)]/84">
          Add a destination to view estimated travel time from this property.
        </p>
      ) : (
        <div className="mt-4 border border-[var(--color-gold)]/22 bg-[var(--color-cream)]/72 p-4 sm:p-4.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/75 bg-[var(--color-ivory)] text-[11px] font-semibold text-[var(--color-deep-olive)]">
                  A
                </span>
                <p className="text-[11px] tracking-[0.12em] text-[var(--color-dark-gold)] uppercase">
                  Destination
                </p>
              </div>
              <h3 className="mt-2 truncate font-serif text-[1.35rem] leading-tight text-[var(--color-text)]">
                {destinationName}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-olive)]/88">
                {modeLabel} · {travelDuration || "Travel time unavailable for this destination."}
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={onEditDestination}
                className="h-8 px-2 text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase transition hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onRemoveDestination}
                className="h-8 px-2 text-[10px] tracking-[0.12em] text-[var(--color-dark-gold)] uppercase transition hover:text-[var(--color-deep-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {travelError ? <p className="mt-3 text-xs text-[var(--color-dark-gold)]">{travelError}</p> : null}
      <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--color-olive)]/70">
        Travel times are indicative and may vary by traffic and season.
      </p>
    </section>
  );
}
