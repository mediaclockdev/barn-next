import { getUserFromToken } from "@/src/lib/auth";
import { fetchWcApi } from "@/src/utils/api-client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { product_id, variation_id = 0 } = await req.json();

        const { data } = await fetchWcApi("custom/v1/cart/remove", {
            method: "POST",
            body: JSON.stringify({
                customer_id: user_id,
                product_id: Number(product_id),
                variation_id: Number(variation_id),
            }),
        });


        const items = data?.items || data?.cart || [];

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Cart Remove Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
