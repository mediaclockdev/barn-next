import { blogData } from "@/src/data/Data";
import TextHeader from "@/src/helper/TextHeader";
import Image from "next/image";
import Link from "next/link";
import TopBanner from "@/src/components/ui/TopBanner";

const BlogPage = () => {
  return (
    <>
      <TopBanner />
      <section className="section">
        <div className="container">
          <TextHeader
            text="Blog"
            highlightedText="& Articles"
            url="/blog"
            btn={false}
            center
            isGrid
          />

          <div className="grid md:grid-cols-3 gap-6 my-10 px-5">
            {blogData.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="h-full"
              >
                <div className="relative rounded-xl bg-bg-light flex flex-col p-5 pb-12 cursor-pointer h-full">
                  <div className="relative w-full h-60 mb-4">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col grow">
                    <p className="text-sm text-text-muted mb-2">{item.date}</p>

                    <h3 className="mb-2 font-semibold text-xl line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-start text-base line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
