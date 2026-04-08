import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// Initialize Stripe with the standard configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    // TODO: In a production environment, you MUST re-calculate the order total
    // on the server using your database (e.g., WooCommerce) to prevent
    // malicious users from altering the total on the client.
    // For this demonstration, we are trusting the amount passed from the client.

    // Stripe requires the amount to be in the smallest currency unit (e.g., cents for AUD)
    const amountInCents = Math.round(amount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "aud",
      // Enabling automatic payment methods automatically presents active methods
      // configured in your Stripe Dashboard (like Card, Apple Pay, Google Pay).
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error?.message}` },
      { status: 500 },
    );
  }
}
