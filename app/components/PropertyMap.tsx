"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/app/lib/googleMapsLoader";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Cross,
  Flag,
  GraduationCap,
  Landmark,
  Plane,
  ShoppingCart,
  Train,
  Utensils,
  Waves,
} from "lucide-react";

type PropertyMapProps = {
  location: string;
  latitude: number;
  longitude: number;
  nearbyGuide: {
    label: string;
    category:
      | "airport"
      | "beach"
      | "school"
      | "healthcare"
      | "golf"
      | "dining"
      | "daily"
      | "marina"
      | "town"
      | "transport";
    travelTime: string;
    travelMode: "car" | "walk" | "cycle" | "transit";
    latitude: number;
    longitude: number;
    description?: string;
  }[];
};

type GuideCategory =
  | "airport"
  | "beach"
  | "school"
  | "healthcare"
  | "golf"
  | "dining"
  | "daily"
  | "marina"
  | "town"
  | "transport";

type GuideFilter = "all" | GuideCategory;

const GUIDE_FILTER_OPTIONS: { id: GuideFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "airport", label: "Airport" },
  { id: "beach", label: "Beach" },
  { id: "school", label: "Schools" },
  { id: "healthcare", label: "Healthcare" },
  { id: "golf", label: "Golf" },
  { id: "dining", label: "Dining" },
  { id: "daily", label: "Daily Essentials" },
];

const GUIDE_CATEGORY_META: Record<
  GuideCategory,
  { markerLabel: string; color: string; border: string }
> = {
  airport: { markerLabel: "A", color: "#F8F7F2", border: "#9C7A33" },
  beach: { markerLabel: "B", color: "#F8F7F2", border: "#BFA46A" },
  school: { markerLabel: "S", color: "#F8F7F2", border: "#3F4724" },
  healthcare: { markerLabel: "H", color: "#F8F7F2", border: "#7F8B66" },
  golf: { markerLabel: "G", color: "#F8F7F2", border: "#2F5B3A" },
  dining: { markerLabel: "D", color: "#F8F7F2", border: "#8A6A3A" },
  daily: { markerLabel: "E", color: "#F8F7F2", border: "#6C7A4E" },
  marina: { markerLabel: "M", color: "#F8F7F2", border: "#4D6E8B" },
  town: { markerLabel: "T", color: "#F8F7F2", border: "#5E5E5E" },
  transport: { markerLabel: "R", color: "#F8F7F2", border: "#7A6D5F" },
};

const GUIDE_CATEGORY_ICONS: Record<GuideCategory, LucideIcon> = {
  airport: Plane,
  beach: Waves,
  school: GraduationCap,
  healthcare: Cross,
  golf: Flag,
  dining: Utensils,
  daily: ShoppingCart,
  marina: Anchor,
  town: Landmark,
  transport: Train,
};

