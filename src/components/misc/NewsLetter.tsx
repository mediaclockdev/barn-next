"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import TextHeader from "@/src/helper/TextHeader";
import Button from "../ui/Button";
import { FaBell } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

            {subscribed ? (
              <div className="text-green-700 font-medium text-lg bg-green-50 border border-green-100 py-4 px-8 rounded-2xl inline-block shadow-sm">
                🎉 Thanks for subscribing to our newsletter!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-base text-text-light">
                    Enter Your Email Id
                    <FiArrowRight />
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john.doe@xyz.com"
                    className="w-full md:w-90 border border-cyan-400 rounded-md px-4 py-3 outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white/50 focus:bg-white transition-colors"
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  type="submit"
                  text={loading ? "Subscribing..." : "Subscribe"}
                  icon={FaBell}
                  disabled={loading}
                />
              </form>
            )}
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
