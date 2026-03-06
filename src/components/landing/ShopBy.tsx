"use client";

import { categoryData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import CategoryCard from "../cards/CategoryCard";
import { useRouter } from "next/navigation";

type Props = {};

const ShopBy = (props: Props) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/categories");
  };

  return (
    <section className="section">
      <div className="container">
        <TextHeader text="Shop By" highlightedText="Category" onClick={handleViewAll} />

        <div className="my-5 w-full">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categoryData.slice(0, 7).map((item) => {
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

export default ShopBy;
