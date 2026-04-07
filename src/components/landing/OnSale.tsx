"use client";

import TextHeader from "@/src/utils/TextHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import OnSaleCard from "../cards/OnSaleCard";
import { WooCommerceProduct } from "@/src/utils/woocommerce";

const OnSale = ({ products }: { products: WooCommerceProduct[] }) => {
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
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product.id}>
                <OnSaleCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden md:grid mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <OnSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnSale;
