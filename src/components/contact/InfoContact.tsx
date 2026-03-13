"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowCircleRight } from "react-icons/fa";
import { FiArrowRight, FiArrowRightCircle } from "react-icons/fi";
import Button from "../ui/Button";
import { AiFillRightCircle } from "react-icons/ai";

const ContactSection = () => {
  return (
    <section className="halfSection">
      <div className="container">
        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Address */}
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <FaMapMarkerAlt className="mx-auto text-3xl mb-4" />
            <p className="text-text-light">
              62–76 Kilmore Road,
              <br />
              Heathcote VIC 3523
            </p>
          </div>

          {/* Phone */}
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <FaPhoneAlt className="mx-auto text-3xl mb-4" />
            <p className="text-text-light text-base leading-relaxed">
              0412 713 501 <br />
              Mon – Thur: 10am–6pm <br />
              Fri: 8:30am – 7:00 pm <br />
              Sat: 9am – 2pm <br />
              Sun: Closed
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <FaEnvelope className="mx-auto text-3xl mb-4" />
            <p className="text-text-light">abc@gmail.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="bg-gray-200 rounded-lg p-10">
            <h2 className="text-4xl font-semibold mb-8">Send Us a Message</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-cyan-400 bg-transparent outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-cyan-400 bg-transparent outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-cyan-400 bg-transparent outline-none"
              />

              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-cyan-400 bg-transparent outline-none"
              />
            </div>

            <Button text="Contact Us" icon={FaArrowCircleRight} className="mt-4" />
          </div>

          {/* Map Section */}
          <div className="bg-gray-200 rounded-lg p-10 flex flex-col justify-between">
            <h2 className="text-4xl font-semibold mb-6">Find us on map</h2>

            {/* Map Placeholder */}
            <div className="flex-1"></div>

            <Button
              text="Get Directions"
              icon={FaArrowCircleRight}
              className="w-fit"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
