"use client";

import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Button from "../ui/Button";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="halfSection">
      <div className="container">
        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Address */}
          <a
            href="https://maps.app.goo.gl/eakWiGZmiMJntaLH8"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium leading-relaxed tracking-wide">
              62–76 Kilmore Road,
              <br />
              Heathcote VIC 3523
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:0412713501"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium text-base leading-relaxed tracking-wide">
              0412 713 501 <br />
              Mon – Thu: 10am–6pm <br />
              Fri: 8:30am – 7:00pm <br />
              Sat: 9am – 2pm <br />
              Sun: Closed
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:barn@gmail.com"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaEnvelope className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium leading-relaxed tracking-wide">
              barn@gmail.com
            </p>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12" id="message">
          {/* Contact Form */}
          <form
            className="bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-12 flex flex-col h-full"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-10">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-4">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <Button
                  text="Send Another Message"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 mx-auto"
                  type="button"
                />
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <div className="space-y-5 flex-1">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />

                  <textarea
                    required
                    placeholder="Message"
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    text="Send Message"
                    icon={FaPaperPlane}
                    className="w-full md:w-fit"
                    type="submit"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Map Section */}
          <div className="bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-12 flex flex-col gap-8 h-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Find Us On Map
            </h2>

            <div className="relative w-full flex-1 min-h-[300px] md:min-h-0 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
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
              icon={FaMapMarkedAlt}
              className="w-full md:w-fit"
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
