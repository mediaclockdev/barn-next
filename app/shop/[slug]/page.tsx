import ProductLayout from "@/src/components/shop/ProductLayout";
import React from "react";
import { Metadata } from "next";
import { getProductBySlug } from "@/src/utils/api";
import { constructMetadata } from "@/src/utils/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js dynamic SEO generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Future WooCommerce Backend Integration
  const product = await getProductBySlug();

  if (!product) {
    // Fallback when product isn't found
    return constructMetadata({
      title: "Product Not Found | Mediaclock Shop",
      description: "Discover our wide range of products at Mediaclock.",
      noIndex: true, // Don't let Google index missing products
    });
  }

  const cleanTitle = slug.replace(/-/g, " ");

  return constructMetadata({
    title: `${cleanTitle} | Mediaclock Shop`,
    description: `Shop the best deals on ${cleanTitle} at Mediaclock.`,
    url: `/shop/${slug}`,
    // image: product.images[0].src // Uncomment when API returns images
  });
}

const page = async () => {
  return (
    <div>
      <ProductLayout />
    </div>
  );
};

export default page;
