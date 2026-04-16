import { connectDB } from "@/src/lib/db";
import Cart from "@/src/models/Cart";
import { getUserFromToken } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        let cart = await Cart.findOne({ user_id });
        if (cart) {
            cart.items = [];
            cart.updated_at = new Date();
            await cart.save();
        }

        return NextResponse.json(cart || { items: [] });
    } catch (error) {
        console.error("Cart Clear Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
