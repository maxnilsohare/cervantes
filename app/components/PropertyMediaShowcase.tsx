"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PropertyMediaShowcaseProps = {
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  builtSize: string;
  galleryImages: string[];
};

const KEN_BURNS_PROFILES = [
  { startScale: 1.01, endScale: 1.04, startX: 0, endX: -0.5, startY: 0, endY: 0.5 },
  { startScale: 1.012, endScale: 1.042, startX: 0.4, endX: -0.4, startY: -0.3, endY: 0.4 },
  { startScale: 1.01, endScale: 1.04, startX: -0.4, endX: 0.5, startY: 0.2, endY: -0.4 },
  { startScale: 1.012, endScale: 1.043, startX: 0.2, endX: -0.5, startY: 0.1, endY: -0.4 },
];

const AUTOPLAY_INTERVAL_MS = 3440;
const FADE_DURATION_MS = 720;

export function PropertyMediaShowcase({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  builtSize,
  galleryImages,
}: PropertyMediaShowcaseProps) {
  const images = galleryImages.slice(0, 8);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const maxThumbs = 6;
  const thumbnails = images.slice(0, maxThumbs);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }
    const tickMs = 50;
    const interval = window.setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + tickMs;
        if (next >= AUTOPLAY_INTERVAL_MS) {
          setActiveIndex((current) => (current + 1) % images.length);
          return 0;
        }
        return next;
      });
    }, tickMs);
    return () => window.clearInterval(interval);
  }, [images.length]);

  const currentKenBurns = useMemo(
    () => KEN_BURNS_PROFILES[activeIndex % KEN_BURNS_PROFILES.length],
    [activeIndex]
  );
  const visibleImageIndexes = (() => {
    if (images.length <= 3) {
      return images.map((_, index) => index);
    }

    const previousIndex = (activeIndex - 1 + images.length) % images.length;
    const nextIndex = (activeIndex + 1) % images.length;

    return Array.from(new Set([previousIndex, activeIndex, nextIndex])).sort((a, b) => a - b);
  })();
  const motionProgress = Math.min(1, elapsedMs / AUTOPLAY_INTERVAL_MS);

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % images.length);
    setElapsedMs(0);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setElapsedMs(0);
  }

  function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }

  return (
    <section id="property-photos" className="mt-10 lg:mt-12">
      <div className="relative isolate">
        <div className="relative h-[360px] overflow-hidden border border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)] sm:h-[470px] lg:h-[650px]">
          {visibleImageIndexes.map((index) => {
            const image = images[index];
            const active = index === activeIndex;
            return (
              <div
                key={`${image}-${index}`}
                className={`absolute inset-0 transition-opacity ease-in-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
                aria-hidden={!active}
              >
                <Image
                  src={image}
                  alt={`${title} photo ${index + 1}`}
                  fill
                  preload={index === 0}
                  loading={index === 0 ? undefined : active ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover transition-opacity ease-in-out"
                  style={{
                    transform:
                      !reducedMotion && active
                        ? `translate3d(${lerp(
                            currentKenBurns.startX,
                            currentKenBurns.endX,
                            motionProgress
                          )}%, ${lerp(
                            currentKenBurns.startY,
                            currentKenBurns.endY,
                            motionProgress
                          )}%, 0) scale(${lerp(
                            currentKenBurns.startScale,
                            currentKenBurns.endScale,
                            motionProgress
                          )})`
                        : "translate3d(0, 0, 0) scale(1.01)",
                    transitionDuration: "650ms",
                  }}
                />
              </div>
            );
          })}

          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 sm:right-6 sm:top-6 sm:gap-2">
            <a
              href="#enquiry"
              className="border border-[var(--color-ivory)]/40 bg-[var(--color-ivory)]/88 px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-[var(--color-deep-olive)] uppercase backdrop-blur-sm transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:px-3 sm:py-2 sm:text-[10px]"
            >
              Enquire
            </a>
          </div>

          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-3 sm:px-5">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={goPrev}
              className="grid h-10 w-10 place-items-center border border-[var(--color-gold)]/45 bg-[var(--color-ivory)]/85 text-[var(--color-deep-olive)] backdrop-blur-sm hover:bg-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={goNext}
              className="grid h-10 w-10 place-items-center border border-[var(--color-gold)]/45 bg-[var(--color-ivory)]/85 text-[var(--color-deep-olive)] backdrop-blur-sm hover:bg-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              ›
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)]/35 px-4 pb-3.5 pt-4.5 sm:px-6 sm:pb-4 sm:pt-5">
            <div className="grid w-full grid-cols-1 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,auto)] sm:items-start sm:gap-x-4 sm:gap-y-2.5">
              <div>
                <p className="min-w-0 max-w-[34rem] line-clamp-2 pr-2 font-serif font-bold text-[2.15rem] leading-[1.03] text-[var(--color-ivory)] sm:text-[clamp(2rem,3.2vw,2.6rem)]">
                  {title}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.12em] text-[var(--color-ivory)]/90 uppercase sm:text-xs">
                  {location}
                </p>
              </div>
              <p className="self-start whitespace-nowrap font-serif text-[2.2rem] leading-none font-bold text-[var(--color-ivory)] sm:text-right sm:text-[2.7rem]">
                {price}
              </p>
              <p className="text-left text-[11px] font-medium tracking-[0.14em] text-[var(--color-ivory)]/95 uppercase sm:text-xs">
                {bedrooms} Bedrooms · {bathrooms} Bathrooms · {builtSize} Built
              </p>
              <div className="flex items-center gap-2 sm:justify-end">
                {[
                  { label: "Photos", href: "#property-photos" },
                  { label: "Map", href: "#location" },
                  { label: "Enquire", href: "#enquiry" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-md border border-[var(--color-ivory)]/45 bg-[var(--color-ivory)]/92 px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.06em] text-[var(--color-deep-olive)] uppercase transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:px-3 sm:py-2 sm:text-[10px]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 overflow-x-auto border border-[var(--color-gold)]/20 bg-[var(--color-cream)] px-4 py-3 sm:px-6">
          <div className="flex w-max gap-2.5">
            {thumbnails.map((image, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={`${image}-thumb-${index}`}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setElapsedMs(0);
                  }}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden border transition ${
                    active
                      ? "border-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/45"
                      : "border-[var(--color-gold)]/20 opacity-85 hover:opacity-100"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]`}
                >
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
