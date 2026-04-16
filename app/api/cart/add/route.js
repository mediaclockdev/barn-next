import { connectDB } from "@/src/lib/db";
import Cart from "@/src/models/Cart";
import { getUserFromToken } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const user_id = getUserFromToken(req);

        if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { product_id, quantity, variation_id = 0, variation_name = "" } = await req.json();

        let cart = await Cart.findOne({ user_id });
        if (!cart) {
            cart = await Cart.create({
                user_id,
                items: [
                    { product_id: Number(product_id), variation_id: Number(variation_id), variation_name, quantity: Number(quantity) }
                ]
            })
        } else {
            const existing_item = cart.items.find((item) => Number(item.product_id) === Number(product_id) && Number(item.variation_id || 0) === Number(variation_id));
            if (existing_item) {
                existing_item.quantity += Number(quantity);
                if (variation_name) {
                    existing_item.variation_name = variation_name;
                }
            } else {
                cart.items.push({ product_id: Number(product_id), variation_id: Number(variation_id), variation_name, quantity: Number(quantity) });
            }
            cart.updated_at = new Date();
            await cart.save();
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Cart Add Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}