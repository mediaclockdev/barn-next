import ShopLayout from "@/src/components/shop/ShopLayout";
import React, { Suspense } from "react";
import {
  fetchUnifiedCustomProducts,
  fetchWooCommerceCategories,
} from "@/src/utils/woocommerce-custom-unified";

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

  // Provide default pagination
  if (!apiParams.per_page) apiParams.per_page = "12";
  if (!apiParams.page) apiParams.page = currentPage.toString();

  // Fetch from Custom Unified WooCommerce Endpoint (server-side)
  let products = [];
  let totalPages = 1;
  let categories = [];

  const res = await fetchUnifiedCustomProducts(apiParams).catch((err) => {
    console.error("Failed to fetch custom products:", err);
    return { products: [], totalPages: 1, totalItems: 0 };
  });

  const catRes = await fetchWooCommerceCategories().catch((err) => {
    console.error("Failed to fetch categories:", err);
    return [];
  });

  products = res.products || [];
  totalPages = res.totalPages || 1;
  categories = catRes || [];

  return (
    <>
      <Suspense fallback={<div>Loading Shop...</div>}>
        <ShopLayout
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          categories={categories}
        />
      </Suspense>
    </>
  );
};

export default page;
