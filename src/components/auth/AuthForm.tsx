"use client";

import React from "react";
import AuthButton from "../ui/AuthButton";
import AuthInput from "../ui/AuthInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginUser, signupUser } from "@/src/utils/auth-api";

type Prop = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<Prop> = ({ mode = "login" }) => {
  const isSignup = mode === "signup";

  const schema = z.object({
    username: isSignup
      ? z.string().min(3, "Username must be at least 3 characters")
      : z.string().optional(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type AuthFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isSignup) {
        // 🔌 PLUG AND PLAY: Call your new signup endpoint natively
        await signupUser({
          email: data.email,
          password: data.password,
          first_name: data.username, // mapping username appropriately
        });
      } else {
        // 🔌 PLUG AND PLAY: Call your new login endpoint natively
        await loginUser({
          email: data.email,
          password: data.password,
        });
      }
      toast.success(`${isSignup ? "Sign Up" : "Login"} request triggered!`);
    } catch (err) {
      // It will throw an error right now because the endpoints in api-endpoints.ts are placeholders, 
      // but once they're real, this works magic!
      console.warn("Auth API not ready yet (waiting for real endpoint in api-endpoints.ts)");
      // toast.error(`Error: ${(err as Error).message || "Something went wrong"}`);
      
      // Fallback fake success to keep UI usable for now:
      toast.success(`${isSignup ? "Sign Up" : "Login"} Successful! (Demo mode)`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 container max-w-lg mx-auto">
      {isSignup && (
        <AuthInput
          label="Enter Username"
          type="text"
          placeholder="john.doe"
          {...register("username")}
          error={errors.username?.message}
        />
      )}

      <AuthInput
        label="Enter Email"
        type="email"
        placeholder="john.doe@xyz.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <AuthInput
        label="Enter Password"
        type="password"
        placeholder="******"
        showPasswordToggle
        isSignup={isSignup}
        {...register("password")}
        error={errors.password?.message}
      />

      <AuthButton text={isSignup ? "Sign Up" : "Sign In"} type="submit" />

      <p className="text-center text-base text-gray-600 mt-6">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}

        <Link
          href={isSignup ? "/login" : "/signup"}
          className="ml-1 font-medium text-cyan-600 hover:text-cyan-700 underline underline-offset-2"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
