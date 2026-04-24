"use client";

import TextHeader from "@/src/helper/TextHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "../cards/ProductCard";
import { WooCommerceProduct } from "@/src/utils/woocommerce";
import { useProductStore } from "@/src/store/productStore";

const OnSale = ({ products }: { products: WooCommerceProduct[] }) => {
  return (
    <section className="halfSection pt-0!">
      <div className="container">
        <TextHeader
          text="Product"
          highlightedText="On Sale"
          url="/deals"
          center={true}
          lgCenter={false}
        />

        {/* 🔥 MOBILE SLIDER */}
        <div className="block md:hidden mt-8 relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".onsale-prev",
              nextEl: ".onsale-next",
            }}
            className="pb-10 relative group"
          >
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  onClick={() =>
                    useProductStore.getState().setSelectedProduct(product)
                  }
                  className="cursor-pointer"
                >
                  <ProductCard
                    image={product.images?.[0]?.src || "/images/placeholder.svg"}
                    images={product.images}
                    id={product.id}
                    price={parseFloat(
                      product.regular_price || product.price || "0",
                    )}
                    discountedPrice={
                      product.sale_price
                        ? parseFloat(product.sale_price)
                        : undefined
                    }
                    title={product.name}
                    stars={parseInt(product.average_rating) || 5}
                    type={product.type}
                    slug={product.slug}
                    stockStatus={product.stock_status}
                    stockQuantity={product.stock_quantity}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Arrows */}
            <button
              className="onsale-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white rounded-full p-2 shadow-md z-20 disabled:opacity-50 cursor-pointer"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className="onsale-next absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white rounded-full p-2 shadow-md z-20 disabled:opacity-50 cursor-pointer"
              aria-label="Next slide"
            >
              <FiChevronRight size={20} />
            </button>
          </Swiper>
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden md:grid mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() =>
                useProductStore.getState().setSelectedProduct(product)
              }
              className="cursor-pointer"
            >
              <ProductCard
                image={product.images?.[0]?.src || "/images/placeholder.svg"}
                images={product.images}
                id={product.id}
                price={parseFloat(
                  product.regular_price || product.price || "0",
                )}
                discountedPrice={
                  product.sale_price
                    ? parseFloat(product.sale_price)
                    : undefined
                }
                title={product.name}
                stars={parseInt(product.average_rating) || 5}
                type={product.type}
                slug={product.slug}
                stockStatus={product.stock_status}
                stockQuantity={product.stock_quantity}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnSale;
