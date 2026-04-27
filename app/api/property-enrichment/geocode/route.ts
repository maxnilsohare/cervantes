import { NextResponse } from "next/server";
import { geocodeAddress } from "@/app/lib/server/googleMapsEnrichment";

type GeocodePayload = {
  address?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GeocodePayload;
    const address = body?.address?.trim() || "";
    if (!address) {
      return NextResponse.json({ error: "Please provide a property address first." }, { status: 400 });
    }

    const result = await geocodeAddress(address);
    return NextResponse.json({
      latitude: result.latitude,
      longitude: result.longitude,
      formattedAddress: result.formattedAddress,
      placeId: result.placeId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to geocode this address right now.";
    const statusCode = message.includes("Missing GOOGLE_MAPS_SERVER_API_KEY") ? 500 : 400;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
