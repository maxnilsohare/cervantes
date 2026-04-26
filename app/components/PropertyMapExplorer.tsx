"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  filterMapListings,
  formatMapPriceLabel,
  type PropertyMapListing,
} from "@/app/lib/propertyMapListing";
import { loadGoogleMaps } from "@/app/lib/googleMapsLoader";
import {
  getGoogleMapsBrowserApiKey,
  hasGoogleMapsBrowserApiKey,
} from "@/app/lib/googleMapsEnv";

type PropertyMapExplorerProps = {
  listings: PropertyMapListing[];
};

const FILTER_CHIPS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "villas", label: "Villas" },
  { id: "apartments", label: "Apartments / Penthouses" },
  { id: "newBuild", label: "New Build" },
  { id: "beach", label: "Beachfront / Near Beach" },
];

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInfoHtml(listing: PropertyMapListing) {
  const imgSrc = listing.heroImage.startsWith("http")
    ? listing.heroImage
    : listing.heroImage.startsWith("/")
      ? listing.heroImage
      : `/${listing.heroImage}`;
  const meta = [
    `${listing.bedrooms} bed`,
    `${listing.bathrooms} bath`,
    listing.builtSize && listing.builtSize !== "N/A" ? listing.builtSize : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const href = `/properties/${listing.slug}`;
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:280px;padding:2px;">
      <div style="width:100%;aspect-ratio:4/3;overflow:hidden;border:1px solid rgba(191,164,106,0.45);margin-bottom:10px;">
        <img src="${escapeHtml(imgSrc)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />
      </div>
      <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#222A18;line-height:1.25;">${escapeHtml(listing.title)}</p>
      <p style="margin:0 0 6px;font-size:12px;color:#3F4724;opacity:0.9;">${escapeHtml(listing.location)}</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#866729;">${escapeHtml(listing.price)}</p>
      ${meta ? `<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#3F4724;">${escapeHtml(meta)}</p>` : ""}
      <a href="${escapeHtml(href)}" style="display:inline-block;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#866729;border-bottom:1px solid #BFA46A;padding-bottom:2px;text-decoration:none;">View Property</a>
    </div>
  `;
}

const COSTA_CENTER = { lat: 36.51, lng: -4.92 };
const DEFAULT_ZOOM = 9;

export function PropertyMapExplorer({ listings }: PropertyMapExplorerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const markersForCleanupRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const openSlugRef = useRef<string | null>(null);

  const [filterId, setFilterId] = useState("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loaderAttempted, setLoaderAttempted] = useState(false);
  const [loaderSuccess, setLoaderSuccess] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const hasHandledFailureRef = useRef(false);

  const mapsApiKey = getGoogleMapsBrowserApiKey();
  const hasApiKey = hasGoogleMapsBrowserApiKey();
  const mapsKeyMissing = !hasApiKey;
  const mapsLoadFailed =
    hasApiKey && loaderAttempted && !loaderSuccess && Boolean(loadError);
  const shouldShowFallback = mapsKeyMissing || mapsLoadFailed;

  const areaOptions = useMemo(() => {
    const areas = Array.from(new Set(listings.map((l) => l.area))).sort((a, b) =>
      a.localeCompare(b)
    );
    return areas;
  }, [listings]);

  const filteredListings = useMemo(() => {
    let next = filterMapListings(listings, filterId);
    if (locationFilter !== "all") {
      next = next.filter((l) => l.area === locationFilter);
    }
    return next;
  }, [listings, filterId, locationFilter]);

  const handleMapFailure = useCallback((error: unknown, source: string) => {
    if (!hasGoogleMapsBrowserApiKey()) return;
    const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
    if (message.includes("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")) return;
    if (hasHandledFailureRef.current) return;
    hasHandledFailureRef.current = true;
    setLoadError(`${source}: ${message}`);
  }, []);

  useEffect(() => {
    if (!hasGoogleMapsBrowserApiKey()) return;
    const gWindow = window as Window & { gm_authFailure?: () => void };
    const previous = gWindow.gm_authFailure;
    gWindow.gm_authFailure = () => {
      handleMapFailure(new Error("gm_authFailure"), "Google Maps auth callback");
    };
    return () => {
      gWindow.gm_authFailure = previous;
    };
  }, [handleMapFailure]);

  useLayoutEffect(() => {
    if (mapsKeyMissing) return;
    if (!mapsApiKey) return;
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      try {
        setLoaderAttempted(true);
        setLoadError("");
        const { Map } = await loadGoogleMaps();
        if (cancelled || !mapContainerRef.current) return;

        const map = new Map(mapContainerRef.current, {
          center: COSTA_CENTER,
          zoom: DEFAULT_ZOOM,
          mapTypeId: "roadmap",
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          ],
        });

        mapRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow();
        setLoaderSuccess(true);
        setMapReady(true);

        infoWindowRef.current.addListener("closeclick", () => {
          openSlugRef.current = null;
          setSelectedSlug(null);
        });
      } catch (error) {
        if (!cancelled) {
          const msg = error instanceof Error ? error.message : String(error ?? "");
          if (msg.includes("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")) return;
          handleMapFailure(error, "Google Maps library failed to load");
        }
      }
    }

    initMap();

    return () => {
      cancelled = true;
      infoWindowRef.current?.close();
      infoWindowRef.current = null;
      mapRef.current = null;
      setMapReady(false);
    };
  }, [mapsApiKey, handleMapFailure, mapsKeyMissing, shouldShowFallback]);

  const openInfoFor = useCallback(
    (listing: PropertyMapListing, pan = true) => {
      const map = mapRef.current;
      const info = infoWindowRef.current;
      if (!map || !info) return;

      openSlugRef.current = listing.slug;
      setSelectedSlug(listing.slug);
      info.setContent(buildInfoHtml(listing));
      const anchor = markersRef.current.get(listing.slug);
      if (anchor) info.open(map, anchor);
      else info.open(map);
      if (pan) {
        map.panTo({ lat: listing.latitude, lng: listing.longitude });
        const z = map.getZoom();
        if (!z || z < 13) map.setZoom(13);
      }
    },
    []
  );

  useEffect(() => {
    if (mapsKeyMissing || !mapReady || !mapRef.current) {
      markersForCleanupRef.current.forEach((m) => m.setMap(null));
      markersForCleanupRef.current = [];
      markersRef.current.clear();
      return;
    }

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current.clear();

    const map = mapRef.current;
    const priceLabels = filteredListings.map((l) => ({
      listing: l,
      label: formatMapPriceLabel(l.price),
    }));
    const maxLen = Math.max(4, ...priceLabels.map((p) => p.label.length));
    const markerBucket: google.maps.Marker[] = [];

    filteredListings.forEach((listing) => {
      const priceLabel = formatMapPriceLabel(listing.price);
      const marker = new google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map,
        title: listing.title,
        label: {
          text: priceLabel,
          color: "#F8F7F2",
          fontWeight: "600",
          fontSize: maxLen > 7 ? "9px" : "10px",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: Math.min(15, 11 + maxLen * 0.45),
          fillColor: "#222A18",
          fillOpacity: 1,
          strokeColor: "#BFA46A",
          strokeWeight: 2,
        },
        zIndex: 2,
      });
      marker.addListener("click", () => {
        openInfoFor(listing, false);
      });
      markersRef.current.set(listing.slug, marker);
      markerBucket.push(marker);
    });

    markersForCleanupRef.current = markerBucket;

    if (filteredListings.length === 0) {
      map.setCenter(COSTA_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      infoWindowRef.current?.close();
    } else if (filteredListings.length === 1) {
      const only = filteredListings[0];
      map.setCenter({ lat: only.latitude, lng: only.longitude });
      map.setZoom(13);
    } else {
      const bounds = new google.maps.LatLngBounds();
      filteredListings.forEach((l) => bounds.extend({ lat: l.latitude, lng: l.longitude }));
      map.fitBounds(bounds, 48);
    }

    if (filteredListings.length && openSlugRef.current) {
      const still = filteredListings.find((l) => l.slug === openSlugRef.current);
      if (still) openInfoFor(still, false);
      else {
        infoWindowRef.current?.close();
        openSlugRef.current = null;
        setSelectedSlug(null);
      }
    }

    return () => {
      for (const marker of markersForCleanupRef.current) {
        marker.setMap(null);
      }
      markersForCleanupRef.current = [];
      markersRef.current = new Map();
    };
  }, [filteredListings, mapReady, mapsKeyMissing, openInfoFor]);

  return (
    <div>
      {shouldShowFallback ? (
        <div className="rounded-[2px] border border-[var(--color-gold)]/35 bg-[var(--color-deep-olive)]/85 px-8 py-12 text-center shadow-[0_24px_48px_-28px_rgba(0,0,0,0.55)] sm:px-12 sm:py-14">
          <p className="font-serif text-2xl text-[var(--color-cream)] sm:text-[1.65rem]">
            Property map unavailable
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-cream)]/78">
            Add a valid Google Maps API key to view all properties on the map.
          </p>
          <div
            className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-[var(--color-gold)]/55 to-transparent"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(260px,360px)_1fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:items-stretch lg:gap-8">
          <div className="order-1 space-y-4 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-wrap gap-2">
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilterId(chip.id)}
                  className={`px-3 py-2 text-[10px] font-medium tracking-[0.12em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
                    filterId === chip.id
                      ? "border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-deep-olive)]"
                      : "border border-[var(--color-gold)]/35 bg-[var(--color-deep-olive)] text-[var(--color-cream)]/88 hover:border-[var(--color-gold)]/55"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            {areaOptions.length ? (
              <label className="block text-[10px] font-medium tracking-[0.16em] text-[var(--color-cream)]/65 uppercase">
                Location
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="mt-2 w-full border border-[var(--color-gold)]/35 bg-[var(--color-deep-olive)] px-3 py-2.5 text-[13px] text-[var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  <option value="all">All areas</option>
                  {areaOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <div
            className="order-2 h-[420px] overflow-hidden rounded-[2px] border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[600px]"
          >
            {!mapReady && hasApiKey && !loadError ? (
              <div className="flex h-full items-center justify-center bg-[var(--color-deep-olive)] text-[11px] font-medium tracking-[0.14em] text-[var(--color-cream)]/75 uppercase">
                Loading map…
              </div>
            ) : null}
            <div ref={mapContainerRef} className="h-full w-full" aria-label="Property locations map" />
          </div>

          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:max-h-[600px] lg:overflow-y-auto lg:pr-1">
            <ul className="flex flex-col gap-3">
              {filteredListings.map((listing) => (
                <li key={listing.slug}>
                  <button
                    type="button"
                    onClick={() => openInfoFor(listing)}
                    className={`w-full border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:px-4 sm:py-3.5 ${
                      selectedSlug === listing.slug
                        ? "border-[var(--color-gold)]/70 bg-[var(--color-gold)]/15 ring-1 ring-[var(--color-gold)]/35"
                        : "border-[var(--color-gold)]/25 bg-[var(--color-deep-olive)] hover:border-[var(--color-gold)]/45"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-[var(--color-gold)]/25">
                        <Image
                          src={listing.heroImage}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium leading-snug text-[var(--color-cream)]">
                          {listing.title}
                        </p>
                        <p className="mt-1 text-[11px] text-[var(--color-cream)]/65">{listing.location}</p>
                        <p className="mt-1.5 text-[12px] font-semibold text-[var(--color-gold)]">
                          {listing.price}
                        </p>
                        <p className="mt-1 text-[10px] tracking-[0.08em] text-[var(--color-cream)]/55 uppercase">
                          {listing.bedrooms} bed · {listing.bathrooms} bath
                          {listing.builtSize && listing.builtSize !== "N/A" ? ` · ${listing.builtSize}` : ""}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {!filteredListings.length ? (
              <p className="py-6 text-sm text-[var(--color-cream)]/70">
                No properties match these filters on the map.
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
