import { getPropertyBySlug as getFallbackPropertyBySlug, properties as fallbackProperties, type Property } from "@/app/data/properties";
import { siteConfig } from "@/app/config/site";
import { isSanityConfigured, sanityClient } from "@/app/lib/sanity/client";
import { SANITY_PROPERTIES_QUERY, SANITY_PROPERTY_BY_SLUG_QUERY } from "@/app/lib/sanity.queries";

type SanityProperty = {
  title?: string;
  slug?: string;
  status?: "available" | "reserved" | "sold" | "private";
  reference?: string;
  price?: string;
  location?: string;
  propertyType?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  builtSize?: string;
  terraceSize?: string;
  plotSize?: string;
  orientation?: string;
  pool?: boolean;
  parking?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  galleryImageUrls?: string[];
  galleryImageAlts?: (string | null)[];
  floorPlanImageUrl?: string;
  floorPlanImageAlt?: string;
  videoUrl?: string;
  shortDescription?: string;
  description?: string;
  keyFeatures?: string[];
  lifestyleHighlights?: string[];
  nearbyEssentials?: {
    label?: string;
    category?: string;
    travelTimeMinutes?: number;
    distanceKm?: number;
    latitude?: number;
    longitude?: number;
    note?: string;
  }[];
  estimatedIBI?: string;
  communityFees?: number;
  buyingCostNotes?: string;
  advisorName?: string;
  advisorPhone?: string;
  advisorEmail?: string;
  advisorImageUrl?: string;
  advisorWhatsappNumber?: string;
  advisorLanguages?: string[];
  advisorShortBio?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  similarPropertySlugs?: string[];
  featured?: boolean;
  orderRank?: number;
};

function mapStatus(status?: SanityProperty["status"]) {
  if (status === "reserved") return "Reserved";
  if (status === "sold") return "Sold";
  if (status === "private") return "Private";
  return "For Sale";
}

