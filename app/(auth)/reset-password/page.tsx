import AuthLayout from "@/src/components/auth/AuthLayout";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout title={false}>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default page;
