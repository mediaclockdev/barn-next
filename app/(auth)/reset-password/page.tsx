import AuthLayout from "@/src/components/auth/AuthLayout";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <AuthLayout title={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
};

export default page;
