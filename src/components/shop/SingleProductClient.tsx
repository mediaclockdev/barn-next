"use client";

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

  const product = serverProduct || storeProduct;

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-gray-800">
        Product Not Found
      </div>
    );
  }

  let rawDescription = (
    product.description?.replace(/<[^>]*>?/gm, "") ||
    product.short_description?.replace(/<[^>]*>?/gm, "")
  )
    ?.replace(/([a-z])([A-Z])/g, "$1 $2")
    ?.replace(/([,!?])(?=[^\s])/g, "$1 ")
    ?.replace(/\.(?=[a-zA-Z])/g, ". ")
    ?.replace(/\s+([.!?])/g, "$1")
    ?.replace(/\s+/g, " ")
    ?.trim();

  if (rawDescription && !/[.!?]$/.test(rawDescription)) {
    rawDescription += ".";
  }

  return (
    <div>
      <ProductLayout
        id={product.id}
        title={product.name}
        price={parseFloat(product.price || product.regular_price || "0")}
        image={product.images?.[0]?.src || "/images/placeholder.svg"}
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
        slug={slug}
      />
    </div>
  );
};

export default SingleProductClient;
