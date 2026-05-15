import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import NewHero from "@/src/components/landing/NewHero";
import OnSale from "@/src/components/landing/OnSale";
import { fetchHomePageDetails } from "@/src/utils/woocommerce-custom-unified";
import { blogData } from "@/src/data/Data";
import type { BlogPost } from "@/src/utils/blog-api";
import { getHomePageData } from "@/src/utils/home-api";
import { HOME_FALLBACK } from "@/src/utils/home-fallback";

export default async function Page() {
  const res: any = await fetchHomePageDetails().catch((error) => {
    console.error("Failed to fetch Home details: ", error);
    return { sale_products: [], blogs: [] };
  });

  const home = await getHomePageData();
  const content = { ...HOME_FALLBACK, ...(home?.data || {}) };

  // ── Blog data ──────────────────────────────────────────
  // Using static data for now until the blog API is properly fixed.
  // When ready, uncomment the line below and remove the static fallback:
  // const blogs = resolveHomepageBlogs(res.blogs);
  const blogs = blogData as BlogPost[];

  return (
    <>
      <NewHero
        slides={[
          {
            title: content.slide_1_title,
            desc: content.slide_1_desc,
            img: content.slide_1_img,
          },
          {
            title: content.slide_2_title,
            desc: content.slide_2_desc,
            img: content.slide_2_img,
          },
          {
            title: content.slide_3_title,
            desc: content.slide_3_desc,
            img: content.slide_3_img,
          },
        ]}
      />
      <AboutSection
        title={content.home_about_title}
        subtitle={content.home_about_content}
        image={content.home_about_image}
      />
      <OnSale
        products={res.sale_products}
        title={content.onsale_title}
        highlight={content.onsale_highlight}
      />
      <Blog
        blogs={blogs}
        title={content.blog_title}
        highlight={content.blog_highlight}
      />
    </>
  );
}
