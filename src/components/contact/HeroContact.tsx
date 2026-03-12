import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";

const HeroContact = () => {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="/images/contact/contact.png"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container w-full mx-auto">
            <div className="px-6 flex flex-col gap-6 items-start justify-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-12 lg:leading-15 text-gray-900">
                Quality Care <span className="text-sky-400">for</span>
                <br />
                <span className="text-sky-400">Every Companion</span>
              </h1>

              <p className="text-text-light font-medium mx-auto lg:mx-0">
                Your one-stop shop for all your pet needs, from playful puppies
                to majestic horses.
              </p>

              <Button text="Shop Now" icon={FaArrowCircleRight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContact;
