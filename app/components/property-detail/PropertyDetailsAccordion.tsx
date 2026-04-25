"use client";

import { useState } from "react";
import type { Property } from "@/app/data/properties";

type PropertyDetailsAccordionProps = {
  property: Property;
};

type AccordionSection = {
  id: string;
  label: string;
  items: { label: string; value: string }[];
};

export function PropertyDetailsAccordion({ property }: PropertyDetailsAccordionProps) {
  const [openId, setOpenId] = useState<string>("interior");

  const sections: AccordionSection[] = [
    { id: "interior", label: "Interior", items: property.propertyDetails.interior },
    { id: "exterior", label: "Exterior", items: property.propertyDetails.exterior },
    { id: "community", label: "Community", items: property.propertyDetails.community },
    { id: "costs", label: "Costs & Fees", items: property.propertyDetails.costsAndFees },
    { id: "legal", label: "Legal & Ownership", items: property.propertyDetails.legalAndOwnership },
    { id: "location", label: "Location", items: property.propertyDetails.locationDetails },
  ];

  return (
    <section className="mt-8 border-t border-[var(--color-gold)]/18 pt-8 lg:mt-10 lg:pt-10">
      <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Property Details</h2>
      <div className="mt-6 space-y-2.5">
        {sections.map((section) => {
          const isOpen = openId === section.id;
          return (
            <div key={section.id} className="border border-[var(--color-gold)]/24 bg-[var(--color-ivory)]">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? "" : section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-[var(--color-cream)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <span className="text-[11px] tracking-[0.13em] text-[var(--color-olive)] uppercase">
                  {section.label}
                </span>
                <span className="text-lg leading-none text-[var(--color-dark-gold)]">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="grid gap-x-6 gap-y-2 border-t border-[var(--color-gold)]/18 px-4 py-3.5 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-[var(--color-olive)]/90">{item.label}</span>
                      <span className="text-right text-[var(--color-text)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
