import { blogData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";

const Blog = () => {
  return (
    <section className="relative overflow-hidden min-h-dvh flex flex-col items-center justify-center w-full py-10 lg:py-18">
      <div className="container">
        <TextHeader text="Blog" highlightedText="& Articles" />

        <div className="my-5 w-full">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-5 px-4 lg:px-0">
            {blogData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="relative rounded-xl bg-bg-light flex flex-col items-center justify-center p-5 pb-12 cursor-pointer"
                >
                  <div className="relative w-full h-60 mb-4">
                    <Image
                      src={item.url}
                      alt="image"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <p className="text-end mb-2 text-text-muted text-sm">
                      {item.date}
                    </p>
                    <h4 className="text-center mb-2 font-semibold text-xl line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-center mb-2 text-base line-clamp-4 ">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
