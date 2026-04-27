import { NextResponse } from "next/server";
import { findNearbyEssentials } from "@/app/lib/server/googleMapsEnrichment";

type NearbyPayload = {
  latitude?: number;
  longitude?: number;
  address?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NearbyPayload;
    const latitude = Number(body?.latitude);
    const longitude = Number(body?.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return NextResponse.json(
        { error: "Coordinates are missing. Please find coordinates first, then try again." },
        { status: 400 }
      );
    }

    const suggestions = await findNearbyEssentials(latitude, longitude);
    return NextResponse.json({
      suggestions,
      context: body?.address || "",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch nearby essentials right now.";
    const statusCode = message.includes("Missing GOOGLE_MAPS_SERVER_API_KEY") ? 500 : 400;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