export function PropertyMap({
  location,
  latitude,
  longitude,
  nearbyGuide,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const propertyMarkerRef = useRef<google.maps.Marker | null>(null);
  const nearbyMarkerRefs = useRef<google.maps.Marker[]>([]);
  const guideRoutePolylineRef = useRef<google.maps.Polyline | null>(null);
  const streetViewRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [streetViewActive, setStreetViewActive] = useState(false);
  const [streetViewMessage, setStreetViewMessage] = useState("");
  const [guideFilter, setGuideFilter] = useState<GuideFilter>("all");
  const [selectedGuideKey, setSelectedGuideKey] = useState("");
  const [loadError, setLoadError] = useState("");
  const [loaderAttempted, setLoaderAttempted] = useState(false);
  const [loaderSuccess, setLoaderSuccess] = useState(false);
  const [loaderError, setLoaderError] = useState("");
  const hasHandledFailureRef = useRef(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasApiKey = Boolean(apiKey);
  const shouldShowFallback =
    !hasApiKey || (loaderAttempted && !loaderSuccess && Boolean(loadError || loaderError));
  const filteredGuide =
    guideFilter === "all" ? nearbyGuide : nearbyGuide.filter((item) => item.category === guideFilter);
  const selectedGuideItem = nearbyGuide.find(
    (item) => `${item.label}-${item.latitude}-${item.longitude}` === selectedGuideKey
  );

  const handleMapFailure = useCallback((error: unknown, source: string) => {
    if (hasHandledFailureRef.current) return;
    hasHandledFailureRef.current = true;
    setLoadError("Interactive area map unavailable");
    const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
    setLoaderError(`${source}: ${message}`);
  }, []);

  useEffect(() => {
    const original = console.error;
    console.error = (...args: unknown[]) => {
      const combined = args
        .map((arg) => (typeof arg === "string" ? arg : ""))
        .join(" ")
        .toLowerCase();
      const isGoogleAuthError =
        combined.includes("google maps javascript api error") ||
        combined.includes("apiprojectmaperror") ||
        combined.includes("noapikeys");

      if (isGoogleAuthError && loaderAttempted) {
        handleMapFailure(args[0], "Google Maps API authorization failed");
        return;
      }
      original(...args);
    };

    return () => {
      console.error = original;
    };
  }, [handleMapFailure, loaderAttempted]);

  useEffect(() => {
    const gWindow = window as Window & { gm_authFailure?: () => void };
    const previous = gWindow.gm_authFailure;
    gWindow.gm_authFailure = () => {
      handleMapFailure(new Error("gm_authFailure"), "Google Maps auth callback");
    };
    return () => {
      gWindow.gm_authFailure = previous;
    };
  }, [handleMapFailure]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      try {
        setLoaderAttempted(true);
        setLoaderError("");
        const { Map } = await loadGoogleMaps();
        if (cancelled || !mapContainerRef.current) return;

        const center = { lat: latitude, lng: longitude };
        const map = new Map(mapContainerRef.current, {
          center,
          zoom: 14,
          mapTypeId: "roadmap",
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          ],
        });

        mapRef.current = map;
        streetViewRef.current = map.getStreetView();
        setLoaderSuccess(true);

        propertyMarkerRef.current = new google.maps.Marker({
          position: center,
          map,
          title: `${location} (Selected Property)`,
          label: {
            text: "⌂",
            color: "#FFFFFF",
            fontWeight: "700",
            fontSize: "12px",
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 13,
            fillColor: "#222A18",
            fillOpacity: 1,
            strokeColor: "#BFA46A",
            strokeWeight: 2.5,
          },
          zIndex: 4,
        });

        nearbyMarkerRefs.current = [];

        setMapReady(true);
      } catch (error) {
        if (!cancelled) {
          handleMapFailure(error, "Google Maps library failed to load");
        }
      }
    }

    initMap();

    return () => {
      cancelled = true;
      propertyMarkerRef.current?.setMap(null);
      propertyMarkerRef.current = null;
      nearbyMarkerRefs.current.forEach((marker) => marker.setMap(null));
      nearbyMarkerRefs.current = [];
      guideRoutePolylineRef.current?.setMap(null);
      guideRoutePolylineRef.current = null;
      mapRef.current = null;
      streetViewRef.current = null;
    };
  }, [apiKey, handleMapFailure, latitude, location, longitude]);

  useEffect(() => {
    if (!mapRef.current) return;

    nearbyMarkerRefs.current.forEach((marker) => marker.setMap(null));
    nearbyMarkerRefs.current = filteredGuide.map((item) => {
      const meta = GUIDE_CATEGORY_META[item.category];
      const marker = new google.maps.Marker({
        position: { lat: item.latitude, lng: item.longitude },
        map: mapRef.current,
        title: `${item.label} · ${item.travelTime} by ${item.travelMode}`,
        label: {
          text: meta.markerLabel,
          color: "#222A18",
          fontWeight: "700",
          fontSize: "10px",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: meta.color,
          fillOpacity: 1,
          strokeColor: meta.border,
          strokeWeight: 2,
        },
        zIndex: 2,
      });
      marker.addListener("click", () => {
        setSelectedGuideKey(`${item.label}-${item.latitude}-${item.longitude}`);
      });
      return marker;
    });

    return () => {
      nearbyMarkerRefs.current.forEach((marker) => marker.setMap(null));
      nearbyMarkerRefs.current = [];
    };
  }, [filteredGuide]);

  useEffect(() => {
    if (!mapRef.current || !selectedGuideItem) {
      guideRoutePolylineRef.current?.setMap(null);
      guideRoutePolylineRef.current = null;
      return;
    }

    const map = mapRef.current;
    const origin = { lat: latitude, lng: longitude };
    const destination = {
      lat: selectedGuideItem.latitude,
      lng: selectedGuideItem.longitude,
    };
    const travelMode =
      selectedGuideItem.travelMode === "walk"
        ? google.maps.TravelMode.WALKING
        : selectedGuideItem.travelMode === "cycle"
          ? google.maps.TravelMode.BICYCLING
          : selectedGuideItem.travelMode === "transit"
            ? google.maps.TravelMode.TRANSIT
            : google.maps.TravelMode.DRIVING;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        guideRoutePolylineRef.current?.setMap(null);
        guideRoutePolylineRef.current = null;
        if (status !== "OK") return;

        const routePath = result?.routes?.[0]?.overview_path;
        if (!routePath || routePath.length === 0) return;

        guideRoutePolylineRef.current = new google.maps.Polyline({
          path: routePath,
          strokeColor: "#9C7A33",
          strokeOpacity: 0.84,
          strokeWeight: 3.4,
          geodesic: true,
          map,
        });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(origin);
        bounds.extend(destination);
        map.fitBounds(bounds, 64);
      }
    );
  }, [latitude, longitude, selectedGuideItem]);

  function setRoadMap() {
    if (!mapRef.current) return;
    setStreetViewMessage("");
    setStreetViewActive(false);
    streetViewRef.current?.setVisible(false);
    mapRef.current.setMapTypeId("roadmap");
    setMapType("roadmap");
  }

  function setSatelliteMap() {
    if (!mapRef.current) return;
    setStreetViewMessage("");
    setStreetViewActive(false);
    streetViewRef.current?.setVisible(false);
    mapRef.current.setMapTypeId("satellite");
    setMapType("satellite");
  }

  function activateStreetView() {
    try {
      if (!mapRef.current || !streetViewRef.current) return;
      setStreetViewMessage("");

      const service = new google.maps.StreetViewService();
      const point = { lat: latitude, lng: longitude };

      service.getPanorama({ location: point, radius: 120 }, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK && data?.location?.latLng) {
          streetViewRef.current?.setPosition(data.location.latLng);
          streetViewRef.current?.setPov({ heading: 30, pitch: 0 });
          streetViewRef.current?.setVisible(true);
          setStreetViewActive(true);
        } else {
          setStreetViewMessage("Street View is not available for this exact location.");
        }
      });
    } catch (error) {
      handleMapFailure(error, "Street View initialization failed");
    }
  }

  function backToMap() {
    streetViewRef.current?.setVisible(false);
    setStreetViewActive(false);
    setStreetViewMessage("");
  }

  return (
    <section id="location" className="mt-14 border-t border-[var(--color-gold)]/18 pt-10 lg:pt-12">
      <h2 className="font-serif text-3xl text-[var(--color-text)] sm:text-4xl">Expat Area Guide</h2>
      <p className="mt-2 max-w-2xl text-sm text-[var(--color-olive)]/82">
        Key lifestyle, travel and daily essentials near this property.
      </p>

      <div className="mt-7 rounded-[2px] border border-[var(--color-gold)]/18 bg-[var(--color-cream)]/45 p-3 sm:p-4">
        {!shouldShowFallback ? (
          <>
            <div className="mb-3 flex items-center justify-between gap-3 border border-[var(--color-gold)]/18 bg-[var(--color-ivory)] px-2.5 py-2 sm:px-3">
              <div className="overflow-x-auto">
                <div className="flex min-w-max items-center gap-1.5">
                  <button
                    type="button"
                    onClick={setRoadMap}
                    aria-label="Show road map"
                    className={`px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] ${
                      mapType === "roadmap" && !streetViewActive
                        ? "bg-[var(--color-gold)] text-[var(--color-deep-olive)]"
                        : "border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] text-[var(--color-olive)] hover:border-[var(--color-dark-gold)]/40 hover:text-[var(--color-dark-gold)]"
                    }`}
                  >
                    Road
                  </button>
                  <button
                    type="button"
                    onClick={setSatelliteMap}
                    aria-label="Show satellite map"
                    className={`px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] ${
                      mapType === "satellite" && !streetViewActive
                        ? "bg-[var(--color-gold)] text-[var(--color-deep-olive)]"
                        : "border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] text-[var(--color-olive)] hover:border-[var(--color-dark-gold)]/40 hover:text-[var(--color-dark-gold)]"
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>
              {!streetViewActive ? (
                <button
                  type="button"
                  onClick={activateStreetView}
                  aria-label="Open street view"
                  className="shrink-0 border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] px-3.5 py-2 text-[10px] font-medium tracking-[0.14em] text-[var(--color-olive)] uppercase transition hover:border-[var(--color-dark-gold)] hover:text-[var(--color-dark-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
                >
                  Street View
                </button>
              ) : (
                <button
                  type="button"
                  onClick={backToMap}
                  aria-label="Return to map view"
                  className="shrink-0 border border-[var(--color-gold)] bg-[var(--color-gold)] px-3.5 py-2 text-[10px] font-medium tracking-[0.14em] text-[var(--color-deep-olive)] uppercase transition hover:bg-[var(--color-dark-gold)] hover:text-[var(--color-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
                >
                  Back to Map
                </button>
              )}
            </div>

            <div className="relative h-[320px] overflow-hidden border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] sm:h-[390px] lg:h-[450px]">
              {!mapReady && hasApiKey && !loadError && (
                <div className="absolute inset-0 grid place-items-center text-[11px] font-medium tracking-[0.14em] text-[var(--color-olive)] uppercase">
                  Loading map...
                </div>
              )}
              <div ref={mapContainerRef} className="absolute inset-0" aria-label={`Map of ${location}`} />
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="flex min-w-max items-center gap-1.5">
                {GUIDE_FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setGuideFilter(option.id);
                      setSelectedGuideKey("");
                    }}
                    className={`h-9 px-3 text-[10px] tracking-[0.13em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
                      guideFilter === option.id
                        ? "border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-deep-olive)]"
                        : "border border-[var(--color-gold)]/26 bg-[var(--color-ivory)] text-[var(--color-olive)] hover:border-[var(--color-dark-gold)]/45 hover:text-[var(--color-dark-gold)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <section className="mt-4 border border-[var(--color-gold)]/16 bg-[var(--color-ivory)] p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.14em] text-[var(--color-dark-gold)] uppercase">
                Nearby Essentials
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {filteredGuide.map((item) => (
                  <article
                    key={`${item.label}-${item.category}`}
                    className={`border bg-[var(--color-cream)]/58 px-3.5 py-3 transition ${
                      selectedGuideKey === `${item.label}-${item.latitude}-${item.longitude}`
                        ? "border-[var(--color-gold)]/65 ring-1 ring-[var(--color-gold)]/30"
                        : "border-[var(--color-gold)]/16"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedGuideKey(`${item.label}-${item.latitude}-${item.longitude}`)}
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                    >
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = GUIDE_CATEGORY_ICONS[item.category];
                          return (
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-ivory)]"
                          aria-hidden="true"
                        >
                              <Icon
                                size={18}
                                strokeWidth={1.8}
                                className="text-[var(--color-olive)]/84"
                              />
                        </span>
                          );
                        })()}
                        <p className="text-sm font-medium text-[var(--color-text)]">{item.label}</p>
                      </div>
                      <p className="mt-1.5 text-xs text-[var(--color-olive)]/85">
                        {item.travelTime} by {item.travelMode}
                      </p>
                    </button>
                  </article>
                ))}
                {!filteredGuide.length ? (
                  <p className="text-sm text-[var(--color-olive)]/80">
                    No curated points are set for this category yet.
                  </p>
                ) : null}
              </div>
            </section>

          </>
        ) : (
          <div className="mt-6 border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] p-6 sm:p-7">
            <p className="font-serif text-2xl text-[var(--color-deep-olive)]">
              Interactive area map unavailable
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">
              Add a valid Google Maps API key with Maps JavaScript API enabled to view the area map,
              satellite mode and Street View.
            </p>
          </div>
        )}

        {streetViewMessage ? (
          <p className="mt-3 text-sm text-[var(--color-dark-gold)]">{streetViewMessage}</p>
        ) : null}
      </div>
    </section>
  );
}
