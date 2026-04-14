import AuthForm from "@/src/components/auth/AuthForm";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthFormSkeleton from "@/src/components/auth/AuthFormSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthFormSkeleton mode="login" />}>
        <AuthForm mode="login" />
      </Suspense>
    </AuthLayout>
  );
};

export default page;
