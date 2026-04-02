import { connectDB } from "@/src/lib/db";
import Cart from "@/src/models/Cart";
import { getUserFromToken } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectDB();
        const userId = getUserFromToken(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const cart = await Cart.findOne({ user_id: userId });
        return NextResponse.json(cart || { items: [] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}