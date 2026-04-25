"use client";

import { useEffect, useRef, useState } from "react";

type SectionItem = {
  id: string;
  label: string;
};

type SectionProgressNavProps = {
  contentRootId: string;
};

const SECTIONS: SectionItem[] = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "location", label: "Location" },
  { id: "costs", label: "Costs" },
  { id: "similar", label: "Similar" },
];

const STICKY_OFFSET_PX = 144;

export function SectionProgressNav({ contentRootId }: SectionProgressNavProps) {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const navScrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );
    sections.forEach((section) => {
      section.style.scrollMarginTop = `${STICKY_OFFSET_PX + 10}px`;
    });
    return () => {
      sections.forEach((section) => {
        section.style.scrollMarginTop = "";
      });
    };
  }, []);

  useEffect(() => {
    function calculate() {
      const root = document.getElementById(contentRootId);
      if (!root) return;

      const sections = SECTIONS.map((section) => document.getElementById(section.id)).filter(
        (section): section is HTMLElement => Boolean(section)
      );
      if (sections.length === 0) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const rootTop = root.getBoundingClientRect().top + scrollY;
      const rootBottom = root.getBoundingClientRect().bottom + scrollY;
      const rangeStart = Math.max(0, rootTop - STICKY_OFFSET_PX - 40);
      const rangeEnd = Math.max(rangeStart + 1, rootBottom - viewportHeight * 0.5);
      const rawProgress = ((scrollY - rangeStart) / (rangeEnd - rangeStart)) * 100;
      setProgress(Math.max(0, Math.min(100, rawProgress)));

      const current =
        sections
          .slice()
          .reverse()
          .find((section) => {
            const top = section.getBoundingClientRect().top + scrollY;
            return scrollY + STICKY_OFFSET_PX + 12 >= top;
          }) ?? sections[0];

      const nextActiveId = current.id;
      setActiveId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    }

    function onScrollOrResize() {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        calculate();
        rafRef.current = null;
      });
    }

    calculate();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [contentRootId]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeId];
    activeItem?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [activeId]);

  function onNavClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET_PX;
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  }

  return (
    <nav className="sticky top-[68px] z-30 mt-4 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)]/95 backdrop-blur-sm">
      <div
        ref={navScrollerRef}
        className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex min-w-max items-center gap-0.5 px-2 py-1.5 sm:px-3">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  ref={(node) => {
                    itemRefs.current[section.id] = node;
                  }}
                  href={`#${section.id}`}
                  onClick={(event) => onNavClick(event, section.id)}
                  className={`inline-flex whitespace-nowrap border-b-[1.5px] px-3 py-2 text-[10px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:text-[11px] ${
                    isActive
                      ? "border-[var(--color-gold)] text-[var(--color-deep-olive)]"
                      : "border-transparent text-[var(--color-olive)]/90 hover:text-[var(--color-dark-gold)]"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-px w-full bg-[var(--color-gold)]/14">
        <div
          className="h-px bg-[var(--color-gold)]/95 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </nav>
  );
}
