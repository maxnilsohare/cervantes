import { notFound } from "next/navigation";
import { StudioClient } from "./StudioClient";

export const dynamic = "force-dynamic";

function isStudioEnabled() {
  return process.env.ENABLE_STUDIO === "true" || process.env.NEXT_PUBLIC_ENABLE_STUDIO === "true";
}

async function getStudioProjectIssue(projectId: string) {
  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/users/me`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 404) {
      const body = await response.text();

      if (body.includes("Project with ID") && body.includes("not found")) {
        return `Sanity could not find the configured project ID. Update NEXT_PUBLIC_SANITY_PROJECT_ID and ENABLE_STUDIO env values, then reload /studio.\n\n${body}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function StudioSetupNotice({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 text-[#203028]">
      <div className="mx-auto max-w-2xl border border-[#c9aa63] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8d7440]">Sanity Studio</p>
        <h1 className="mt-4 font-serif text-3xl text-[#203028] sm:text-4xl">Studio needs one config fix</h1>
        <p className="mt-4 text-sm leading-7 text-[#425247] sm:text-base">
          The Studio route is enabled, but the Sanity project configured for this site does not currently resolve.
        </p>
        <div className="mt-6 space-y-3 text-sm leading-7 text-[#425247] sm:text-base">
          <p>
            Replace <code className="rounded bg-[#f6f1e7] px-1.5 py-0.5 text-xs text-[#203028]">NEXT_PUBLIC_SANITY_PROJECT_ID</code> with the real Sanity
            project ID for Cervantes, then reload this page.
          </p>
          <p>Once that value is correct, the rest of the Studio setup in this project should be ready to use.</p>
        </div>
        <pre className="mt-8 overflow-x-auto border border-[#e4d7bc] bg-[#f9f6ef] p-4 text-xs leading-6 text-[#425247]">{message}</pre>
      </div>
    </main>
  );
}

export default async function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

  if (!isStudioEnabled() || !projectId || !dataset || !apiVersion) {
    notFound();
  }

  const issue = await getStudioProjectIssue(projectId);

  if (issue) {
    return <StudioSetupNotice message={issue} />;
  }

  return <StudioClient />;
}
