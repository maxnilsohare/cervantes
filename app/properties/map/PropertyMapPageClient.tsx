"use client";

import dynamic from "next/dynamic";
import type { PropertyMapListing } from "@/app/lib/propertyMapListing";

const PropertyMapExplorer = dynamic(
  () =>
    import("@/app/components/PropertyMapExplorer").then((mod) => ({
      default: mod.PropertyMapExplorer,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[420px] items-center justify-center rounded-[2px] border border-[var(--color-gold)]/35 bg-[var(--color-deep-olive)]/85 text-[11px] font-medium tracking-[0.14em] text-[var(--color-cream)]/75 uppercase"
        aria-busy="true"
      >
        Loading map…
      </div>
    ),
  }
);

export function PropertyMapPageClient({ listings }: { listings: PropertyMapListing[] }) {
  return <PropertyMapExplorer listings={listings} />;
}
