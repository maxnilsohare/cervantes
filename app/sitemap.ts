import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/config/site";
import { getAllProperties } from "@/app/lib/propertyRepository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();
  const staticRoutes = [
    "",
    "/properties",
    "/about",
    "/buying-in-spain",
    "/selling-in-spain",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...properties.map((property) => ({
      url: `${siteConfig.url}/properties/${property.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
