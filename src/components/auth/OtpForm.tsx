"use client";
import React, { useRef, useState } from "react";
import AuthButton from "../ui/AuthButton";
import Link from "next/link";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div>
        <label className="text-base block text-center">Enter OTP</label>
        <div className="flex justify-center gap-3 mt-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border border-cyan-400 rounded-lg text-center text-lg bg-white outline-none"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <Link href={"login"} className="w-full">
          <AuthButton text="Sign In" />
        </Link>

        <AuthButton text="Resent OTP" muted={true} />
      </div>
    </div>
  );
};

export default OtpForm;
