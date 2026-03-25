"use client";

import React from "react";
import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();

  const schema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // Attach error to confirmPassword field
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
    // TODO: Call backend API to change password
    toast.success("Password successfully updated!");
    
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-6 lg:mb-10 text-center">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 container max-w-lg mx-auto"
      >
        <AuthInput
          label="Current Password"
          type="password"
          showPasswordToggle
          placeholder="******"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        <AuthInput
          label="New Password"
          type="password"
          showPasswordToggle
          placeholder="******"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="******"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <AuthButton text={isSubmitting ? "Resetting..." : "Reset Password"} type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
