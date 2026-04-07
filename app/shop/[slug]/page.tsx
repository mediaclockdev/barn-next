import { Metadata } from "next";
import { fetchUnifiedCustomProduct } from "@/src/utils/woocommerce-custom-unified";
import { constructMetadata } from "@/src/utils/seo";
import SingleProductClient from "@/src/components/shop/SingleProductClient";
import { cache } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const getProduct = cache(async (slug: string) => {
  return fetchUnifiedCustomProduct(slug).catch(() => null);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found | Barn Shop",
      description: "Discover our wide range of products at Barn.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} | Barn Shop`,
    description:
      product.short_description?.replace(/<[^>]*>?/gm, "") ||
      `Shop the best deals on ${product.name} at Barn.`,
    url: `/shop/${slug}`,
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  console.log("Slug ", slug);
  console.log("Product ", product);

  return <SingleProductClient serverProduct={product} slug={slug} />;
};

export default page;
