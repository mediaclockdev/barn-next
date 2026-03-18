// import { allCategoryData, categoryData } from "@/src/data/Data";
// import TextHeader from "@/src/utils/TextHeader";
// import CategoryCard from "../cards/CategoryCard";

// type Props = {};

// const ShopBy = (props: Props) => {
//   return (
//     <section className="halfSection">
//       <div className="container">
//         <TextHeader
//           text="Shop By"
//           highlightedText="Category"
//           url="/categories"
//         />

//         <div className="my-5 w-full">
//           <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {allCategoryData.slice(0, 8).map((item) => {
//               return (
//                 <CategoryCard
//                   key={item.id}
//                   id={item.id}
//                   name={item.name}
//                   image={item.url}
//                   to={item.to}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopBy;

"use client";

import { allCategoryData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import CategoryCard from "../cards/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const ShopBy = () => {
  const categories = allCategoryData.slice(0, 8);

  return (
    <section className="halfSection">
      <div className="container">
        <TextHeader
          text="Shop By"
          highlightedText="Category"
          url="/categories"
        />

        {/* 🔥 MOBILE SLIDER */}
        <div className="block md:hidden my-5">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={16}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className=""
          >
            {categories.map((item) => (
              <SwiperSlide key={item.id} className="">
                <CategoryCard
                  id={item.id}
                  name={item.name}
                  image={item.url}
                  to={item.to}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden md:block my-5">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.url}
                to={item.to}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBy;
