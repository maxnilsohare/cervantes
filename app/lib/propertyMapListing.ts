import type { Property } from "@/app/data/properties";

export type PropertyMapListing = {
  slug: string;
  title: string;
  location: string;
  area: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  builtSize: string;
  propertyType: string;
  status: string;
  heroImage: string;
  latitude: number;
  longitude: number;
  flags: {
    villa: boolean;
    apartment: boolean;
    newBuild: boolean;
    beach: boolean;
  };
};

function textBlob(property: Property) {
  const locDetails = property.propertyDetails.locationDetails.map((d) => `${d.label} ${d.value}`).join(" ");
  return [
    property.title,
    property.shortDescription,
    ...property.features,
    ...property.specialHighlights,
    property.status,
    locDetails,
  ]
    .join(" ")
    .toLowerCase();
}

export function isNewBuildProperty(property: Property) {
  const s = `${property.status} ${property.specialHighlights.join(" ")} ${property.features.join(" ")}`.toLowerCase();
  return s.includes("new development") || s.includes("new build");
}

export function isBeachProximityProperty(property: Property) {
  const blob = textBlob(property);
  if (blob.includes("beachfront") || blob.includes("beach front")) return true;
  if (blob.includes("direct beach")) return true;
  if (blob.includes("close to sea")) return true;
  if (blob.includes("near beach")) return true;
  if (blob.includes("direct access") && blob.includes("beach")) return true;
  if (blob.includes("beach distance")) {
    return blob.includes("walk") || blob.includes("direct") || blob.includes("0 min");
  }
  return false;
}

export function shouldIncludeOnAggregateMap(property: Property) {
  if (property.omitFromAggregateMap) return false;
  if (!Number.isFinite(property.latitude) || !Number.isFinite(property.longitude)) return false;
  return true;
}

export function toPropertyMapListing(property: Property): PropertyMapListing | null {
  if (!shouldIncludeOnAggregateMap(property)) return null;
  const pt = property.propertyType.toLowerCase();
  return {
    slug: property.slug,
    title: property.title,
    location: property.location,
    area: property.area,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtSize: property.builtSize,
    propertyType: property.propertyType,
    status: property.status,
    heroImage: property.heroImage,
    latitude: property.latitude,
    longitude: property.longitude,
    flags: {
      villa: pt.includes("villa"),
      apartment: pt.includes("apartment") || pt.includes("penthouse"),
      newBuild: isNewBuildProperty(property),
      beach: isBeachProximityProperty(property),
    },
  };
}

export function formatMapPriceLabel(price: string): string {
  const digits = price.replace(/[^\d]/g, "");
  const n = Number(digits);
  if (!Number.isFinite(n) || n <= 0) return price.slice(0, 10);
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const rounded = Math.round(m * 100) / 100;
    const text = rounded % 1 === 0 ? String(Math.round(rounded)) : String(rounded);
    return `€${text}M`;
  }
  if (n >= 1_000) return `€${Math.round(n / 1_000)}k`;
  return `€${n}`;
}

export function filterMapListings(listings: PropertyMapListing[], filterId: string): PropertyMapListing[] {
  if (filterId === "all") return listings;
  if (filterId === "villas") return listings.filter((l) => l.flags.villa);
  if (filterId === "apartments") return listings.filter((l) => l.flags.apartment);
  if (filterId === "newBuild") return listings.filter((l) => l.flags.newBuild);
  if (filterId === "beach") return listings.filter((l) => l.flags.beach);
  if (filterId.startsWith("area:")) {
    const area = filterId.slice("area:".length);
    return listings.filter((l) => l.area === area);
  }
  return listings;
}
