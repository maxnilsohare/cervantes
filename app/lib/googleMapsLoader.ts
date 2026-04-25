import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

let hasInitialized = false;
let initializedKeyPrefix = "";
let mapsLibraryPromise: Promise<google.maps.MapsLibrary> | null = null;
let placesLibraryPromise: Promise<google.maps.PlacesLibrary> | null = null;

export async function loadGoogleMaps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }

  const keyPrefix = apiKey.slice(0, 8);
  if (!hasInitialized) {
    setOptions({
      key: apiKey,
      v: "weekly",
    });
    hasInitialized = true;
    initializedKeyPrefix = keyPrefix;
  } else if (process.env.NODE_ENV === "development" && initializedKeyPrefix !== keyPrefix) {
    console.info(
      "[PropertyMap] Loader already initialized; reusing existing loader options for this session."
    );
  }

  if (!mapsLibraryPromise) {
    mapsLibraryPromise = importLibrary("maps") as Promise<google.maps.MapsLibrary>;
  }

  return mapsLibraryPromise;
}

export async function loadGooglePlaces() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }

  const keyPrefix = apiKey.slice(0, 8);
  if (!hasInitialized) {
    setOptions({
      key: apiKey,
      v: "weekly",
    });
    hasInitialized = true;
    initializedKeyPrefix = keyPrefix;
  } else if (process.env.NODE_ENV === "development" && initializedKeyPrefix !== keyPrefix) {
    console.info(
      "[PropertyMap] Loader already initialized; reusing existing loader options for this session."
    );
  }

  if (!placesLibraryPromise) {
    placesLibraryPromise = importLibrary("places") as Promise<google.maps.PlacesLibrary>;
  }

  return placesLibraryPromise;
}
