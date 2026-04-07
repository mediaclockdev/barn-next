import TextHeader from "@/src/helper/TextHeader";
import CategoryCard from "../cards/CategoryCard";
import Image from "next/image";

const CategoryLayout = ({ categories = [] }: { categories?: any[] }) => {
  return (
    <section className="section py-0!">
      <div className="container relative">
        <div className="absolute right-10 top-5 -z-10 ">
          <Image
            alt="Cat"
            src={"/images/catdog.png"}
            width={200}
            height={200}
          />
        </div>

        <TextHeader
          text="All"
          highlightedText="Categories"
          btn={false}
          center={true}
        />

        <div className="my-5 max-w-5xl mx-auto w-full mb-24 lg:mt-20">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
            {categories.map((item) => {
              // Gracefully find image or use placeholder
              const imgUrl =
                item?.image?.src || typeof item.image === "string"
                  ? item.image
                  : "/images/category/cat2.png";

              return (
                <CategoryCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={imgUrl}
                  to={`/shop?category=${item.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryLayout;
