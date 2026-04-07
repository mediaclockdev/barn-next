import { connectDB } from "@/src/lib/db";
import Cart from "@/src/models/Cart";
import { getUserFromToken } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { product_id, quantity } = await req.json();

        let cart = await Cart.findOne({ user_id });
        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        const existing_item = cart.items.find((item) => Number(item.product_id) === Number(product_id));
        if (existing_item) {
            existing_item.quantity = Number(quantity);
        } else {
            return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
        }

        cart.updated_at = new Date();
        await cart.save();

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Cart Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
