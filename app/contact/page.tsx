import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/app/components/ContactForm";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { siteConfig } from "@/app/config/site";

export const metadata: Metadata = {
  title: "Contact | Cervantes",
  description:
    "Contact Cervantes Boutique Property Advisory for discreet guidance on buying or selling property on the Costa del Sol.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Cervantes",
    description:
      "Speak with Cervantes Boutique Property Advisory about buying, selling or valuing a property on the Costa del Sol.",
    url: "/contact",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Cervantes",
    description:
      "Speak with Cervantes Boutique Property Advisory about buying, selling or valuing a property on the Costa del Sol.",
    images: ["/images/hero.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:items-start">
          <section>
            <p className="eyebrow text-[var(--color-dark-gold)]">Contact</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
              Speak with Cervantes about your next property decision.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-olive)]/86">
              Share a short brief and the Cervantes team will come back with discreet, practical next
              steps for buying, selling or valuing a home on the Costa del Sol.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${siteConfig.contact.companyPhoneHref}`}
                className="border border-[var(--color-gold)]/22 bg-[var(--color-ivory)] px-5 py-4 text-sm text-[var(--color-text)] transition hover:border-[var(--color-dark-gold)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <span className="block text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
                  Phone
                </span>
                {siteConfig.contact.companyPhone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.companyEmail}`}
                className="border border-[var(--color-gold)]/22 bg-[var(--color-ivory)] px-5 py-4 text-sm text-[var(--color-text)] transition hover:border-[var(--color-dark-gold)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <span className="block text-[10px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
                  Email
                </span>
                {siteConfig.contact.companyEmail}
              </a>
            </div>

            <div className="mt-8 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-5 py-5">
              <p className="text-sm leading-relaxed text-[var(--color-olive)]/84">
                Looking for listings first? Browse the current collection before sending a brief.
              </p>
              <Link
                href="/properties"
                className="mt-4 inline-flex border border-[var(--color-dark-gold)]/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] text-[var(--color-dark-gold)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                View Properties
              </Link>
            </div>
          </section>

          <section className="border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-5 sm:p-6">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Send a short brief</h2>
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
