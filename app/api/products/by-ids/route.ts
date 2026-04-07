import { NextResponse } from "next/server";
import { fetchUnifiedCustomProducts } from "@/src/utils/woocommerce-custom-unified";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "Missing ids parameter" }, { status: 400 });
  }

  try {
    const data = await fetchUnifiedCustomProducts({ include: ids });
    return NextResponse.json(data.products);
  } catch (error: any) {
    console.error("Error fetching products by ids:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
