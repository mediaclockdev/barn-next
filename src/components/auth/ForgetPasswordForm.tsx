"use client";

import React, { useState } from "react";
import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 container max-w-lg mx-auto">
      <div>
        <AuthInput
          label="Enter Email"
          type="email"
          placeholder="john.doe@xyz.com"
        />
        <p className="text-sm text-gray-500 mt-2">
          We will send you a reset password link.
        </p>
      </div>

      <Link href={"/reset-password"}>
        <AuthButton text="Send Reset Link" />
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
