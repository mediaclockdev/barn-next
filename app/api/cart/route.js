import { getUserFromToken } from "@/src/lib/auth";
import { fetchWcApi } from "@/src/utils/api-client";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const userId = getUserFromToken(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data } = await fetchWcApi(`custom/v1/cart?customer_id=${userId}`, {
            method: "GET",
            cache: "no-store",
        });

        // Normalize: ensure we always return { items: [...] }
        const items = data?.items || data?.data?.items || data?.cart || [];

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Cart GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}