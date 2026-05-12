import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import NewHero from "@/src/components/landing/NewHero";
import OnSale from "@/src/components/landing/OnSale";
import TopBanner from "@/src/components/ui/TopBanner";
import { fetchHomePageDetails } from "@/src/utils/woocommerce-custom-unified";
import { resolveHomepageBlogs } from "@/src/utils/blog-api";
import { blogData } from "@/src/data/Data";
import type { BlogPost } from "@/src/utils/blog-api";

export default async function Page() {
  const res: any = await fetchHomePageDetails().catch((error) => {
    console.error("Failed to fetch Home details: ", error);
    return { sale_products: [], blogs: [] };
  });

  // ── Blog data ──────────────────────────────────────────
  // Using static data for now until the blog API is properly fixed.
  // When ready, uncomment the line below and remove the static fallback:
  // const blogs = resolveHomepageBlogs(res.blogs);
  const blogs = blogData as BlogPost[];

  return (
    <>
      <TopBanner />
      <NewHero />
      <AboutSection />
      <OnSale products={res.sale_products} />
      <Blog blogs={blogs} />
    </>
  );
}
