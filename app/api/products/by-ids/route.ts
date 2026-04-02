import { getProducts } from "@/src/utils/woocommerce";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
        return Response.json({ error: "Missing 'ids' query parameter" }, { status: 400 });
    }

    const ids = idsParam
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id) && id > 0);

    if (ids.length === 0) {
        return Response.json({ error: "No valid product IDs provided" }, { status: 400 });
    }

    try {
        // Use the WooCommerce `include` param to batch-fetch all products in one call
        const products = await getProducts({
            include: ids.join(","),
            per_page: String(ids.length),
        });

        const mapped = products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            regular_price: p.regular_price,
            sale_price: p.sale_price,
            on_sale: p.on_sale,
            image: p.images?.[0]?.src || "/images/shop/shop1.png",
            images: p.images,
        }));

        return Response.json(mapped);
    } catch (error) {
        console.error("Failed to fetch products by IDs:", error);
        // Return empty array instead of 500 — cart will show "Loading..." for missing products
        return Response.json([]);
    }
}
