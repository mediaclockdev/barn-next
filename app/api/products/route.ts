import { searchProductsCustom } from "@/src/utils/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Map 'q' parameter to 'search' to gracefully handle legacy query key
  if (params.q && !params.search) {
    params.search = params.q;
    delete params.q;
  }

  try {
    const products = await searchProductsCustom(params);
    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
