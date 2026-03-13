"use client";

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import AuthButton from "../ui/AuthButton";
import AuthInput from "../ui/AuthInput";
import Link from "next/link";

type Prop = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<Prop> = ({ mode = "login" }) => {
  const isSignup = mode === "signup";

  return (
    <div className="space-y-6 container max-w-lg mx-auto">
      {isSignup && (
        <AuthInput
          label="Enter Username"
          type="text"
          placeholder="john.doe"
          rightIcon={<FiArrowRight />}
        />
      )}

      <AuthInput
        label="Enter Email"
        type="email"
        placeholder="john.doe@xyz.com"
        rightIcon={<FiArrowRight />}
      />

      <AuthInput
        label="Enter Password"
        type="password"
        placeholder="******"
        showPasswordToggle
        isSignup={isSignup}
      />

      <Link href={"/verify-otp"} >
        <AuthButton text={isSignup ? "Sign Up" : "Sign In"} />
      </Link>

      <p className="text-center text-base text-gray-600 mt-6">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}

        <Link
          href={isSignup ? "/login" : "/signup"}
          className="ml-1 font-medium text-cyan-600 hover:text-cyan-700 underline underline-offset-2"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
