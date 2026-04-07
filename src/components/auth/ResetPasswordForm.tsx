"use client";

import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/src/utils/auth-api";
import { useState } from "react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const schema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await resetPassword({
        token,
        password: data.newPassword,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message || "Password successfully updated!");

      setTimeout(() => {
        router.push("/login"); // or router.back()
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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

        <AuthButton
          text={isLoading ? "Resetting..." : "Reset Password"}
          type="submit"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
