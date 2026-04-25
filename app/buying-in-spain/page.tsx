import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Banknote,
  Briefcase,
  FileCheck2,
  Landmark,
  Shield,
  Wrench,
} from "lucide-react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Buying in Spain | Cervantes",
  description:
    "A calm, step-by-step buying guide for international clients purchasing property on the Costa del Sol.",
};

const timelineSteps = [
  {
    title: "Define your brief",
    detail: "Budget, location, lifestyle priorities and timeline are aligned first.",
  },
  {
    title: "Explore suitable properties",
    detail: "We shortlist options matching your objectives and risk profile.",
  },
  {
    title: "Arrange viewings",
    detail: "In-person or remote viewings are planned efficiently around your schedule.",
  },
  {
    title: "Make an offer",
    detail: "We support offer strategy based on market context and property quality.",
  },
  {
    title: "Reservation agreement",
    detail: "Key terms are secured and reservation deposit is structured correctly.",
  },
  {
    title: "Legal due diligence",
    detail: "Your independent lawyer verifies title, debts, licences and legal status.",
  },
  {
    title: "Private purchase contract",
    detail: "Contract terms and payment milestones are finalised before completion.",
  },
  {
    title: "Completion at notary",
    detail: "Ownership is transferred and final payment is completed at signing.",
  },
  {
    title: "Registration and handover",
    detail: "Post-completion registration and utilities setup are coordinated smoothly.",
  },
];

const checklistItems = [
  { label: "NIE number", icon: BadgeCheck },
  { label: "Spanish bank account", icon: Landmark },
  { label: "Independent lawyer", icon: Briefcase },
  { label: "Proof of funds or mortgage approval", icon: FileCheck2 },
  { label: "Currency planning", icon: Banknote },
  { label: "Insurance", icon: Shield },
  { label: "Utilities and community setup", icon: Wrench },
];

const faqItems = [
  {
    q: "Can foreigners buy property in Spain?",
    a: "Yes. Non-residents can buy Spanish property with standard legal and identification requirements.",
  },
  {
    q: "Do I need an NIE?",
    a: "Yes. An NIE is required for tax and legal steps in the purchase process.",
  },
  {
    q: "Should I use an independent lawyer?",
    a: "Yes. An independent lawyer helps verify legal status, contracts, and completion details.",
  },
  {
    q: "How long does the purchase process take?",
    a: "Most purchases take a few weeks to a few months depending on legal checks, financing, and seller timing.",
  },
  {
    q: "What extra costs should I budget for?",
    a: "Plan for taxes, legal fees, notary/registry fees, and financing-related costs if a mortgage is used.",
  },
  {
    q: "Can Cervantes help remotely before I travel?",
    a: "Yes. We can shortlist properties, arrange video viewings, and prepare your search before arrival.",
  },
];

export default function BuyingInSpainPage() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="pb-20 pt-14 lg:pb-24 lg:pt-16">
        <article className="mx-auto max-w-6xl">
          <section className="px-4 sm:px-6 lg:px-10">
            <div className="relative overflow-hidden border border-[var(--color-gold)]/22 bg-[var(--color-ivory)]">
              <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
                <Image
                  src="/images/coast.jpg"
                  alt="Costa del Sol coastal property lifestyle view"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-[var(--color-deep-olive)]/45" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="text-[11px] tracking-[0.16em] text-[var(--color-gold)] uppercase">
                    Buyer Guide
                  </p>
                  <h1 className="mt-2 max-w-[16ch] font-serif text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl">
                    Buying in Spain, made clear.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/90 sm:text-base">
                    A calm, step-by-step guide for international buyers on the Costa del Sol.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  >
                    Book a consultation
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">A calm purchase process</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--color-olive)]/84">
              Cervantes helps you understand each stage, compare locations with confidence, and move
              forward with clarity from first shortlist to final handover.
            </p>
          </section>

          <section className="mt-14 bg-[var(--color-ivory)] px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Buying Timeline</h2>
            <ol className="mt-6 space-y-4 border-l border-[var(--color-gold)]/30 pl-5 sm:pl-6">
              {timelineSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[30px] top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-gold)]/55 bg-[var(--color-cream)] text-[11px] text-[var(--color-dark-gold)] sm:-left-[34px]">
                    {index + 1}
                  </span>
                  <div className="border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/55 px-4 py-3.5">
                    <p className="text-sm font-medium text-[var(--color-text)]">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-olive)]/82">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Buyer Checklist</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {checklistItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-4 py-3.5"
                >
                  <item.icon size={20} strokeWidth={1.8} className="text-[var(--color-olive)]/80" />
                  <span className="text-sm text-[var(--color-text)]">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 bg-[var(--color-ivory)] px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Purchase Costs</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Resale property taxes",
                "New-build taxes",
                "Notary and registry fees",
                "Legal fees",
                "Mortgage-related costs if applicable",
              ].map((cost) => (
                <div
                  key={cost}
                  className="border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/55 px-4 py-3.5 text-sm text-[var(--color-text)]"
                >
                  {cost}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--color-olive)]/78">
              Figures are indicative only and should be confirmed with your lawyer or tax advisor.
            </p>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <div className="grid gap-6 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] p-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:p-8">
              <div className="relative h-56 overflow-hidden border border-[var(--color-gold)]/22 bg-[var(--color-cream)] sm:h-full">
                <Image
                  src="/images/founder.jpg"
                  alt="Jennifer Fogelberg, founder-led advisor at Cervantes"
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-[var(--color-text)]">Guided with clarity</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-olive)]/84">
                  Founder-led support helps international clients make confident decisions without
                  unnecessary complexity.
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  {[
                    "Local market knowledge",
                    "International buyer guidance",
                    "Trusted legal and professional network",
                  ].map((point) => (
                    <div
                      key={point}
                      className="border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/55 px-3.5 py-3 text-sm text-[var(--color-text)]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-14 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">FAQ</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-5 py-4"
                >
                  <summary className="cursor-pointer text-base font-medium text-[var(--color-text)]">
                    {item.q}
                  </summary>
                  <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[var(--color-olive)]/84">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mx-4 mt-14 border border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)] px-6 py-10 text-center sm:mx-6 sm:px-10 lg:mx-10">
            <h2 className="font-serif text-3xl text-[var(--color-ivory)]">Begin your search with clarity.</h2>
            <Link
              href="/#contact"
              className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Book a consultation
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
