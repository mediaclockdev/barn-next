import ProductLayout from "@/src/components/shop/ProductLayout";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div>
      <ProductLayout />
    </div>
  );
};

export default page;
