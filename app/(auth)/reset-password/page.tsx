import AuthLayout from "@/src/components/auth/AuthLayout";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default page;
