"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import Button from "../ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    title: (
      <>
        From <span className="text-primary">Barn</span> To{" "}
        <span className="text-primary">Backyard</span>
        <br /> We Got You <span className="text-primary">Covered</span>
      </>
    ),
    desc: "This is your one stop shop for your farming, animal feed and rural needs.",
    img: "/images/hero/hero.png",
  },
  {
    title: (
      <>
        Find The <span className="text-primary">Best</span>
        <br /> Stock And Food For Your <span className="text-primary">
          Pet
        </span>{" "}
        Animal
      </>
    ),
    desc: "Quality feed, pet supplies, and farm essentials you can trust.",
    img: "/images/hero/hero1.png",
  },
  {
    title: (
      <>
        Because Your <span className="text-primary">Horse</span>
        <br /> Deserves The <span className="text-primary">Best</span>
      </>
    ),
    desc: "Explore wide variety of horse feed, accessories,rugs, wormer ,apparel and grooming.",
    img: "/images/hero/hero3.png",
  },
];

const Hero = () => {
  return (
    <section
      className={`min-h-[calc(100vh-64px)] flex items-center w-full overflow-hidden pt-0 py-10 lg:py-18 lg:pt-0`}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative min-h-[calc(100vh-80px)] flex items-center">
              {/* CONTENT */}
              <div className="container mx-auto px-6  flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* LEFT TEXT */}
                <div className="flex-1 text-center lg:text-left z-10 flex flex-col gap-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-12 lg:leading-15 text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="text-text-light font-medium mx-auto lg:mx-0">
                    {slide.desc}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start">
                    <Button text="Explore More" icon={FaArrowCircleRight} />
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-2 relative w-full h-140">
                  <Image
                    src={slide.img}
                    alt="Hero"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* TORN EFFECT */}
              <div className="absolute -bottom-20 left-0 w-full pointer-events-none">
                <Image
                  src="/images/hero/torn1.png"
                  alt="Torn Effect"
                  width={220}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
