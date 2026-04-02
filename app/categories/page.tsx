import CategoryLayout from "@/src/components/category/CategoryLayout";
import BreadCrumb from "@/src/components/misc/BreadCrumb";
import React from "react";
import { fetchWooCommerceCategoriesRaw } from "@/src/utils/woocommerce-custom-unified";

const page = async () => {
  const categories = await fetchWooCommerceCategoriesRaw().catch(() => []);

  return (
    <div>
      <BreadCrumb />
      <CategoryLayout categories={categories} />
    </div>
  );
};

export default page;
