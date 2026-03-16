import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";

const HeroAbout = () => {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="/images/about/aboutHero.png"
          alt="Hero"
          fill
          priority
          className="object-cover  object-[50%_20%]"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#d9d9d9]/30  to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container w-full mx-auto">
            <div className="max-w-xl px-6 flex flex-col gap-8 items-start justify-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-14 lg:leading-16 text-gray-900">
                Quality Care <span className="text-sky-400">for</span>
                <br />
                <span className="text-sky-400">Every Companion</span>
              </h1>

              <p className="text-text-light text-lg font-medium mx-auto lg:mx-0 max-w-lg">
                Your one-stop shop for all your pet needs, from playful puppies
                to majestic horses.
              </p>
              <Link href="/shop">
                <Button text="Shop Now" icon={FaArrowCircleRight} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
