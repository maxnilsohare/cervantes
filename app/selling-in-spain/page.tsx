import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Home,
  KeyRound,
  Landmark,
  Receipt,
  ScrollText,
  Shield,
} from "lucide-react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Selling in Spain | Cervantes",
  description:
    "A concise seller guide for owners in the Costa del Sol: pricing, presentation, qualified buyers, and completion.",
  alternates: {
    canonical: "/selling-in-spain",
  },
  openGraph: {
    title: "Selling in Spain | Cervantes",
    description:
      "A concise seller guide for owners in the Costa del Sol: pricing, presentation, qualified buyers, and completion.",
    url: "/selling-in-spain",
    images: ["/images/sell.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selling in Spain | Cervantes",
    description:
      "A concise seller guide for owners in the Costa del Sol: pricing, presentation, qualified buyers, and completion.",
    images: ["/images/sell.jpg"],
  },
};

const trustPoints = ["Discreet marketing", "Qualified buyers", "Founder-led guidance"];

const introPillars = ["Pricing strategy", "Refined presentation", "Serious buyer management"];

const choosePoints = [
  "Boutique, not volume-led",
  "Refined presentation and positioning",
  "Discreet international reach",
  "Qualified buyer handling",
  "Clear communication through the process",
];

const timelineSteps = [
  {
    title: "Initial consultation",
    detail: "We define seller priorities, timing, and preferred sale strategy.",
  },
  {
    title: "Valuation and pricing strategy",
    detail: "Pricing is positioned for momentum while protecting value perception.",
  },
  {
    title: "Property preparation",
    detail: "Simple high-impact preparation improves first impression and enquiry quality.",
  },
  {
    title: "Photography and presentation",
    detail: "Visual storytelling is designed for premium buyers and strong digital reach.",
  },
  {
    title: "Private marketing or public launch",
    detail: "Campaign approach is chosen based on discretion and sales objectives.",
  },
  {
    title: "Viewings and buyer qualification",
    detail: "Viewings are managed efficiently, with serious buyers filtered early.",
  },
  {
    title: "Negotiation",
    detail: "Offers are structured and negotiated with clarity and commercial discipline.",
  },
  {
    title: "Reservation and completion",
    detail: "Final legal and transactional stages are coordinated to completion.",
  },
];

const checklistItems = [
  { label: "Title deed", icon: ScrollText },
  { label: "Latest IBI receipt", icon: Receipt },
  { label: "Community fee certificate", icon: FileText },
  { label: "Energy certificate", icon: Shield },
  { label: "Utility bills", icon: Landmark },
  { label: "Mortgage details if applicable", icon: Home },
  { label: "Tourist licence if applicable", icon: FileText },
  { label: "Keys and access arrangements", icon: KeyRound },
];

const sellingCosts = [
  "Agency fee",
  "Legal fees",
  "Plusvalía municipal",
  "Capital gains tax",
  "Mortgage cancellation costs if applicable",
];

const faqItems = [
  {
    q: "How is my property valued?",
    a: "We combine local comparables, current demand, property condition, and positioning strategy.",
  },
  {
    q: "Should I prepare the property before listing?",
    a: "Usually yes. Light preparation and presentation often improves both enquiry quality and offer strength.",
  },
  {
    q: "Can Cervantes market discreetly?",
    a: "Yes. We can run private, controlled marketing for owners who prefer lower public visibility.",
  },
  {
    q: "How are buyers qualified?",
    a: "We pre-screen buyers for seriousness, timing, and financial position before key viewing stages.",
  },
  {
    q: "What documents are usually needed?",
    a: "Title deed, tax receipts, community documents, EPC, and mortgage details where relevant.",
  },
  {
    q: "What costs should sellers expect?",
    a: "Most sellers should plan for agency, legal, municipal, and tax-related costs before completion.",
  },
];

