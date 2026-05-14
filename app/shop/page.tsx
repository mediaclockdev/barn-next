import ShopLayout from "@/src/components/shop/ShopLayout";
import TopBanner from "@/src/components/ui/TopBanner";
import React, { Suspense } from "react";
import {
  fetchUnifiedCustomProducts,
  fetchWooCommerceCategories,
} from "@/src/utils/woocommerce-custom-unified";
import Loading from "./loading";

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

  // Default to instock if not specified, remove if "all"
  if (!apiParams.stock_status) apiParams.stock_status = "instock";
  else if (apiParams.stock_status === "all") delete apiParams.stock_status;

  let products = [];
  let totalPages = 1;
  let categories = [];

  const catRes = await fetchWooCommerceCategories().catch((err) => {
    console.error("Failed to fetch categories:", err);
    return [];
  });
  categories = catRes || [];

  // Expand category group IDs into actual tags for the backend
  if (apiParams.category) {
    const selectedValues = apiParams.category.split(",");
    const expandedTags = new Set<string>();

    selectedValues.forEach((val) => {
      let wasExpanded = false;
      categories.forEach((cat: any) => {
        cat.filters?.forEach((fg: any) => {
          if (fg.id === val) {
            fg.items?.forEach((item: any) => expandedTags.add(item.id));
            wasExpanded = true;
          }
        });
      });
      if (!wasExpanded) expandedTags.add(val);
    });

    apiParams.category = Array.from(expandedTags).join(",");
  }

  const res = await fetchUnifiedCustomProducts(apiParams).catch((err) => {
    console.error("Failed to fetch custom products:", err);
    return { products: [], totalPages: 1, totalItems: 0 };
  });

  products = res.products || [];
  totalPages = res.totalPages || 1;

  return (
    <>
      <TopBanner />
      <Suspense fallback={<Loading />}>
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
