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
          label="Enter Name"
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

      <AuthButton text={isSignup ? "Sign Up" : "Sign In"} />

      <p className="text-center text-base text-cyan-500">
        {isSignup ? "Already have an account?" : "Don’t Have An Account?"}
        <span>
          {" "}
          <Link
            href={isSignup ? "/login" : "/signup"}
            className=" underline hover:text-cyan-600 underline-offset-2 "
          >{` ${isSignup ? "Sign In" : "Sign Up"}`}</Link>{" "}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
