import DealsLayout from "@/src/components/deals/DealsLayout";
import React, { Suspense } from "react";
import { fetchSaleProducts } from "@/src/utils/woocommerce-custom-unified";
import Loading from "./loading";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DealsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const apiParams: Record<string, string> = {};
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      apiParams[key] = value;
    } else if (Array.isArray(value)) {
      apiParams[key] = value.join(",");
    }
  });

  const currentPage = parseInt(apiParams.page, 10) || 1;

  if (!apiParams.per_page) apiParams.per_page = "12";
  if (!apiParams.page) apiParams.page = currentPage.toString();

  // Default to instock if not specified, remove if "all"
  if (!apiParams.stock_status) apiParams.stock_status = "instock";
  else if (apiParams.stock_status === "all") delete apiParams.stock_status;

  const res = await fetchSaleProducts(apiParams).catch((err) => {
    console.error("Failed to fetch sale products:", err);
    return { products: [], totalPages: 1, totalItems: 0 };
  });

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DealsLayout
          products={res.products}
          currentPage={currentPage}
          totalPages={res.totalPages}
        />
      </Suspense>
    </div>
  );
}
