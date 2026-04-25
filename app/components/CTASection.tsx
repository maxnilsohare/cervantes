import Image from "next/image";
import { ButtonLink } from "@/app/components/ui/ButtonLink";

type CTASectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function CTASection({
  id,
  label,
  title,
  description,
  buttonLabel,
  buttonHref,
  imageSrc,
  imageAlt,
}: CTASectionProps) {
  return (
    <section
      id={id}
      className="relative isolate my-16 overflow-hidden px-5 py-20 sm:px-6 lg:my-18 lg:px-10 lg:py-24"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="absolute inset-0 object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-deep-green)]/78" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl text-center text-[var(--color-ivory)]">
        <p className="eyebrow text-[var(--color-light-gold)]">{label}</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-cream)]/90 md:text-lg">
          {description}
        </p>
        <ButtonLink
          href={buttonHref}
          className="mt-8 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)]"
        >
          {buttonLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
