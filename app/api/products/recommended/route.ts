import { NextResponse } from "next/server";
import {
  fetchUnifiedCustomProduct,
  fetchUnifiedCustomProductByIds,
} from "@/src/utils/woocommerce-custom-unified";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json(
      { error: "Missing ids parameter" },
      { status: 400 },
    );
  }

  try {
    const productIds = ids.split(",").map((id) => Number(id.trim()));
    const productIdSet = new Set(productIds);

    // Fetch full product details for each cart product to get related_ids
    // (the full endpoint returns related_ids, the by-ids endpoint does not)
    const fullProducts = await Promise.allSettled(
      productIds.map((id) => fetchUnifiedCustomProduct(id)),
    );

    // Collect all related IDs, excluding products already in cart
    const allRelatedIds = new Set<number>();
    fullProducts.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        const product = result.value as any;
        if (product.related_ids && Array.isArray(product.related_ids)) {
          product.related_ids.forEach((rid: number) => {
            if (!productIdSet.has(rid)) {
              allRelatedIds.add(rid);
            }
          });
        }
      }
    });

    if (allRelatedIds.size === 0) {
      return NextResponse.json({ count: 0, products: [] });
    }

    // Fetch the related products (take up to 6)
    const relatedIdsToFetch = Array.from(allRelatedIds).slice(0, 6);
    const data: any = await fetchUnifiedCustomProductByIds(
      relatedIdsToFetch.join(","),
    );
    const products = Array.isArray(data) ? data : data?.products || [];

    return NextResponse.json({
      count: products.length,
      products: products.slice(0, 6),
    });
  } catch (error: any) {
    console.error("Error fetching related products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