export default function SellingInSpainPage() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="pb-20 pt-14 lg:pb-24 lg:pt-16">
        <article className="mx-auto max-w-6xl">
          <section className="px-4 sm:px-6 lg:px-10">
            <div className="relative overflow-hidden border border-[var(--color-gold)]/20 bg-[var(--color-ivory)]">
              <div className="relative h-[370px] sm:h-[450px] lg:h-[520px]">
                <Image
                  src="/images/sell.jpg"
                  alt="Elegant Costa del Sol property prepared for premium sale"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  preload
                />
                <div className="absolute inset-0 bg-[var(--color-deep-olive)]/50" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="text-[11px] tracking-[0.16em] text-[var(--color-gold)] uppercase">
                    Seller Guide
                  </p>
                  <h1 className="mt-2 max-w-[15ch] font-serif text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl">
                    Selling with Cervantes
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/90 sm:text-base">
                    Discreet marketing, considered presentation and founder-led guidance for Costa del Sol
                    property owners.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  >
                    Request a valuation
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-4 py-3 text-sm text-[var(--color-text)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">A considered sale process</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--color-olive)]/84">
              Cervantes helps owners position correctly, present beautifully, and manage serious buyer
              interest with clear communication throughout.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {introPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-4 py-3.5 text-sm text-[var(--color-text)]"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 bg-[var(--color-ivory)] px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Why owners choose Cervantes</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {choosePoints.map((point) => (
                <div
                  key={point}
                  className="border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/55 px-4 py-3.5 text-sm text-[var(--color-text)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Seller Timeline</h2>
            <ol className="mt-6 space-y-4 border-l border-[var(--color-gold)]/30 pl-5 sm:pl-6">
              {timelineSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[30px] top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-cream)] text-[11px] text-[var(--color-dark-gold)] sm:-left-[34px]">
                    {index + 1}
                  </span>
                  <div className="border border-[var(--color-gold)]/16 bg-[var(--color-ivory)] px-4 py-3.5">
                    <p className="text-sm font-medium text-[var(--color-text)]">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-olive)]/82">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 bg-[var(--color-ivory)] px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Seller Checklist</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {checklistItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border border-[var(--color-gold)]/18 bg-[var(--color-cream)]/55 px-4 py-3.5"
                >
                  <item.icon size={20} strokeWidth={1.8} className="text-[var(--color-olive)]/80" />
                  <span className="text-sm text-[var(--color-text)]">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Selling Costs</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {sellingCosts.map((cost) => (
                <div
                  key={cost}
                  className="border border-[var(--color-gold)]/16 bg-[var(--color-ivory)] px-4 py-3.5 text-sm text-[var(--color-text)]"
                >
                  {cost}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--color-olive)]/78">
              Tax treatment depends on your personal circumstances. Always confirm with your lawyer or
              tax advisor.
            </p>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <div className="grid gap-6 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] p-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:p-8">
              <div className="relative h-56 overflow-hidden border border-[var(--color-gold)]/22 bg-[var(--color-cream)] sm:h-full">
                <Image
                  src="/images/founder.jpg"
                  alt="Jennifer Fogelberg, founder and advisor at Cervantes"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.16em] text-[var(--color-dark-gold)] uppercase">
                  Founder-Led Guidance
                </p>
                <h2 className="mt-2 font-serif text-3xl text-[var(--color-text)]">
                  A personal, discreet approach
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-olive)]/84">
                  Every seller plan is led personally by Jennifer Fogelberg, ensuring calm communication,
                  thoughtful positioning, and strategic guidance from first conversation to completion.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  Arrange a private valuation
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">FAQ</h2>
            <div className="mt-6 space-y-3.5">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none text-base font-medium text-[var(--color-text)] marker:content-none">
                    <span className="inline-flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-dark-gold)]" />
                      {item.q}
                    </span>
                  </summary>
                  <p className="mt-3 pl-[18px] text-sm leading-relaxed text-[var(--color-olive)]/84">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <div className="border border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)] px-6 py-10 text-center sm:px-10 sm:py-12">
              <h2 className="font-serif text-3xl text-[var(--color-ivory)]">Thinking of selling?</h2>
              <Link
                href="/contact"
                className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Arrange a private valuation
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
