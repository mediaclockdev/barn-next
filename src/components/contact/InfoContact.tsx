"use client";

import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowCircleRight,
} from "react-icons/fa";
import Button from "../ui/Button";

const ContactSection = () => {
  return (
    <section className="halfSection">
      <div className="container">
        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Address */}
          <a
            href="https://maps.app.goo.gl/eakWiGZmiMJntaLH8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 rounded-lg p-8 text-center hover:bg-gray-300 transition cursor-pointer"
          >
            <FaMapMarkerAlt className="mx-auto text-3xl mb-4" />
            <p className="text-text-light leading-relaxed tracking-wide">
              62–76 Kilmore Road,
              <br />
              Heathcote VIC 3523
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:0412713501"
            className="bg-gray-200 rounded-lg p-8 text-center hover:bg-gray-300 transition cursor-pointer"
          >
            <FaPhoneAlt className="mx-auto text-3xl mb-4" />
            <p className="text-text-light text-base leading-relaxed tracking-wide">
              0412 713 501 <br />
              Monday – Thursday: 10am–6pm <br />
              Friday: 8:30am – 7:00 pm <br />
              Saturday: 9am – 2pm <br />
              Sunday: Closed
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:barn@gmail.com"
            className="bg-gray-200 rounded-lg p-8 text-center hover:bg-gray-300 transition cursor-pointer"
          >
            <FaEnvelope className="mx-auto text-3xl mb-4" />
            <p className="text-text-light leading-relaxed tracking-wide">barn@gmail.com</p>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6" id="message">
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

            <Button
              text="Contact Us"
              icon={FaArrowCircleRight}
              className="mt-4"
            />
          </div>

          {/* Map Section */}
          <div className="bg-gray-200 rounded-lg p-10 flex flex-col gap-6">
            <h2 className="text-4xl font-semibold">Find us on map</h2>

            <div className="relative w-full h-75 md:h-87.5 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.172924331471!2d144.72474327295217!3d-36.94144883548362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad77d5b559ce235%3A0x82c9183634af623!2sTHE%20BARN%20PET%20STOCK%20AND%20FEED!5e1!3m2!1sen!2sin!4v1773636072069!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <Button
              text="Get Directions"
              icon={FaArrowCircleRight}
              className="w-fit"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=62-76+Kilmore+Road+Heathcote+VIC+3523",
                )
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
