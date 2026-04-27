"use client";

import { useState } from "react";
import { PatchEvent, set, setIfMissing, unset, useFormValue } from "sanity";
import type { StringInputProps } from "sanity";

type NearbySuggestion = {
  label: string;
  category: string;
  latitude: number;
  longitude: number;
  distanceKm?: number | null;
  estimatedDriveMinutes?: number | null;
  note?: string;
};

type GeocodeResponse = {
  latitude?: number;
  longitude?: number;
  formattedAddress?: string;
  error?: string;
};

type NearbyResponse = {
  suggestions?: NearbySuggestion[];
  error?: string;
};

export function PropertyEnrichmentInput(props: StringInputProps) {
  const address = (useFormValue(["address"]) as string | undefined)?.trim() || "";
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleEnrichment() {
    if (!address) {
      setErrorMessage("Please add an address first.");
      setStatusMessage("");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setStatusMessage("Finding location details...");

    try {
      const geocodeResponse = await fetch("/api/property-enrichment/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const geocodeData = (await geocodeResponse.json()) as GeocodeResponse;

      if (!geocodeResponse.ok || geocodeData.error || geocodeData.latitude == null || geocodeData.longitude == null) {
        setErrorMessage(geocodeData.error || "We could not find this address. Please check it and try again.");
        setStatusMessage("");
        return;
      }

      props.onChange(
        PatchEvent.from([
          set(geocodeData.formattedAddress || address, ["address"]),
          set(geocodeData.latitude, ["latitude"]),
          set(geocodeData.longitude, ["longitude"]),
        ])
      );

      setStatusMessage("Coordinates added. Finding nearby essentials...");

      const nearbyResponse = await fetch("/api/property-enrichment/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: geocodeData.latitude,
          longitude: geocodeData.longitude,
          address: geocodeData.formattedAddress || address,
        }),
      });

      const nearbyData = (await nearbyResponse.json()) as NearbyResponse;
      if (!nearbyResponse.ok || nearbyData.error) {
        setErrorMessage(nearbyData.error || "Coordinates were added, but nearby essentials could not be suggested.");
        setStatusMessage("Coordinates added. You can still add nearby essentials manually.");
        return;
      }

      const suggestions = (nearbyData.suggestions || []).map((item) => ({
        _type: "object",
        label: item.label,
        category: item.category,
        travelTimeMinutes:
          typeof item.estimatedDriveMinutes === "number" ? Math.round(item.estimatedDriveMinutes) : undefined,
        distanceKm: typeof item.distanceKm === "number" ? Number(item.distanceKm.toFixed(1)) : undefined,
        latitude: item.latitude,
        longitude: item.longitude,
        note: item.note,
      }));

      props.onChange(
        PatchEvent.from([
          setIfMissing([], ["nearbyEssentials"]),
          suggestions.length ? set(suggestions, ["nearbyEssentials"]) : unset(["nearbyEssentials"]),
        ])
      );

      setStatusMessage(
        suggestions.length
          ? "Coordinates and nearby essentials are ready. Please review and adjust before publishing."
          : "Coordinates added. No nearby essentials found automatically, so you can add them manually."
      );
    } catch {
      setErrorMessage("Something went wrong while looking up this address.");
      setStatusMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {props.renderDefault(props)}
      <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={handleEnrichment}
          disabled={isLoading}
          style={{
            border: "1px solid #c3ad7a",
            background: "#f4ead3",
            padding: "0.55rem 0.85rem",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: isLoading ? "wait" : "pointer",
          }}
        >
          {isLoading ? "Finding location details..." : "Find coordinates and nearby essentials"}
        </button>
        {statusMessage ? <p style={{ margin: 0, color: "#1f4f39", fontSize: "0.85rem" }}>{statusMessage}</p> : null}
        {errorMessage ? <p style={{ margin: 0, color: "#b3261e", fontSize: "0.85rem" }}>{errorMessage}</p> : null}
      </div>
    </div>
  );
}
