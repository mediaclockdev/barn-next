"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface AuthInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  isSignup?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  required = false,
  onChange,
  rightIcon,
  showPasswordToggle = false,
  isSignup = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div>
      <label className="text-sm">{label}</label>

      <div className="relative mt-2">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          className="w-full border border-cyan-400 rounded-lg px-4 py-3 pr-10 bg-transparent outline-none"
        />

        {/* Right Icon */}
        {rightIcon && !showPasswordToggle && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
            {rightIcon}
          </div>
        )}

        {/* Password Toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>

      {!isSignup && (
        <Link href={"/forgot-password"}>
          <p className="text-sm text-right text-cyan-500 mt-2 cursor-pointer underline underline-offset-2">
            Forgot Password?
          </p>
        </Link>
      )}
    </div>
  );
};

export default AuthInput;
