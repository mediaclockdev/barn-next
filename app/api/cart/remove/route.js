import { connectDB } from "@/src/lib/db";
import Cart from "@/src/models/Cart";
import { getUserFromToken } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { product_id } = await req.json();

        let cart = await Cart.findOne({ user_id });
        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        cart.items = cart.items.filter((item) => Number(item.product_id) !== Number(product_id));
        cart.updated_at = new Date();
        await cart.save();

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Cart Remove Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
