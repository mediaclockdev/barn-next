import { allCategoryData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import CategoryCard from "../cards/CategoryCard";
import Image from "next/image";

const CategoryLayout = () => {
  return (
    <section className="section !py-0">
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
            {allCategoryData.map((item) => {
              return (
                <CategoryCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.url}
                  to={item.to}
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
