"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">
        {/* Left Image */}
        <div className="relative md:h-full">
          <Image
            src="/images/auth/auth.png" // replace with your image
            alt="Dog"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="bg-cyan-50 p-10 flex flex-col justify-center relative">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
            Welcome To The Barn
          </h1>

          <div className="space-y-6 max-w-md mx-auto w-full">
            {/* Email */}
            <div>
              <label className="text-sm">Enter Email</label>

              <div className="relative mt-2">
                <input
                  type="email"
                  className="w-full border border-cyan-400 rounded-lg px-4 py-3 pr-10 bg-transparent outline-none"
                />

                <FiArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-lg" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm">Enter Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-cyan-400 rounded-lg px-4 py-3 pr-10 bg-transparent outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <p className="text-xs text-right text-cyan-500 mt-1 cursor-pointer">
                Forgot Password?
              </p>
            </div>

            {/* Sign In */}
            <button className="w-full bg-cyan-500 text-white py-3 rounded-lg text-lg hover:bg-cyan-600 transition">
              Sign In
            </button>

            <p className="text-center text-sm text-cyan-500">
              Don’t Have An Account?
            </p>

            {/* Sign Up */}
            <button className="w-full bg-cyan-500 text-white py-3 rounded-lg text-lg hover:bg-cyan-600 transition">
              Sign Up
            </button>
          </div>

          {/* Bottom Decoration Image */}
          <div className="absolute bottom-0 right-0 w-36 opacity-90">
            <Image
              src="/images/dog-cartoon.png" // your decoration image
              alt="dog"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
