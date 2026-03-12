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
        <div className="absolute inset-0 bg-linear-to-r from-[#d9d9d9]/30 to-transparent"></div>
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container w-full mx-auto">
            <div className="px-6 flex flex-col gap-6 items-start justify-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-12 lg:leading-15 text-sky-400">
                Contact
                <span className=" text-gray-900"> Us</span>
              </h1>

              <p className="text-text-light text-lg font-medium mx-auto lg:mx-0">
                We’d love to hear from you. Reach out anytime.
              </p>

              <Button text="Send Us A Message" icon={FaArrowCircleRight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContact;
