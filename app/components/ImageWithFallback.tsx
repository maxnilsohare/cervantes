"use client";

import Image from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  preload?: boolean;
  className?: string;
  sizes?: string;
};

export function ImageWithFallback({
  src,
  alt,
  preload = false,
  className,
  sizes,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 grid place-items-center bg-[var(--color-cream)] text-center text-[11px] font-medium tracking-[0.16em] text-[var(--color-bronze)] uppercase"
        role="img"
        aria-label={`${alt}. Image coming soon`}
      >
        Image coming soon
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      preload={preload}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
