import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/app/config/site";

export function Footer() {
  const hasSocialLinks = siteConfig.socialLinks.length > 0;

  return (
    <footer id="contact" className="mt-24 lg:mt-28">
      <section className="bg-[var(--color-deep-green)] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-[var(--color-light-gold)]">Property Intelligence</p>
            <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--color-ivory)] sm:text-3xl">
              Receive curated market updates
            </h3>
          </div>
          <a
            href={`mailto:${siteConfig.contact.companyEmail}?subject=Newsletter%20Subscription`}
            className="w-full border border-[var(--color-gold)]/75 px-6 py-2.5 text-center text-[11px] font-medium tracking-[0.2em] text-[var(--color-gold)] uppercase hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-green)] sm:w-auto"
          >
            Subscribe
          </a>
        </div>
      </section>

      <section className="bg-[var(--color-forest-green)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div
          className={`mx-auto grid w-full max-w-7xl gap-10 text-[var(--color-cream)] md:grid-cols-2 ${
            hasSocialLinks ? "lg:grid-cols-5" : "lg:grid-cols-4"
          } lg:gap-12`}
        >
          <div className="space-y-4">
            <Image
              src="/cervantes-logo.png"
              alt="Cervantes Boutique Property Advisory logo"
              width={210}
              height={72}
              className="h-12 w-auto object-contain brightness-125"
            />
            <p className="text-sm leading-relaxed text-[var(--color-cream)]/80">
              Boutique advisory for exceptional homes across Spain, guided by local knowledge and
              global perspective.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-4 text-[var(--color-light-gold)]">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--color-cream)]/85">
              <li>
                <a
                  href={`tel:${siteConfig.contact.companyPhoneHref}`}
                  className="transition hover:text-[var(--color-light-gold)]"
                >
                  {siteConfig.contact.companyPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.companyEmail}`}
                  className="transition hover:text-[var(--color-light-gold)]"
                >
                  {siteConfig.contact.companyEmail}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4 text-[var(--color-light-gold)]">Navigate</h4>
            <ul className="space-y-2 text-sm text-[var(--color-cream)]/85">
              <li>
                <Link
                  href="/properties"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties#locations"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  href="/selling-in-spain"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  Sell With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/buying-in-spain"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  Buying in Spain
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4 text-[var(--color-light-gold)]">Locations</h4>
            <ul className="space-y-2 text-sm text-[var(--color-cream)]/85">
              <li>Marbella Golden Mile</li>
              <li>Benahavís</li>
              <li>Estepona</li>
              <li>Sotogrande</li>
            </ul>
          </div>

          {hasSocialLinks ? (
            <div>
              <h4 className="eyebrow mb-4 text-[var(--color-light-gold)]">Social</h4>
              <ul className="space-y-2 text-sm text-[var(--color-cream)]/85">
                {siteConfig.socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="transition hover:text-[var(--color-light-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-green)]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <div className="h-2 bg-[var(--color-gold)]" />
    </footer>
  );
}
