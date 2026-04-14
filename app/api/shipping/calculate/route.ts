import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { destinationAddress } = await request.json();

    // In production, configure these in your .env / .env.local file.
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const origin =
      process.env.SHOP_ORIGIN_ADDRESS ||
      "62-76 Kilmore Rd, Heathcote VIC 3523, Australia"; // Fallback for testing

    if (!apiKey) {
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

    // Call Google Maps Distance Matrix API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destinationAddress)}&units=metric&key=${apiKey}`;

    console.log("URL ", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("DAta Map ", data);
    console.log("Data rows ", data.rows[0].elements[0]);
    console.log("Data elements ", data.rows[0].elements);
    console.log("Data elemenet 1 ", data.rows[0].elements[0]);

    if (data.status !== "OK" || data.rows[0].elements[0].status !== "OK") {
      return NextResponse.json(
        {
          error:
            "Could not calculate exact distance to that address. Please check your address.",
        },
        { status: 400 },
      );
    }

    // Distance returned in meters, convert to km
    const distanceMeters = data.rows[0].elements[0].distance.value;
    const distanceKm = distanceMeters / 1000;

    // Apply Client's Zone Logic
    // Zone 1 = 10km from shop = $25.00
    // Zone 2 = 10km to 25km = $55.00
    // Zone 3 = 25km to 120km = Contact store

    if (distanceKm <= 10) {
      return NextResponse.json({
        available: true,
        cost: 25.0,
        zone: 1,
        distanceKm,
      });
    } else if (distanceKm > 10 && distanceKm <= 25) {
      return NextResponse.json({
        available: true,
        cost: 55.0,
        zone: 2,
        distanceKm,
      });
    } else if (distanceKm > 25 && distanceKm <= 120) {
      return NextResponse.json({
        available: false,
        cost: null,
        zone: 3,
        distanceKm,
        message: "Please contact the store for a quote",
      });
    } else {
      return NextResponse.json({
        available: false,
        cost: null,
        zone: 4,
        distanceKm,
        message: "Outside delivery area",
      });
    }
  } catch (error: any) {
    console.error("Shipping API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to calculate shipping" },
      { status: 500 },
    );
  }
}
