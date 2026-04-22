"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Button from "../ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    title: (
      <>
        From <span className="text-primary">Barn</span> To Backyard We Got You
        Covered
      </>
    ),
    desc: "This is your one stop shop for your farming, animal feed and rural needs. Experience the best quality products for your livestock and companions.",
    img: "/images/newhero/newHero2.jpg",
  },
  {
    title: (
      <>
        Find The Best Stock And Food For Your{" "}
        <span className="text-primary">Pet</span>
      </>
    ),
    desc: "Quality feed, pet supplies, and farm essentials you can trust. Keep your beloved companions healthy and happy with our premium selection.",
    img: "/images/newhero/newHero1.jpg",
  },
  {
    title: (
      <>
        Because Your <span className="text-primary">Horse</span> Deserves The
        Best Care
      </>
    ),
    desc: "Explore a wide variety of horse feed, accessories, rugs, wormers, apparel and grooming essentials tailored for equine excellence.",
    img: "/images/newhero/newHero.jpg",
  },
];

const NewHero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-100px)] min-h-[600px] overflow-hidden">
      <style suppressHydrationWarning>{`
        .new-hero-swiper .swiper-pagination-bullet {
          background-color: #ffffff;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .new-hero-swiper .swiper-pagination-bullet-active {
          background-color: var(--color-primary, #facc15);
          opacity: 1;
          width: 24px;
          border-radius: 8px;
        }
        .new-hero-swiper .swiper-pagination-bullets {
          bottom: 50px !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={1000}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full new-hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative w-full h-full bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.img}
                alt="Banner Image"
                fill
                className="object-cover object-center"
                priority={i === 0}
                quality={100}
                sizes="100vw"
                unoptimized
              />
              {/* Clean gradient overlay, dark on left tapering off to right */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center container mx-auto px-6 xl:px-12 lg:pb-16">
              <div className="max-w-2xl transform transition-transform duration-700 translate-y-0 opacity-100 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-xl text-gray-200 mb-8 font-medium drop-shadow-md leading-relaxed max-w-xl">
                  {slide.desc}
                </p>
                <div className="flex items-center justify-start">
                  <Link href="/shop" className="inline-block relative z-20">
                    <Button text="Shop Now" icon={FaArrowRight} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Torn Effect at the bottom */}
      {/* <div className="absolute -bottom-6 lg:-bottom-16 2xl:-bottom-32 3xl:-bottom-40 left-0 w-full pointer-events-none z-20">
        <Image
          src="/images/hero/torn1.png"
          alt="Torn Edge"
          width={220}
          height={200}
          className="w-full object-cover"
        />
      </div> */}
    </section>
  );
};

export default NewHero;
