import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import Hero from "@/src/components/landing/Hero";
import OnSale from "@/src/components/landing/OnSale";
import ShopBy from "@/src/components/landing/ShopBy";

import { getHomepageData } from "@/src/utils/homepage-api";

export default async function Page() {
  let homepageData = null;

  try {
    // 🔌 PLUG AND PLAY: This will fetch from your new homepage endpoint!
    // Until the backend developer provides the real URL in api-endpoints.ts, it will fail gracefully.
    homepageData = await getHomepageData();
    // console.log("Homepage Data Fetched:", homepageData);
  } catch (err) {
    console.warn("Homepage API not ready yet (waiting for real endpoint in api-endpoints.ts)");
  }

  return (
    <>
      {/* Once the API is ready, you can pass the specific data pieces into these components! */}
      {/* Example: <Hero data={homepageData?.hero} /> */}
      <Hero />
      <ShopBy />
      <AboutSection />
      <OnSale />
      <Blog />
    </>
  );
}
