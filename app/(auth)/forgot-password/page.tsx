import AuthLayout from "@/src/components/auth/AuthLayout";
import ForgetPasswordForm from "@/src/components/auth/ForgetPasswordForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <ForgetPasswordForm />
    </AuthLayout>
  );
};

export default page;
