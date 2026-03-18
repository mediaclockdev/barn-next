"use client";

import { productData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import OnSaleCard from "../cards/OnSaleCard";

const OnSale = () => {
  return (
    <section className="halfSection">
      <div className="container">
        <TextHeader text="Product" highlightedText="On Sale" url="/deals" />

        {/* 🔥 MOBILE SLIDER */}
        <div className="block md:hidden mt-8">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={16}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {productData.map((item) => (
              <SwiperSlide key={item.id}>
                <OnSaleCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden md:grid mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((item) => (
            <OnSaleCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnSale;
