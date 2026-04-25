"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default function StudioPage() {
  if (!projectId || !dataset) {
    return (
      <main className="min-h-screen bg-[var(--color-cream)] px-4 py-16 text-[var(--color-text)] sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
            CMS Setup Required
          </p>
          <h1 className="mt-2 font-serif text-3xl text-[var(--color-deep-olive)] sm:text-4xl">
            Sanity Studio is not configured yet
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text)]/86">
            Add your Sanity environment variables in <code>.env.local</code>, then restart the
            development server.
          </p>
          <pre className="mt-4 overflow-x-auto border border-[var(--color-gold)]/18 bg-[var(--color-cream)] p-4 text-xs text-[var(--color-olive)]">{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`}</pre>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
