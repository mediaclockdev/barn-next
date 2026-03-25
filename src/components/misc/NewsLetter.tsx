"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import TextHeader from "@/src/utils/TextHeader";
import Button from "../ui/Button";
import { FaBell } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="halfSection">
      <div className="container ">
        <div className="bg-linear-to-r from-gray-200 via-cyan-50 to-cyan-200 rounded-lg overflow-hidden grid md:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="p-10 space-y-6">
            <TextHeader
              text="Subscribe To Our"
              highlightedText="Newsletter"
              btn={false}
              isGrid={true}
            />

            <p className="text-text-light max-w-md">
              Subscribe to our monthly newsletter and stay up to date with all
              news and events.
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 text-base text-text-light">
                Enter Your Email Id
                <FiArrowRight />
              </label>

              <input
                type="email"
                placeholder="john.doe@xyz.com"
                className="w-full md:w-90 border border-cyan-400 rounded-md px-4 py-3 bg-transparent outline-none"
              />
            </div>

            <Button text="Subscribe" icon={FaBell} />
          </div>

          {/* Right Image */}
          <div className="relative h-80 md:h-105 hidden lg:block">
            <Image
              src="/images/rabbit.png"
              alt="Rabbit"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
