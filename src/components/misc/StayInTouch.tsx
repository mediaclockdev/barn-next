"use client";

import { FaBell } from "react-icons/fa";
import Button from "../ui/Button";
import { useState } from "react";

const StayInTouch = () => {
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
      const response = await fetch(
        "/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

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
              <div className="w-full mx-auto max-w-xl">
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full flex-wrap"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full sm:flex-1 px-6 py-4 rounded-xl text-gray-900 bg-gray-50/50 border border-gray-200 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all max-w-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />

                  <Button
                    type="submit"
                    text={loading ? "Subscribing..." : "Subscribe"}
                    icon={FaBell}
                    className="w-full sm:w-auto py-4"
                    disabled={loading}
                  />
                </form>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
