"use client";

import { blogData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../cards/BlogCard";
import { Pagination } from "swiper/modules";

const Blog = () => {
  return (
    <section className="halfSection pt-0!">
      <div className="container">
        <TextHeader text="Blog" highlightedText="& Articles" url="/blog" />

        <div className="my-5 w-full">
          {/* Mobile Slider */}
          <div className="md:hidden">
            <Swiper
              slidesPerView={1.1}
              spaceBetween={16}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="overflow-visible!"
              wrapperClass="items-stretch"
            >
              {blogData.map((item) => (
                <SwiperSlide key={item.id} className="h-auto flex">
                  <BlogCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-5">
            {blogData.map((item) => (
              <BlogCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
