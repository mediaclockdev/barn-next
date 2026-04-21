"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { FaPaperPlane } from "react-icons/fa";

const HeroContact = () => {
  const scrollSmooth = () => {
    const element = document.getElementById("message");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full">
      <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="/images/contact/contact.jpg"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent w-full md:w-2/3 lg:w-1/2"></div>
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container w-full mx-auto">
            <div className="px-6 flex flex-col gap-8 items-start justify-start">
              <h1 className="text-6xl font-bold leading-12 lg:leading-15 text-primary">
                Contact
                <span className=" text-white"> Us</span>
              </h1>

              <p className="text-gray-100 text-lg font-medium  lg:mx-0">
                We’d love to hear from you. Reach out anytime.
              </p>
              <Button
                text="Send Us A Message"
                icon={FaPaperPlane}
                onClick={scrollSmooth}
                aria-label="Scroll to Message Section"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContact;
