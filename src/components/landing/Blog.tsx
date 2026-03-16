import { blogData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  return (
    <section className="halfSection">
      <div className="container">
        <TextHeader text="Blog" highlightedText="& Articles" url="/blog" />

        <div className="my-5 w-full">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-5">
            {blogData.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="h-full"
                >
                  <div className="relative rounded-xl bg-bg-light flex flex-col p-5 pb-12 cursor-pointer h-full">
                    <div className="relative w-full h-60 mb-4">
                      <Image
                        src={item.url}
                        alt="image"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col grow">
                      <p className="text-end mb-2 text-text-muted text-sm">
                        {item.date}
                      </p>

                      <h4 className="text-center mb-2 font-semibold text-xl line-clamp-2">
                        {item.title}
                      </h4>

                      <p className="text-center text-base line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
