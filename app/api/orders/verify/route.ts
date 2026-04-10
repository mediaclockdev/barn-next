import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, payment_intent_id } = body;

    if (!order_id || !payment_intent_id) {
      return NextResponse.json({ message: "Missing info" }, { status: 400 });
    }

    // Verify payment actually succeeded in Stripe
    const intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (intent.status === "succeeded") {
      // Update WooCommerce Order status
      const res = await fetchWcApi(`wc/v3/orders/${order_id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "processing",
          transaction_id: payment_intent_id,
        }),
      });

      return NextResponse.json({ success: true, order: res.data });
    } else {
      return NextResponse.json(
        { message: "Payment not successful" },
        { status: 400 },
      );
    }
  } catch (err: any) {
    console.error("[API Verify Order]", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
