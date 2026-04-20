"use client";

import { useEffect, useState } from "react";
import ProductLayout from "./ProductLayout";
import { useProductStore } from "@/src/store/productStore";

const SingleProductClient = ({
  serverProduct,
  slug,
}: {
  serverProduct?: any;
  slug: string;
}) => {
  const storeProduct = useProductStore((state) => state.selectedProduct);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const product = serverProduct || storeProduct;

  if (!isMounted) return null;

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-gray-800">
        Product Not Found
      </div>
    );
  }

  const rawDescription =
    product.description?.replace(/<[^>]*>?/gm, "") ||
    product.short_description?.replace(/<[^>]*>?/gm, "");

  return (
    <div>
      <ProductLayout
        id={product.id}
        title={product.name}
        price={parseFloat(product.price || product.regular_price || "0")}
        image={product.images?.[0]?.src || "/images/shop/shop1.png"}
        images={product.images}
        description={rawDescription || "No description available"}
        stars={
          product.average_rating
            ? Math.round(Number(product.average_rating))
            : 0
        }
        type={product.type}
        attributes={product.attributes}
        variations={product.variations}
        relatedIds={product.related_ids}
        manageStock={product.manage_stock}
        stockQuantity={product.stock_quantity}
      />
    </div>
  );
};

export default SingleProductClient;
