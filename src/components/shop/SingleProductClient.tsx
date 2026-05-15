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

  let rawDescription = (product.description || product.short_description || "")
    .replace(/\s+/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br/><br/>") // Only reduce 3+ to 2
    .replace(/<p[^>]*>\s*(?:<br\s*\/?>|&nbsp;|\s)*\s*<\/p>/gi, "")
    .trim();

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
        stockStatus={product.stock_status}
        slug={slug}
      />
    </div>
  );
};

export default SingleProductClient;
