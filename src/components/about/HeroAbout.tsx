import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";

const HeroAbout = () => {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-[calc(100vh-150px)] overflow-hidden">
        <Image
          src="/images/about/about1.jpg"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        {/* Gradient shadow from the left to make text pop while keeping the rest of the image clear */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent w-full md:w-2/3 lg:w-1/2"></div>

        {/* Subtle overall darkening to ensure text remains readable if it overflows */}
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container w-full mx-auto relative z-10">
            <div className="max-w-xl px-4 flex flex-col gap-8 items-start justify-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-10 lg:leading-16 text-white drop-shadow-xl">
                Quality Care
                <br />
                <span className="text-sky-400">For Every Companion</span>
              </h1>

              <p className="text-gray-100 text-lg font-medium mx-auto lg:mx-0 max-w-lg drop-shadow-lg">
                Your one-stop shop for all your pet needs, from playful puppies
                to majestic horses.
              </p>
              <Link href="/shop">
                <Button text="Shop Now" icon={FaShoppingBag} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
