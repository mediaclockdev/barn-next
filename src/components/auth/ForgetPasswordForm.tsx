"use client";

import React from "react";
import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const schema = z.object({
    email: z.string().email("Please enter a valid email"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = () => {
    // TODO: Call authentication API to send password reset email
    toast.success("Reset link sent to your email!");
    
    // Simulate API delay, then navigate
    setTimeout(() => {
      router.push("/reset-password");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 container max-w-lg mx-auto">
      <div>
        <AuthInput
          label="Enter Email"
          type="email"
          placeholder="john.doe@xyz.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <p className="text-sm text-gray-500 mt-2">
          We will send you a reset password link.
        </p>
      </div>

      <AuthButton text={isSubmitting ? "Sending..." : "Send Reset Link"} type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default ForgotPasswordForm;
