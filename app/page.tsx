import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import Hero from "@/src/components/landing/Hero";
import OnSale from "@/src/components/landing/OnSale";
import { fetchHomePageDetails } from "@/src/utils/woocommerce-custom-unified";

export default async function Page() {
  const res: any = await fetchHomePageDetails().catch((error) => {
    console.error("Failed to fetch Home details: ", error);
    return { sale_products: [], blogs: [] };
  });

  return (
    <>
      <Hero />
      <AboutSection />
      <OnSale products={res.sale_products} />
      <Blog />
    </>
  );
}
