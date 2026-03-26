import ShopLayout from "@/src/components/shop/ShopLayout";
import React from "react";
import {
  getProductsWithPagination,
  searchProductsCustom,
} from "@/src/utils/woocommerce";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  // Format parameters to pass to WooCommerce fetchers
  const apiParams: Record<string, string> = {};
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      apiParams[key] = value;
    } else if (Array.isArray(value)) {
      apiParams[key] = value.join(",");
    }
  });

  const currentPage = parseInt(apiParams.page, 10) || 1;
  const searchStr = apiParams.search;

  // Fetch from WooCommerce (server-side)
  let products = [];
  let totalPages = 1;

  if (searchStr) {
    products = await searchProductsCustom(apiParams).catch((err) => {
      console.error("Failed to fetch products for search:", err);
      return [];
    });
    // For custom search, assume 1 page of results natively unless told otherwise
    totalPages = 1;
  } else {
    // Provide default pagination
    if (!apiParams.per_page) apiParams.per_page = "12";
    if (!apiParams.page) apiParams.page = currentPage.toString();

    const res = await getProductsWithPagination(apiParams).catch((err) => {
      console.error("Failed to fetch paginated products:", err);
      return { products: [], totalPages: 1, totalItems: 0 };
    });
    products = res.products;
    totalPages = res.totalPages;
  }

  return (
    <div>
      <ShopLayout
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default page;
