import { getUserFromToken } from "@/src/lib/auth";
import { fetchWcApi } from "@/src/utils/api-client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { guest_cart } = await req.json();

        if (!guest_cart || !Array.isArray(guest_cart) || guest_cart.length === 0) {
            return NextResponse.json({ error: "No guest cart items provided" }, { status: 400 });
        }

        console.log("Guest Cart: ", guest_cart);
        console.log("User ID: ", user_id);

        const { data } = await fetchWcApi("custom/v1/cart/merge", {
            method: "POST",
            body: JSON.stringify({
                customer_id: user_id,
                guest_cart: guest_cart.map(item => ({
                    product_id: Number(item.product_id),
                    variation_id: Number(item.variation_id || 0),
                    quantity: Number(item.quantity),
                    variation_attributes: item.variation_attributes || {},
                })),
            }),
        });

        console.log("Merge Data: ", data);

        const items = data?.items || data?.cart || [];

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Cart Merge Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
