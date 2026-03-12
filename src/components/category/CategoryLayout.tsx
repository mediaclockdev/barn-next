import { categoryData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import React from "react";
import CategoryCard from "../cards/CategoryCard";

const CategoryLayout = () => {
  return (
    <section className="section !py-0">
      <div className="container">
        <TextHeader
          text="All"
          highlightedText="Categories"
          btn={false}
          center={true}
        />

        <div className="my-5 max-w-5xl mx-auto w-full mb-24">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categoryData.map((item) => {
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
