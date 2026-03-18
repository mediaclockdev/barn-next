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
              <SwiperSlide key={item.id}>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-gray-50 shadow-md p-6 sm:p-10 text-center sm:text-left">
                  <div className="relative w-30 h-30 sm:w-40 sm:h-40 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt="review"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-yellow-400 text-xl sm:text-2xl mb-3">
                      {item.stars}
                    </p>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 line-clamp-4">
                      {item.review}
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
