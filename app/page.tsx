import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import NewHero from "@/src/components/landing/NewHero";
import OnSale from "@/src/components/landing/OnSale";
import TopBanner from "@/src/components/ui/TopBanner";
import { fetchHomePageDetails } from "@/src/utils/woocommerce-custom-unified";

export default async function Page() {
  const res: any = await fetchHomePageDetails().catch((error) => {
    console.error("Failed to fetch Home details: ", error);
    return { sale_products: [], blogs: [] };
  });

  return (
    <>
      <TopBanner />
      <NewHero />
      <AboutSection />
      <OnSale products={res.sale_products} />
      <Blog />
    </>
  );
}
