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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 container max-w-lg mx-auto"
    >
      <h3 className="w-full text-center font-semibold text-2xl text-text-light">
        Reset Password
      </h3>

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
  );
};

export default ResetPasswordForm;
