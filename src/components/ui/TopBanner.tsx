"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingBag, FaTruck, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TopBanner = () => {
  const announcements = [
    {
      text: "🎉 Click and Collect is now available! Shop online and pick up in store.",
      linkText: "Shop Now",
      linkUrl: "/shop",
      icon: <FaShoppingBag />,
    },
    {
      text: "🛒 Better deals, better feed, better for your animals",
      linkText: "View Deals",
      linkUrl: "/deals",
      icon: <FaTruck />,
    },
    {
      text: "⭐ Join The Barn family and give your animals the quality they deserve.",
      linkText: "Learn More",
      linkUrl: "/about-us",
      icon: <FaStar />,
    },
  ];

  return (
    <div id="top-banner" className="bg-primary text-white w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        allowTouchMove={true}
        className="w-full"
      >
        {announcements.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="py-3 px-4 w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center sm:text-left text-sm sm:text-base font-medium">
              <span>{item.text}</span>
              <Link
                href={item.linkUrl}
                className="inline-flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm shrink-0 cursor-pointer"
              >
                {item.icon}
                {item.linkText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBanner;
