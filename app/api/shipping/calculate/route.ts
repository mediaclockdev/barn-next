import { NextResponse } from "next/server";
import { calculateShippingCost } from "@/src/utils/shipping";
import { rateLimit } from "@/src/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000 });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { success } = limiter.check(15, `shipping-${ip}`);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const { destinationAddress } = await request.json();

    if (!process.env.GOOGLE_MAPS_API_KEY) {
      console.warn(
        "GOOGLE_MAPS_API_KEY is not defined. Please add it to your .env file.",
      );

      return NextResponse.json(
        {
          error:
            "Shipping calculation is currently unavailable. Please contact support or select Store Pickup.",
        },
        { status: 500 },
      );
    }

    const result = await calculateShippingCost(destinationAddress);

    if (!result.available) {
      return NextResponse.json({
        available: false,
        cost: null,
        zone: result.zone,
        distanceKm: result.distanceKm,
        message: result.message,
      });
    }

    return NextResponse.json({
      available: true,
      cost: result.cost,
      zone: result.zone,
      distanceKm: result.distanceKm,
    });
  } catch (error: any) {
    console.error("Shipping API Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to calculate shipping" },
      { status: 500 },
    );
  }
}
