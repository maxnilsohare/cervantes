import { notFound } from "next/navigation";
import { StudioClient } from "./StudioClient";

function isStudioEnabled() {
  return process.env.ENABLE_STUDIO === "true" || process.env.NEXT_PUBLIC_ENABLE_STUDIO === "true";
}

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

  if (!isStudioEnabled() || !projectId || !dataset || !apiVersion) {
    notFound();
  }

  return <StudioClient />;
}
