"use client";

import "swiper/css";
import "swiper/css/pagination";

import TextHeader from "@/src/utils/TextHeader";
import React from "react";

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
    <section className="min-h-screen flex items-center justify-center">
      <div>
        <TextHeader
          text="What our"
          highlightedText="Customers Say"
          btn={false}
          center={true}
        />
        <div>
          <div className="max-w-4xl mx-auto">
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
                  <div className="flex items-center gap-10 bg-gray-50 shadow-lg rounded-2xl p-10">
                    <div className="relative w-[180px] h-[180px] rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt="review"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-yellow-400 text-2xl mb-4">
                        {item.stars}
                      </p>

                      <p className="text-gray-600 leading-relaxed">
                        {item.review}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerAbout;
