import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer_id");

    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    const res = await fetchWcApi<any>(
      `custom/v1/orders?customer=${customerId}`,
      {
        method: "GET",
      },
    );

    return NextResponse.json({ orders: res.data }, { status: 200 });
  } catch (err: any) {
    console.error("[API Get User Orders] Server Error", err);
    return NextResponse.json(
      { message: err.message || "Server Error" },
      { status: 500 },
    );
  }
}
