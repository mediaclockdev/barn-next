import { NextResponse } from "next/server";
import { getCartParcelInfo } from "@/src/utils/auspost";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems } = body;

    if (!cartItems || !Array.isArray(cartItems)) {
      return NextResponse.json(
        { eligible: false, message: "Invalid cart items" },
        { status: 400 },
      );
    }

    const parcelResult = await getCartParcelInfo(cartItems);

    if (!parcelResult.valid) {
      return NextResponse.json(
        { eligible: false, message: parcelResult.message },
        { status: 200 },
      );
    }

    return NextResponse.json({ eligible: true }, { status: 200 });
  } catch (err: any) {
    console.error("[API AusPost Eligibility] Error:", err.message);
    return NextResponse.json(
      {
        eligible: false,
        message: "Failed to verify Australia Post eligibility.",
      },
      { status: 500 },
    );
  }
}
