"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="section">
      <div className="container ">
        <div className="bg-linear-to-r from-gray-200 to-cyan-200 rounded-lg overflow-hidden grid md:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="p-10 space-y-6">
            <h2 className="text-3xl font-semibold">
              Subscribe To Our <span className="text-cyan-500">Newsletter</span>
            </h2>

            <p className="text-gray-700 max-w-md">
              Subscribe to our monthly newsletter and stay up to date with all
              news and events.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-gray-700">
                Enter Your Email Id
                <FiArrowRight />
              </label>

              <input
                type="email"
                placeholder="john.doe@xyz.com"
                className="w-full md:w-90 border border-cyan-400 rounded-md px-4 py-3 bg-transparent outline-none"
              />
            </div>

            <button className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-2 rounded-full flex items-center gap-2">
              Subscribe
              <FiArrowRight />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative h-80 md:h-105 hidden lg:block">
            <Image
              src="/images/rabbit.png"
              alt="Rabbit"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