function mapSanityPropertyToAppProperty(doc: SanityProperty): Property | null {
  if (!doc.slug || !doc.title || !doc.price || !doc.location) return null;

  const latNum = doc.latitude != null ? Number(doc.latitude) : NaN;
  const lngNum = doc.longitude != null ? Number(doc.longitude) : NaN;
  const hasRealCoords = Number.isFinite(latNum) && Number.isFinite(lngNum);

  const nearbyGuide =
    doc.nearbyEssentials
      ?.filter(
        (item) =>
          item?.label &&
          Number.isFinite(Number(item.latitude)) &&
          Number.isFinite(Number(item.longitude))
      )
      .map((item, index) => {
        const rawCategory = item.category || "";
        const category: Property["nearbyGuide"][number]["category"] =
          rawCategory === "airport"
            ? "airport"
            : rawCategory === "beach"
              ? "beach"
              : rawCategory === "international-school"
                ? "school"
                : rawCategory === "hospital-clinic"
                  ? "hospital"
                  : rawCategory === "golf"
                    ? "golf"
                    : rawCategory === "supermarket"
                      ? "supermarket"
                      : rawCategory === "marina"
                        ? "marina"
                        : rawCategory === "town-centre"
                          ? "town"
                          : rawCategory === "restaurants-lifestyle"
                            ? "restaurant"
                            : rawCategory === "train-station"
                              ? "train"
                              : "supermarket";

        const minutes = Number(item.travelTimeMinutes);
        const distanceKm = Number(item.distanceKm);
        const timeLabel =
          Number.isFinite(minutes) && minutes > 0
            ? `${Math.round(minutes)} min`
            : Number.isFinite(distanceKm) && distanceKm > 0
              ? `${distanceKm.toFixed(1)} km`
              : "On request";

        return {
          label: item.label || `Nearby Point ${index + 1}`,
          category,
          travelTime: timeLabel,
          travelMode: "car" as const,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          description: item.note,
        };
      }) || [];

  return {
    slug: doc.slug,
    title: doc.title,
    location: doc.location,
    area: doc.location,
    price: doc.price,
    bedrooms: Number(doc.bedrooms ?? 0),
    bathrooms: Number(doc.bathrooms ?? 0),
    builtSize: doc.builtSize || "N/A",
    terraceSize: doc.terraceSize || "N/A",
    plotSize: doc.plotSize || "N/A",
    propertyType: doc.propertyType || "Property",
    status: mapStatus(doc.status),
    heroImage: doc.heroImageUrl || "/images/property-1.jpg",
    galleryImages: doc.galleryImageUrls?.length ? doc.galleryImageUrls : [doc.heroImageUrl || "/images/property-1.jpg"],
    shortDescription: doc.shortDescription || "Property details available on request.",
    fullDescription: doc.description || doc.shortDescription || "Property details available on request.",
    features: doc.keyFeatures?.length ? doc.keyFeatures : ["Details available on request"],
    amenities: doc.lifestyleHighlights?.length ? doc.lifestyleHighlights : ["Lifestyle details available on request"],
    marketEstimate: doc.price,
    marketRangeLow: doc.price,
    marketRangeHigh: doc.price,
    pricePerSqm: "On request",
    areaTrend: "On request",
    rentalEstimateLow: "On request",
    rentalEstimateHigh: "On request",
    confidence: "Medium",
    omitFromAggregateMap: !hasRealCoords,
    latitude: hasRealCoords ? latNum : 36.5,
    longitude: hasRealCoords ? lngNum : -4.9,
    nearbyValues: [],
    communityFees: doc.communityFees,
    specialHighlights:
      doc.lifestyleHighlights?.length ? doc.lifestyleHighlights : ["Boutique listing", "Lifestyle-led location"],
    propertyDetails: {
      interior: [
        { label: "Bedrooms", value: String(doc.bedrooms ?? "N/A") },
        { label: "Bathrooms", value: String(doc.bathrooms ?? "N/A") },
        { label: "Built size", value: doc.builtSize || "N/A" },
        { label: "Orientation", value: doc.orientation || "On request" },
        { label: "Furnishing status", value: "On request" },
      ],
      exterior: [
        { label: "Terrace size", value: doc.terraceSize || "N/A" },
        { label: "Pool", value: typeof doc.pool === "boolean" ? (doc.pool ? "Yes" : "No") : "On request" },
        { label: "Garden", value: "On request" },
        { label: "Parking", value: doc.parking || "On request" },
      ],
      community: [
        { label: "Gated community", value: "On request" },
        { label: "Parking", value: "On request" },
        { label: "Storage", value: "On request" },
        { label: "Security", value: "On request" },
      ],
      costsAndFees: [
        { label: "Community fees", value: doc.communityFees ? `€${doc.communityFees} / month` : "On request" },
        { label: "IBI estimate", value: doc.estimatedIBI || "On request" },
        { label: "Cost notes", value: doc.buyingCostNotes || "On request" },
        { label: "Estimated purchase costs", value: "10-12% of purchase price" },
      ],
      legalAndOwnership: [
        { label: "Property type", value: doc.propertyType || "Property" },
        { label: "Reference", value: doc.reference || "N/A" },
        { label: "Energy certificate", value: "On request" },
        { label: "Tourist licence potential", value: "Subject to checks" },
      ],
      locationDetails: [
        { label: "Beach distance", value: "On request" },
        { label: "Airport distance", value: "On request" },
        { label: "Golf distance", value: "On request" },
        { label: "Restaurants", value: "On request" },
        { label: "Schools", value: "On request" },
      ],
    },
    nearbyLifestyle: doc.nearbyEssentials
      ?.filter((item) => item?.label)
      .map((item) => ({
          label: item.label || "Location",
          value: item.travelTimeMinutes ? `${item.travelTimeMinutes} min by car` : "On request",
        })) || [],
    nearbyGuide,
    reasonToView: doc.shortDescription || "Distinctive opportunity in a high-demand area.",
    // Future homepage CMS phase:
    // keep Sanity "featured" + "showOnHomepage" flags in schema to drive homepage sections later.
    reference: doc.reference || "N/A",
    agentName: doc.advisorName || siteConfig.contact.advisorName,
    agentPhone: doc.advisorPhone || siteConfig.contact.advisorPhone,
    agentEmail: doc.advisorEmail || siteConfig.contact.advisorEmail,
    agentPhoto: doc.advisorImageUrl || "/images/agent.jpg",
    agentWhatsappNumber: doc.advisorWhatsappNumber || siteConfig.contact.whatsappHrefNumber,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    ogImage: doc.ogImageUrl,
  };
}

export async function getAllProperties(): Promise<Property[]> {
  if (!isSanityConfigured || !sanityClient) return fallbackProperties;

  try {
    const docs = await sanityClient.fetch<SanityProperty[]>(SANITY_PROPERTIES_QUERY);
    const mapped = docs.map(mapSanityPropertyToAppProperty).filter((item): item is Property => Boolean(item));
    return mapped.length ? mapped : fallbackProperties;
  } catch {
    return fallbackProperties;
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  if (!isSanityConfigured || !sanityClient) return getFallbackPropertyBySlug(slug);

  try {
    const doc = await sanityClient.fetch<SanityProperty | null>(SANITY_PROPERTY_BY_SLUG_QUERY, { slug });
    const mapped = doc ? mapSanityPropertyToAppProperty(doc) : null;
    return mapped || getFallbackPropertyBySlug(slug);
  } catch {
    return getFallbackPropertyBySlug(slug);
  }
}
