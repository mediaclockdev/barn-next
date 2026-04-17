import { getUserFromToken } from "@/src/lib/auth";
import { fetchWcApi } from "@/src/utils/api-client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { data } = await fetchWcApi("custom/v1/cart/clear", {
            method: "POST",
            body: JSON.stringify({
                customer_id: user_id,
            }),
        });


        return NextResponse.json({ items: [] });
    } catch (error) {
        console.error("Cart Clear Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
