import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { deskStructure } from "@/sanity/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export default defineConfig({
  name: "default",
  title: "Cervantes CMS",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool({ structure: deskStructure })],
  schema: {
    types: schemaTypes,
  },
});
