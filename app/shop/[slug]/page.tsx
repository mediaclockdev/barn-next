import ProductLayout from "@/src/components/shop/ProductLayout";
import React from "react";
import { Metadata } from "next";
import { getProducts } from "@/src/utils/woocommerce";
import { constructMetadata } from "@/src/utils/seo";
import SingleProductClient from "@/src/components/shop/SingleProductClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js dynamic SEO generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Fetch product from WooCommerce API
  const products = await getProducts({ slug }).catch(() => []);
  const product = products?.[0];

  if (!product) {
    // Fallback when product isn't found
    return constructMetadata({
      title: "Product Not Found | Mediaclock Shop",
      description: "Discover our wide range of products at Mediaclock.",
      noIndex: true, // Don't let Google index missing products
    });
  }

  return constructMetadata({
    title: `${product.name} | Mediaclock Shop`,
    description:
      product.short_description?.replace(/<[^>]*>?/gm, "") ||
      `Shop the best deals on ${product.name} at Mediaclock.`,
    url: `/shop/${slug}`,
    // image: product.images[0]?.src
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;

  const products = await getProducts({ slug }).catch(() => []);
  const product = products?.[0];

  return <SingleProductClient serverProduct={product} slug={slug} />;
};

export default page;
// if (!product) {
//     return (
//       <div className="text-center py-20 text-2xl font-bold">
//         Product Not Found
//       </div>
//     );
//   }

//   // Simple HTML strip for description since ProductLayout expects raw text
//   const rawDescription = product.description?.replace(/<[^>]*>?/gm, "");

//   return (
//     <div>
//       <ProductLayout
//         id={product.id}
//         title={product.name}
//         price={parseFloat(product.price || product.regular_price || "0")}
//         image={product.images?.[0]?.src || "/images/shop/shop1.png"}
//         images={product.images}
//         description={rawDescription || "No description available"}
//         stars={parseInt(product.average_rating) || 5}
//       />
//     </div>
//   );
