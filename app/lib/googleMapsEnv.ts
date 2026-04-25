/**
 * Browser-side Google Maps JavaScript API key (embedded at build time for NEXT_PUBLIC_*).
 * Use exactly this name in Vercel and .env — not GOOGLE_MAPS_API_KEY or NEXT_PUBLIC_GOOGLE_MAP_API_KEY.
 */
export const GOOGLE_MAPS_BROWSER_ENV_KEY = "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" as const;

export function getGoogleMapsBrowserApiKey(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (typeof raw !== "string") return "";
  return raw.trim();
}

export function hasGoogleMapsBrowserApiKey(): boolean {
  return getGoogleMapsBrowserApiKey().length > 0;
}
