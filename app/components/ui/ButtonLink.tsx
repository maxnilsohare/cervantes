import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

const baseClassName =
  "inline-flex justify-center border px-7 py-3 text-[11px] font-medium tracking-[0.2em] uppercase transition focus-visible:outline-none focus-visible:ring-2";

const variantClassNames = {
  primary:
    "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-deep-green)] hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:ring-[var(--color-gold)]",
  outline:
    "border-[var(--color-gold)]/80 text-[var(--color-ivory)] hover:-translate-y-0.5 hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:ring-[var(--color-gold)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const classNames = `${baseClassName} ${variantClassNames[variant]} ${className}`.trim();

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
