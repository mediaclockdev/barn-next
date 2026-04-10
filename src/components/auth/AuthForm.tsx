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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/src/store/authStore";
import { useCartStore } from "@/src/store/cartStore";
import { useEffect } from "react";

type Prop = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<Prop> = ({ mode = "login" }) => {
  const isSignup = mode === "signup";
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const pathName = useSearchParams();

  useEffect(() => {
    // If user is already logged in, they shouldn't be on login/signup pages
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

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
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isSignup) {
        const result = await signupUser({
          email: data.email,
          password: data.password,
          first_name: data.username,
          username: data.username,
        });

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Sign Up Successful!");
        router.replace("/login");
      } else {
        const result = await loginUser({
          email: data.email,
          password: data.password,
        });

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Login Successful!");

        const token = result.token || result.jwt;
        setUser(result, token);
        await fetchCart();

        if (pathName.get("redirect")) {
          router.push(pathName.get("redirect") || "/");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.error("Auth Error:", err);
      toast.error(`Error: ${(err as Error).message || "Something went wrong"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 container max-w-lg mx-auto"
    >
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

      <AuthButton
        text={isLoading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
        type="submit"
        disabled={isLoading}
      />

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
