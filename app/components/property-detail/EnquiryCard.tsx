"use client";

import Image from "next/image";
import type { Property } from "@/app/data/properties";
import { useActionState, useEffect, useMemo, useState } from "react";
import {
  submitPropertyEnquiry,
  type EnquiryFormState,
} from "@/app/actions/enquiries";
import { siteConfig } from "@/app/config/site";

type EnquiryCardProps = {
  property: Property;
};

const initialEnquiryState: EnquiryFormState = {
  status: "idle",
  message: "",
};

export function EnquiryCard({ property }: EnquiryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const [modalMode, setModalMode] = useState<"viewing" | "contact">("viewing");
  const [formState, formAction, isPending] = useActionState(
    submitPropertyEnquiry,
    initialEnquiryState
  );
  const advisorPhone = property.agentPhone || siteConfig.contact.advisorPhone;
  const advisorPhoneHref =
    advisorPhone === siteConfig.contact.advisorPhone
      ? siteConfig.contact.advisorPhoneHref
      : advisorPhone.replace(/[^\d+]/g, "");
  const advisorEmail = property.agentEmail || siteConfig.contact.advisorEmail;
  const advisorWhatsAppNumber = siteConfig.contact.whatsappHrefNumber;
  const advisorInitials = useMemo(() => {
    return property.agentName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [property.agentName]);
  const whatsappHref = useMemo(() => {
    const intro = `Hello Jennifer, I'm interested in ${property.title}`;
    const message = property.reference?.trim()
      ? `${intro}, Ref ${property.reference}. Could you send me more details?`
      : `${intro}. Could you send me more details?`;
    return `https://wa.me/${advisorWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  }, [advisorWhatsAppNumber, property.reference, property.title]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  function openModal(mode: "viewing" | "contact") {
    setModalMode(mode);
    setIsModalOpen(true);
  }

  return (
    <>
      <aside
        id="enquiry"
        className="border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-4 sm:p-5 lg:p-6"
      >
        <h2 className="font-serif text-[1.42rem] leading-tight text-[var(--color-text)] sm:text-[1.52rem]">
          Interested in this property?
        </h2>
        <p className="mt-1 text-[11px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
          Cervantes Advisor
        </p>

        <div className="mt-3.5 flex items-center gap-3.5 border-t border-[var(--color-gold)]/20 pt-3.5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--color-gold)]/45 bg-[var(--color-cream)] p-[2px]">
            {!imageErrored ? (
              <Image
                src="/images/agent.jpg"
                alt={`${property.agentName} profile`}
                fill
                sizes="64px"
                className="rounded-full object-cover"
                onError={() => setImageErrored(true)}
              />
            ) : null}
            <div
              aria-hidden="true"
              className={`absolute inset-0 grid place-items-center rounded-full bg-[var(--color-cream)] text-xs font-semibold tracking-[0.08em] text-[var(--color-olive)] ${
                imageErrored ? "opacity-100" : "opacity-0"
              }`}
            >
              {advisorInitials || "CA"}
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[var(--color-gold)]/25" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight text-[var(--color-text)]">
              {property.agentName}
            </p>
            <a
              href={`tel:${advisorPhoneHref}`}
              className="mt-1 block text-sm text-[var(--color-olive)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {advisorPhone}
            </a>
            <a
              href={`mailto:${advisorEmail}`}
              className="block truncate text-sm text-[var(--color-olive)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {advisorEmail}
            </a>
          </div>
        </div>

        <div className="mt-4.5 grid gap-2">
          <button
            type="button"
            onClick={() => openModal("viewing")}
            className="w-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-deep-olive)] uppercase transition duration-300 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Request a Viewing
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Message Jennifer on WhatsApp about this property"
            className="inline-flex w-full items-center justify-center gap-2 border border-[var(--color-gold)]/65 bg-[var(--color-ivory)] px-4 py-2.5 text-[10px] font-medium tracking-[0.18em] text-[var(--color-deep-olive)] uppercase transition duration-300 hover:-translate-y-[1px] hover:bg-[var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.47 0 .09 5.38.09 11.99c0 2.11.55 4.17 1.59 5.99L0 24l6.17-1.62a11.86 11.86 0 0 0 5.91 1.52h.01c6.61 0 11.99-5.38 11.99-11.99 0-3.2-1.25-6.21-3.56-8.43Zm-8.44 18.4h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.66.96.98-3.57-.23-.37a9.9 9.9 0 0 1-1.52-5.31C2.24 6.5 6.59 2.15 12.08 2.15a9.8 9.8 0 0 1 6.98 2.89 9.79 9.79 0 0 1 2.9 6.98c0 5.48-4.35 9.86-9.88 9.86Zm5.41-7.39c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.26-.25-.6-.5-.51-.68-.52l-.58-.01c-.2 0-.53.07-.8.38-.28.3-1.05 1.03-1.05 2.52s1.08 2.93 1.23 3.13c.15.2 2.12 3.25 5.14 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.79-.73 2.05-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
            </svg>
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openModal("contact")}
            className="w-full border border-[var(--color-dark-gold)]/65 bg-[var(--color-ivory)] px-4 py-2.5 text-[10px] font-medium tracking-[0.18em] text-[var(--color-dark-gold)] uppercase transition duration-300 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Contact Advisor
          </button>
        </div>

        <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--color-olive)]/85">
          Private viewings and discreet advice available.
        </p>
      </aside>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-deep-olive)]/58 px-4 py-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalMode === "viewing" ? "Request a viewing" : "Contact advisor"}
            className="w-full max-w-lg border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
                  Cervantes Advisory
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[var(--color-text)]">
                  {modalMode === "viewing" ? "Request a Viewing" : "Contact Advisor"}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close enquiry form"
                onClick={() => setIsModalOpen(false)}
                className="grid h-8 w-8 place-items-center border border-[var(--color-gold)]/35 text-[var(--color-olive)] transition hover:border-[var(--color-dark-gold)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                ×
              </button>
            </div>

            <form action={formAction} className="mt-4.5 space-y-3">
              <input type="hidden" name="source" value="property-detail" />
              <input type="hidden" name="mode" value={modalMode} />
              <input type="hidden" name="propertyTitle" value={property.title} />
              <input type="hidden" name="propertyReference" value={property.reference} />
              <input type="hidden" name="propertySlug" value={property.slug} />
              <input type="hidden" name="advisorEmail" value={advisorEmail} />
              <input
                name="name"
                type="text"
                placeholder="Name"
                aria-label="Name"
                autoComplete="name"
                required
                className="h-11 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                aria-label="Email"
                autoComplete="email"
                required
                className="h-11 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                aria-label="Phone"
                autoComplete="tel"
                className="h-11 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
              />
              <textarea
                name="message"
                placeholder={`I'm interested in ${property.title}.`}
                aria-label="Message"
                rows={4}
                className="w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
              />
              <p
                aria-live="polite"
                className={`min-h-5 text-sm ${
                  formState.status === "error"
                    ? "text-red-700"
                    : formState.status === "success"
                      ? "text-[var(--color-deep-olive)]"
                      : "text-[var(--color-olive)]/80"
                }`}
              >
                {formState.message}
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-deep-olive)] uppercase transition duration-300 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:cursor-wait disabled:opacity-70"
                >
                  {isPending ? "Sending..." : "Send Enquiry"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full border border-[var(--color-dark-gold)]/70 px-4 py-3 text-[11px] font-medium tracking-[0.18em] text-[var(--color-dark-gold)] uppercase transition duration-300 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
