"use client";

import { FaBell } from "react-icons/fa";
import Button from "../ui/Button";
import { useState } from "react";

const StayInTouch = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="halfSection">
      <div className="container">
        <div className="bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 py-16 md:p-8 rounded-[2.5rem]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Stay in Touch
            </h2>

            <p className="text-gray-600 text-lg mb-10">
              Stay updated with the latest offers, news, and updates from us.
            </p>

            {subscribed ? (
              <div className="text-green-700 font-medium text-lg bg-green-50 border border-green-100 py-4 px-8 rounded-2xl inline-block shadow-sm">
                🎉 Thanks for subscribing to our newsletter!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full flex-wrap"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-6 py-4 rounded-xl text-gray-900 bg-gray-50/50 border border-gray-200 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all max-w-md"
                />

                <Button
                  type="submit"
                  text="Subscribe"
                  icon={FaBell}
                  className="w-full sm:w-auto py-4"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
