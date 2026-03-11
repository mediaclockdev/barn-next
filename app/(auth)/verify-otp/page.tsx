import AuthLayout from "@/src/components/auth/AuthLayout";
import OtpForm from "@/src/components/auth/OtpForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <OtpForm />
    </AuthLayout>
  );
};

export default page;
