import { Metadata } from "next";
import {
  fetchUnifiedCustomProduct,
  fetchUnifiedCustomProducts,
} from "@/src/utils/woocommerce-custom-unified";
import { constructMetadata } from "@/src/utils/seo";
import SingleProductClient from "@/src/components/shop/SingleProductClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  let product = null;
  if (!isNaN(Number(slug))) {
    product = await fetchUnifiedCustomProduct(slug).catch(() => null);
  } else {
    const res = await fetchUnifiedCustomProducts({ slug }).catch(() => null);
    product = res?.products?.[0];
  }

  if (!product) {
    return constructMetadata({
      title: "Product Not Found | Mediaclock Shop",
      description: "Discover our wide range of products at Mediaclock.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} | Mediaclock Shop`,
    description:
      product.short_description?.replace(/<[^>]*>?/gm, "") ||
      `Shop the best deals on ${product.name} at Mediaclock.`,
    url: `/shop/${slug}`,
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;

  let product = null;
  if (!isNaN(Number(slug))) {
    product = await fetchUnifiedCustomProduct(slug).catch(() => null);
  } else {
    const res = await fetchUnifiedCustomProducts({ slug }).catch(() => null);
    product = res?.products?.[0];
  }

  return <SingleProductClient serverProduct={product} slug={slug} />;
};

export default page;
