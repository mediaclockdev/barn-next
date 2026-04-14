import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, transaction_id } = body;

    if (!order_id || !transaction_id) {
      return NextResponse.json(
        { message: "Missing order or transaction ID" },
        { status: 400 },
      );
    }

    console.log("confirm body");

    // Update WooCommerce Order status
    const res = await fetchWcApi<any>(`custom/v1/orders/${order_id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "processing",
        set_paid: true,
        transaction_id: transaction_id,
      }),
    });

    console.log("confirm res ", res);

    return NextResponse.json({ success: true, order: res.data });
  } catch (err: any) {
    console.error("[API Confirm Order]", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
