import { getUserFromToken } from "@/src/lib/auth";
import { fetchWcApi } from "@/src/utils/api-client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { product_id, quantity, variation_id = 0, variation_attributes = {} } = await req.json();

        const body = {
            customer_id: user_id,
            product_id: Number(product_id),
            variation_id: Number(variation_id),
            quantity: Number(quantity),
            variation_attributes,
        };

        const { data } = await fetchWcApi("custom/v1/cart/update", {
            method: "POST",
            body: JSON.stringify(body),
        });

        const items = data?.items || data?.cart || [];

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Cart Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
