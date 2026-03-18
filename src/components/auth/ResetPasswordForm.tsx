"use client";

import React, { useState } from "react";
import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-6 lg:mb-10 text-center">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 container max-w-lg mx-auto"
      >
        <AuthInput
          label="Current Password"
          type="password"
          showPasswordToggle
          placeholder="******"
        />

        <AuthInput
          label="New Password"
          type="password"
          showPasswordToggle
          placeholder="******"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="******"
        />

        <Link href={"/login"}>
          <AuthButton text="Reset Password" />
        </Link>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
