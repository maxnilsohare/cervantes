import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, Gem, Globe2, Languages, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Company | Cervantes",
  description:
    "Founder-led boutique property advisory on the Costa del Sol, combining local knowledge, international communication, and personal guidance.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Company | Cervantes",
    description:
      "Founder-led boutique property advisory on the Costa del Sol, combining local knowledge, international communication, and personal guidance.",
    url: "/about",
    images: ["/images/coast.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company | Cervantes",
    description:
      "Founder-led boutique property advisory on the Costa del Sol, combining local knowledge, international communication, and personal guidance.",
    images: ["/images/coast.jpg"],
  },
};

const languageBadges = [
  { label: "Swedish", flagSrc: "/images/flags/sv.png" },
  { label: "English", flagSrc: "/images/flags/en.png" },
  { label: "Spanish", flagSrc: "/images/flags/es.png" },
];

const philosophyPillars = [
  {
    title: "Local knowledge",
    description: "Guidance shaped by long-standing experience across the Costa del Sol.",
    icon: MapPin,
  },
  {
    title: "International perspective",
    description:
      "Clear communication for Scandinavian, British and wider international clients.",
    icon: Globe2,
  },
  {
    title: "Personal guidance",
    description: "Direct advice from Jennifer, without the layers of a large agency.",
    icon: Compass,
  },
];

const trustPoints = [
  {
    title: "Founder-led service",
    description: "Guidance remains personal, consistent and accountable from start to finish.",
    icon: Gem,
  },
  {
    title: "Swedish, English and Spanish communication",
    description: "Clear, confident communication for international clients at each stage.",
    icon: Languages,
  },
  {
    title: "Costa del Sol experience",
    description: "Market advice grounded in years of local insight and day-to-day activity.",
    icon: MapPin,
  },
  {
    title: "Certified GIPE agent",
    description: "Professional standards with recognised local industry certification.",
    icon: ShieldCheck,
  },
  {
    title: "Discreet, personal advice",
    description: "A calm, boutique approach for buyers and sellers who value privacy.",
    icon: Sparkles,
  },
];

export default function CompanyPage() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-text)]">
      <Header />
      <main id="main" className="pb-20 pt-14 lg:pb-24 lg:pt-16">
        <article className="mx-auto max-w-6xl">
          <section className="px-4 sm:px-6 lg:px-10">
            <div className="relative overflow-hidden border border-[var(--color-gold)]/22 bg-[var(--color-ivory)]">
              <div className="relative h-[390px] sm:h-[470px] lg:h-[550px]">
                <Image
                  src="/images/coast.jpg"
                  alt="Costa del Sol lifestyle and property setting"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  preload
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-olive)]/82 via-[var(--color-deep-olive)]/52 to-[var(--color-deep-olive)]/28" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
                  <p className="text-[11px] tracking-[0.16em] text-[var(--color-gold)] uppercase">
                    Company
                  </p>
                  <h1 className="mt-2 max-w-[16ch] font-serif text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl lg:text-6xl">
                    Scandinavian clarity. Costa del Sol expertise.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/92 sm:text-base">
                    Cervantes is a boutique property advisory for international buyers and sellers
                    seeking calm, personal guidance on the Costa del Sol.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="founder" className="mt-16 bg-[var(--color-ivory)] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:items-center">
              <div className="relative h-[460px] overflow-hidden border border-[var(--color-gold)]/20 bg-[var(--color-cream)] sm:h-[540px]">
                <Image
                  src="/images/founder.jpg"
                  alt="Jennifer Fogelberg-Clarke"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-[var(--color-text)]">
                  Led personally by Jennifer
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {languageBadges.map((language) => (
                    <span
                      key={language.label}
                      className="inline-flex items-center gap-1.5 border border-[var(--color-gold)]/30 bg-[var(--color-cream)] px-2.5 py-1 text-[10px] tracking-[0.11em] text-[var(--color-olive)] uppercase"
                    >
                      <Image
                        src={language.flagSrc}
                        alt={`${language.label} flag`}
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 rounded-full object-cover"
                      />
                      {language.label}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--color-olive)]/84 sm:text-[15px]">
                  Jennifer Fogelberg-Clarke is from Gothenburg, Sweden and has lived in Spain since
                  1993. She first worked in real estate on the Costa del Sol from 2001 to 2008.
                  After several years in Sweden, she returned to Spain in 2011 and has remained
                  closely connected to the local property market ever since.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-olive)]/84 sm:text-[15px]">
                  Her background gives Cervantes a rare advantage: Scandinavian understanding,
                  clear international communication and deep local knowledge of the Costa del Sol.
                  Jennifer speaks Swedish, English and Spanish, and is a certified GIPE agent, No.
                  3575.
                </p>
                <p className="mt-4 inline-flex items-center border border-[var(--color-gold)]/28 bg-[var(--color-cream)] px-3 py-1.5 text-[11px] tracking-[0.11em] text-[var(--color-dark-gold)] uppercase">
                  Certified GIPE agent · No. 3575
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text)]">
              A quieter, more considered way to buy and sell
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {philosophyPillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="border border-[var(--color-gold)]/16 bg-[var(--color-ivory)] px-5 py-5"
                >
                  <div className="flex items-center justify-between">
                    <pillar.icon size={18} strokeWidth={1.8} className="text-[var(--color-dark-gold)]" />
                    <span className="text-[11px] tracking-[0.12em] text-[var(--color-olive)]/72">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-medium text-[var(--color-text)]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-olive)]/82">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="testimonials"
            className="mt-16 bg-[var(--color-ivory)] px-4 py-12 sm:px-6 sm:py-14 lg:px-10"
          >
            <h2 className="font-serif text-3xl text-[var(--color-text)]">Why clients choose Cervantes</h2>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="border border-[var(--color-gold)]/16 bg-[var(--color-cream)]/60 px-4 py-4"
                >
                  <point.icon size={17} strokeWidth={1.8} className="text-[var(--color-dark-gold)]" />
                  <h3 className="mt-2 text-sm font-medium text-[var(--color-text)]">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-olive)]/82">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 px-4 sm:px-6 lg:px-10">
            <div className="border border-[var(--color-gold)]/20 bg-[var(--color-ivory)] px-6 py-8 sm:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-4 h-px w-14 bg-[var(--color-gold)]/70" />
                <blockquote className="font-serif text-2xl leading-relaxed text-[var(--color-text)] sm:text-[2rem]">
                  “Property decisions should feel clear, considered and personal — especially when
                  buying or selling abroad.”
                </blockquote>
                <p className="mt-4 text-[11px] tracking-[0.12em] text-[var(--color-dark-gold)] uppercase">
                  Jennifer Fogelberg-Clarke
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 px-4 sm:px-6 lg:px-10">
            <div className="border border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)] px-6 py-10 text-center sm:px-10 sm:py-12">
              <h2 className="font-serif text-3xl text-[var(--color-ivory)]">
                Looking for calm, personal property guidance?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/88 sm:text-base">
                Speak directly with Jennifer about your search, sale or next move on the Costa del Sol.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--color-deep-olive)] uppercase transition duration-300 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Book a consultation
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
