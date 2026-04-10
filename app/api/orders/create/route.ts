import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      phone,
      shipping,
      billing,
      createAccount,
      password,
      cartItems,
      payment_method,
      transaction_id,
      shippingCost,
      deliveryMethod,
    } = body;

    let customerId = 0;

    // Auto-fill phone on billing/shipping if requested, WooCommerce expects it on billing usually
    const finalBilling = billing || { ...shipping };
    finalBilling.email = email;
    finalBilling.phone = phone;

    if (createAccount && password) {
      // Attempt to create customer
      try {
        const custRes = await fetchWcApi<any>("wc/v3/customers", {
          method: "POST",
          body: JSON.stringify({
            email,
            first_name: shipping.first_name,
            last_name: shipping.last_name,
            password,
            billing: finalBilling,
            shipping: shipping,
          }),
        });
        customerId = custRes.data.id;
      } catch (cerr: any) {
        console.error("[API Create Order] Failed to create customer", cerr);
        return NextResponse.json(
          {
            message:
              "Failed to create account. Email might already be registered.",
          },
          { status: 400 },
        );
      }
    }

    const orderPayload: any = {
      payment_method: payment_method || "stripe",
      payment_method_title: payment_method === "paypal" ? "PayPal" : "Credit Card (Stripe)",
      set_paid: payment_method === "paypal" ? true : false,
      transaction_id: transaction_id || undefined,
      billing: finalBilling,
      shipping: shipping,
      line_items: cartItems.map((item: any) => ({
        product_id: item.product_id,
        variation_id: item.variation_id || undefined,
        quantity: item.quantity,
      })),
      shipping_lines: deliveryMethod === "pickup" ? [
        {
          method_id: "local_pickup",
          method_title: "Store Pickup",
          total: "0.00"
        }
      ] : (shippingCost !== undefined && shippingCost !== null ? [
        {
          method_id: "flat_rate",
          method_title: "Home Delivery",
          total: String(shippingCost)
        }
      ] : []),
      customer_id: customerId,
    };

    const orderRes = await fetchWcApi<any>("wc/v3/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload),
    });

    return NextResponse.json({ order_id: orderRes.data.id }, { status: 200 });
  } catch (err: any) {
    console.error("[API Create Order] Server Error", err);
    return NextResponse.json(
      { message: err.message || "Server Error" },
      { status: 500 },
    );
  }
}
