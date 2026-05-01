import { NextResponse } from "next/server";
import { calculateShippingCost } from "@/src/utils/shipping";
import { getAusPostRates } from "@/src/utils/auspost";
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
    const body = await request.json();
    const { method } = body;

    // ── Australia Post Rate Calculation ──
    if (method === "auspost") {
      const { destinationPostcode, cartItems } = body;

      if (!process.env.AUSPOST_API_KEY) {
        return NextResponse.json(
          {
            error:
              "Australia Post shipping is currently unavailable. Please select a different shipping method.",
          },
          { status: 500 },
        );
      }

      if (!destinationPostcode) {
        return NextResponse.json(
          { error: "Destination postcode is required." },
          { status: 400 },
        );
      }

      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return NextResponse.json(
          { error: "Cart items are required to calculate shipping." },
          { status: 400 },
        );
      }

      const result = await getAusPostRates(destinationPostcode, cartItems);

      if (!result.available) {
        return NextResponse.json({
          available: false,
          services: [],
          totalWeightKg: result.totalWeightKg,
          message: result.message,
        });
      }

      return NextResponse.json({
        available: true,
        services: result.services,
        totalWeightKg: result.totalWeightKg,
      });
    }

    // ── Local Delivery (Distance-Based) — existing logic ──
    const { destinationAddress } = body;

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
