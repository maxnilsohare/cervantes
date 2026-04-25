"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Properties", href: "/#properties" },
  { label: "Locations", href: "/#locations" },
];

const aboutLinks = [
  { label: "Company", href: "/about" },
  { label: "Buying in Spain", href: "/buying-in-spain" },
  { label: "Selling in Spain", href: "/selling-in-spain" },
  { label: "Testimonials", href: "/about#testimonials" },
];

const languageOptions = [
  { label: "English", code: "EN", flagSrc: "/images/flags/en.png" },
  { label: "Spanish", code: "ES", flagSrc: "/images/flags/es.png" },
  { label: "Swedish", code: "SV", flagSrc: "/images/flags/sv.png" },
];

const socialOptions = [
  { label: "Facebook", src: "/images/social/facebook.png" },
  { label: "Instagram", src: "/images/social/instagram.png" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutCloseTimeoutRef = useRef<number | null>(null);

  function clearAboutCloseTimeout() {
    if (aboutCloseTimeoutRef.current !== null) {
      window.clearTimeout(aboutCloseTimeoutRef.current);
      aboutCloseTimeoutRef.current = null;
    }
  }

  function openDesktopAbout() {
    clearAboutCloseTimeout();
    setDesktopAboutOpen(true);
  }

  function scheduleDesktopAboutClose() {
    clearAboutCloseTimeout();
    aboutCloseTimeoutRef.current = window.setTimeout(() => {
      setDesktopAboutOpen(false);
      aboutCloseTimeoutRef.current = null;
    }, 220);
  }

  useEffect(() => {
    return () => {
      clearAboutCloseTimeout();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-gold)]/20 bg-[var(--color-ivory)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3.5 sm:px-6 lg:px-10 lg:py-4">
        <Link href="/" className="flex items-center" aria-label="Cervantes homepage">
          <Image
            src="/cervantes-logo.png"
            alt="Cervantes Boutique Property Advisory logo"
            width={185}
            height={64}
            className="h-8 w-auto sm:h-9 md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 2xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium tracking-[0.08em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            >
              {link.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={openDesktopAbout}
            onMouseLeave={scheduleDesktopAboutClose}
            onFocusCapture={openDesktopAbout}
            onBlurCapture={(event) => {
              const next = event.relatedTarget as Node | null;
              if (!event.currentTarget.contains(next)) {
                scheduleDesktopAboutClose();
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={desktopAboutOpen}
              className="inline-flex items-center gap-1 text-[13px] font-medium tracking-[0.08em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            >
              About
              <span aria-hidden="true" className="text-[10px] leading-none">
                ▾
              </span>
            </button>
            {desktopAboutOpen ? (
              <div
                role="menu"
                className="absolute left-0 top-full mt-3 min-w-[220px] border-t border-[var(--color-gold)] border-x border-b border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-2 shadow-[0_16px_32px_-22px_rgba(34,42,24,0.5)]"
                onMouseEnter={openDesktopAbout}
                onMouseLeave={scheduleDesktopAboutClose}
              >
                {aboutLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    className="block px-3 py-2 text-[12px] tracking-[0.1em] text-[var(--color-text)] transition hover:bg-[var(--color-cream)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href="/#contact"
            className="text-[13px] font-medium tracking-[0.08em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 text-[10px] tracking-[0.08em] text-[var(--color-olive)] uppercase md:flex">
          <div className="hidden items-center gap-1 md:flex">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                type="button"
                aria-label={`Language ${lang.label}`}
                className="inline-flex h-5 min-w-7 items-center justify-center overflow-hidden border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] px-1 text-[9px] tracking-[0.12em] text-[var(--color-olive)] uppercase hover:border-[var(--color-dark-gold)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <Image
                  src={lang.flagSrc}
                  alt={`${lang.label} flag`}
                  width={12}
                  height={12}
                  className="mr-1 h-3 w-3 rounded-full object-cover"
                />
                {lang.code}
              </button>
            ))}
          </div>
          <a
            href="mailto:info@cervantes.com"
            className="hidden hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] md:inline"
          >
            info@cervantes.com
          </a>
          <a
            href="tel:+34934230320"
            className="hidden hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] md:inline"
          >
            + 34 934 230 320
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {socialOptions.map((social) => (
              <button
                key={social.label}
                type="button"
                aria-label={social.label}
                className="inline-flex h-4 w-4 items-center justify-center text-[var(--color-olive)] transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <Image
                  src={social.src}
                  alt={`${social.label} logo`}
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Search"
            className="hidden text-[12px] text-[var(--color-olive)] transition hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] md:inline"
          >
            ⌕
          </button>
        </div>

        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center border border-[var(--color-gold)]/55 text-[var(--color-text)] transition hover:bg-[var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] md:inline-flex"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="hidden 2xl:block">
          <Link
            href="/#contact"
            className="inline-flex border border-[var(--color-dark-gold)]/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.2em] text-[var(--color-dark-gold)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
          >
            Enquire Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center border border-[var(--color-gold)]/65 text-[var(--color-text)] hover:bg-[var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--color-gold)]/20 bg-[var(--color-ivory)] px-5 py-5 xl:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile primary">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[13px] font-medium tracking-[0.1em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--color-gold)]/18 pt-3">
              <button
                type="button"
                aria-expanded={mobileAboutOpen}
                aria-haspopup="menu"
                onClick={() => setMobileAboutOpen((prev) => !prev)}
                className="inline-flex w-full items-center justify-between text-[13px] font-medium tracking-[0.1em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
              >
                About
                <span aria-hidden="true" className="text-[10px] leading-none">
                  {mobileAboutOpen ? "▴" : "▾"}
                </span>
              </button>
              {mobileAboutOpen ? (
                <div role="menu" className="mt-2 flex flex-col gap-2 pl-3">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileAboutOpen(false);
                      }}
                      className="text-[12px] tracking-[0.1em] text-[var(--color-olive)] transition hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="text-[13px] font-medium tracking-[0.1em] text-[var(--color-text)] transition-colors hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            >
              Contact
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-fit border border-[var(--color-dark-gold)]/70 px-5 py-2 text-[11px] font-medium tracking-[0.2em] text-[var(--color-dark-gold)] uppercase hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
