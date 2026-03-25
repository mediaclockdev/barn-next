import { getProductsWithPagination } from "@/src/utils/woocommerce";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "12";

  try {
    const data = await getProductsWithPagination({
      page,
      per_page,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
