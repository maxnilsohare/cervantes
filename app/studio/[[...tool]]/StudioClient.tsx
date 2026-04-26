"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";
import { StudioErrorBoundary } from "./StudioErrorBoundary";

const NextStudio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

export function StudioClient() {
  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}
