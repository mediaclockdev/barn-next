"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import Button from "../ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

const slides = [
  {
    title: (
      <>
        From <span className="text-primary">Barn</span> To{" "}
        <span className="text-primary">Backyard</span> We Got You{" "}
        <span className="text-primary">Covered</span>
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
      className={`min-h-[calc(100vh-80px)] flex items-center w-full overflow-hidden pt-0 lg:pt-0`}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="bg-bg-secondary">
            <div className="relative min-h-[calc(100vh-80px)] flex items-center">
              {/* CONTENT */}
              <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-[1.4] text-center lg:text-left z-10 flex flex-col gap-8">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-12 lg:leading-16 text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="text-text-light font-medium mx-auto lg:mx-0">
                    {slide.desc}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start">
                    <Link href="/shop">
                      <Button text="Explore More" icon={FaArrowCircleRight} />
                    </Link>
                  </div>
                </div>

                <div className="flex-[1.6] relative w-full h-140">
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
              <div className="absolute -bottom-6 lg:-bottom-16 2xl:-bottom-32 3xl:-bottom-40 left-0 w-full pointer-events-none">
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
