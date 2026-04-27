const GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_PLACES_NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

type NearbyCategory =
  | "airport"
  | "beach"
  | "international-school"
  | "hospital-clinic"
  | "golf"
  | "supermarket"
  | "marina"
  | "town-centre"
  | "restaurants-lifestyle"
  | "train-station";

export type GeocodeResult = {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  placeId?: string;
};

export type NearbySuggestion = {
  label: string;
  category: NearbyCategory;
  latitude: number;
  longitude: number;
  distanceKm: number;
  estimatedDriveMinutes?: number;
  source: "Google Places";
  placeId?: string;
  note?: string;
};

type NearbyConfig = {
  category: NearbyCategory;
  keyword: string;
  type?: string;
  radiusMeters: number;
};

const NEARBY_CONFIGS: NearbyConfig[] = [
  { category: "airport", keyword: "airport", type: "airport", radiusMeters: 60000 },
  { category: "beach", keyword: "beach", type: "tourist_attraction", radiusMeters: 20000 },
  { category: "international-school", keyword: "international school", type: "school", radiusMeters: 25000 },
  { category: "hospital-clinic", keyword: "hospital clinic", type: "hospital", radiusMeters: 25000 },
  { category: "golf", keyword: "golf club", type: "golf_course", radiusMeters: 25000 },
  { category: "supermarket", keyword: "supermarket", type: "supermarket", radiusMeters: 12000 },
  { category: "marina", keyword: "marina", radiusMeters: 40000 },
  { category: "town-centre", keyword: "town centre", radiusMeters: 30000 },
  { category: "restaurants-lifestyle", keyword: "restaurants lifestyle", type: "restaurant", radiusMeters: 15000 },
  { category: "train-station", keyword: "train station", type: "train_station", radiusMeters: 35000 },
];

function getServerApiKey() {
  return process.env.GOOGLE_MAPS_SERVER_API_KEY?.trim() || "";
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function parseGoogleStatusError(status: string) {
  if (status === "ZERO_RESULTS") return "No matching results found.";
  if (status === "REQUEST_DENIED") return "Google Maps access was denied for this server key.";
  if (status === "OVER_QUERY_LIMIT") return "Google Maps quota has been reached.";
  if (status === "INVALID_REQUEST") return "Google Maps request was invalid.";
  return "Google Maps could not complete this request.";
}

export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const apiKey = getServerApiKey();
  if (!apiKey) {
    throw new Error("Missing GOOGLE_MAPS_SERVER_API_KEY.");
  }
  if (!address.trim()) {
    throw new Error("Address is required.");
  }

  const searchParams = new URLSearchParams({
    address: address.trim(),
    key: apiKey,
  });

  const response = await fetch(`${GOOGLE_GEOCODE_URL}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error("Google Geocoding request failed.");
  }

  const payload = (await response.json()) as {
    status?: string;
    results?: Array<{
      formatted_address?: string;
      place_id?: string;
      geometry?: { location?: { lat?: number; lng?: number } };
    }>;
    error_message?: string;
  };

  if (payload.status !== "OK") {
    throw new Error(payload.error_message || parseGoogleStatusError(payload.status || ""));
  }

  const firstResult = payload.results?.[0];
  const latitude = firstResult?.geometry?.location?.lat;
  const longitude = firstResult?.geometry?.location?.lng;
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("No geocoding coordinates were returned.");
  }

  return {
    latitude,
    longitude,
    formattedAddress: firstResult?.formatted_address || address.trim(),
    placeId: firstResult?.place_id,
  };
}

export async function findNearbyEssentials(latitude: number, longitude: number): Promise<NearbySuggestion[]> {
  const apiKey = getServerApiKey();
  if (!apiKey) {
    throw new Error("Missing GOOGLE_MAPS_SERVER_API_KEY.");
  }
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Latitude and longitude are required.");
  }

  const requests = NEARBY_CONFIGS.map(async (config) => {
    const params = new URLSearchParams({
      key: apiKey,
      location: `${latitude},${longitude}`,
      radius: String(config.radiusMeters),
      keyword: config.keyword,
    });
    if (config.type) params.set("type", config.type);

    const response = await fetch(`${GOOGLE_PLACES_NEARBY_URL}?${params.toString()}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      status?: string;
      results?: Array<{
        name?: string;
        place_id?: string;
        geometry?: { location?: { lat?: number; lng?: number } };
      }>;
    };
    if (payload.status !== "OK" && payload.status !== "ZERO_RESULTS") return null;

    const place = payload.results?.find(
      (item) =>
        typeof item?.name === "string" &&
        typeof item?.geometry?.location?.lat === "number" &&
        typeof item?.geometry?.location?.lng === "number"
    );
    if (!place) return null;

    const itemLatitude = Number(place.geometry?.location?.lat);
    const itemLongitude = Number(place.geometry?.location?.lng);
    const distanceKm = calculateDistanceKm(latitude, longitude, itemLatitude, itemLongitude);

    return {
      label: place.name as string,
      category: config.category,
      latitude: itemLatitude,
      longitude: itemLongitude,
      distanceKm: Number(distanceKm.toFixed(1)),
      source: "Google Places" as const,
      placeId: place.place_id,
    };
  });

  const items = await Promise.all(requests);
  const suggestions: NearbySuggestion[] = [];
  for (const item of items) {
    if (item) suggestions.push(item);
  }
  return suggestions;
}
