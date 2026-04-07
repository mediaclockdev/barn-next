import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import Hero from "@/src/components/landing/Hero";
import OnSale from "@/src/components/landing/OnSale";
import ShopBy from "@/src/components/landing/ShopBy";
import { getHomepageData } from "@/src/utils/homepage-api";
import { fetchUnifiedCustomProducts } from "@/src/utils/woocommerce-custom-unified";

export default async function Page() {
  // let homepageData = null;
  // const categories = await fetchWooCommerceCategoriesRaw().catch(() => []);

  // try {
  //   homepageData = await getHomepageData();
  // } catch (err) {
  //   console.warn(
  //     "Homepage API not ready yet (waiting for real endpoint in api-endpoints.ts)",
  //   );
  // }
  const res = await fetchUnifiedCustomProducts({ per_page: "20" }).catch(
    (err) => {
      console.error("Failed to fetch custom products:", err);
      return { products: [], totalPages: 1, totalItems: 0 };
    },
  );

  console.log("Res ", res);

  return (
    <>
      <Hero />
      {/* <ShopBy categories={categories} /> */}
      <AboutSection />
      <OnSale products={res.products} />
      <Blog />
    </>
  );
}
