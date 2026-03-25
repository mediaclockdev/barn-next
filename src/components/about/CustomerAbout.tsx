"use client";

import "swiper/css";
import "swiper/css/pagination";

import TextHeader from "@/src/utils/TextHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const CustomerAbout = () => {
  const reviews = [
    {
      id: 1,
      stars: "★★★★★",
      image: "/images/review/review1.jpg",
      review:
        "Great local store with really helpful staff. They helped me pick the right feed for my horses and explained everything properly. Prices are fair and quality is top-notch. Definitely my go-to place now.",
    },
    {
      id: 2,
      stars: "★★★★",
      image: "/images/review/review2.jpg",
      review:
        "Good range of products and easy to find what you need. I’ve been coming here for pet supplies for a few months now and haven’t had any issues. Staff are friendly and always willing to help.",
    },
    {
      id: 3,
      stars: "★★★★★",
      image: "/images/review/review3.jpg",
      review:
        "Really impressed with the service. Ordered feed and supplies and everything was ready on time. You can tell they care about animals and customers. Hard to find places like this these days.",
    },
  ];

  return (
    <section className="halfSection">
      <div className="container">
        <TextHeader
          text="What our"
          highlightedText="Customers Say"
          btn={false}
          center={true}
        />

        <div className="max-w-5xl mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            speed={1100}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className=""
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id} className="pb-10 pt-4 px-2">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 rounded-3xl p-8 sm:p-12 text-center sm:text-left h-full">
                  <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-50">
                    <Image
                      src={item.image}
                      alt="review"
                      fill
                      sizes="(max-width: 640px) 112px, 160px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-center">
                    <div className="flex justify-center sm:justify-start">
                      <p className="text-[#FFD700] tracking-widest text-lg sm:text-xl mb-4 bg-yellow-50 px-3 py-1 rounded-full w-fit">
                        {item.stars}
                      </p>
                    </div>

                    <p className="text-gray-700 text-base sm:text-lg leading-[1.8] italic mb-2 relative">
                      <span className="text-primary text-4xl leading-none absolute -top-4 -left-4 opacity-20">&quot;</span>
                      &quot;{item.review}&quot;
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerAbout;
