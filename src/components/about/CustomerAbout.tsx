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
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur. Duis venenatis fermentum arcu cras et donec. Vulputate dui in massa lobortis sit tristique. Fusce ullamcorper cras elit ornare dui amet. Quis tellus elementum ornare potenti a.",
    },
    {
      id: 2,
      stars: "★★★★",
      image: "/images/review/review1.jpg",
      review:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur. Duis venenatis fermentum arcu cras et donec. Vulputate dui in massa lobortis sit tristique. Fusce ullamcorper cras elit ornare dui amet. Quis tellus elementum ornare potenti a.",
    },
    {
      id: 3,
      stars: "★★",
      image: "/images/review/review1.jpg",
      review:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur. Duis venenatis fermentum arcu cras et donec. Vulputate dui in massa lobortis sit tristique. Fusce ullamcorper cras elit ornare dui amet. Quis tellus elementum ornare potenti a.",
    },
  ];

  return (
    <section className="section">
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
            autoplay={{
              delay: 2500,
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
