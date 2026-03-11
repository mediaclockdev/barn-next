"use client";

import React, { useState } from "react";
import AuthInput from "../ui/AuthInput";

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
    <form onSubmit={handleSubmit} className="space-y-6 container max-w-lg mx-auto">
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

      <button className="w-full bg-cyan-500 text-white py-3 rounded-lg text-lg hover:bg-cyan-600 transition">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
