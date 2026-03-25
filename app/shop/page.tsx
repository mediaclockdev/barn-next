"use client";

import ShopLayout from "@/src/components/shop/ShopLayout";
import React from "react";
import { getProductsWithPagination } from "@/src/utils/woocommerce";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const pageStr =
    typeof resolvedSearchParams.page === "string"
      ? resolvedSearchParams.page
      : "1";
  const currentPage = parseInt(pageStr, 10) || 1;

  // Fetch from WooCommerce (server-side)
  const { products, totalPages } = await getProductsWithPagination({
    per_page: "12",
    page: currentPage.toString(),
  }).catch((err) => {
    console.error("Failed to fetch products:", err);
    return { products: [], totalPages: 1, totalItems: 0 };
  });

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
