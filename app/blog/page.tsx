import TextHeader from "@/src/helper/TextHeader";
import TopBanner from "@/src/components/ui/TopBanner";
import BreadCrumb from "@/src/components/misc/BreadCrumb";
import BlogCard from "@/src/components/cards/BlogCard";
import { fetchBlogPosts } from "@/src/utils/blog-api";

const BlogPage = async () => {
  const blogs = await fetchBlogPosts();

  return (
    <>
      <TopBanner />
      <section className="section py-0!">
        <div className="container">
          <BreadCrumb />
          <TextHeader
            text="Blog"
            highlightedText="& Articles"
            url="/blog"
            btn={false}
            center
            isGrid
          />

          <div className="grid md:grid-cols-3 gap-6 my-10 px-5">
            {blogs.map((item) => (
              <BlogCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
