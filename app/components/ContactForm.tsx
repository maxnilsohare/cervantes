"use client";

import { useActionState } from "react";
import {
  submitContactEnquiry,
  type EnquiryFormState,
} from "@/app/actions/enquiries";

const initialState: EnquiryFormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactEnquiry, initialState);
  const messageId = "contact-form-message";
  const fieldClass =
    "mt-1 h-11 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35";

  return (
    <form action={formAction} className="mt-5 space-y-3" aria-describedby={messageId}>
      <input type="hidden" name="source" value="contact-page" />
      <label className="block">
        <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
          Name
        </span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
          Phone
        </span>
        <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
          Interest
        </span>
        <select
          name="interest"
          className="mt-1 h-11 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 text-sm text-[var(--color-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
        >
          <option>Buying in Spain</option>
          <option>Selling in Spain</option>
          <option>Property valuation</option>
          <option>General advisory</option>
        </select>
      </label>
      <label className="block">
        <span className="text-[10px] tracking-[0.12em] text-[var(--color-olive)] uppercase">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          className="mt-1 w-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/35"
        />
      </label>
      <p
        id={messageId}
        aria-live="polite"
        className={`min-h-5 text-sm ${
          state.status === "error"
            ? "text-red-700"
            : state.status === "success"
              ? "text-[var(--color-deep-olive)]"
              : "text-[var(--color-olive)]/80"
        }`}
      >
        {state.message}
      </p>
      <button
        type="submit"
        disabled={isPending}
        className="w-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-deep-olive)] uppercase transition hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send Brief"}
      </button>
    </form>
  );
}
