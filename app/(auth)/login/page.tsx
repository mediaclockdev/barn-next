import AuthForm from "@/src/components/auth/AuthForm";
import AuthLayout from "@/src/components/auth/AuthLayout";

const page = () => {
  return (
    <AuthLayout>
      <AuthForm mode="login" /> 
    </AuthLayout>
  );
};

export default page;
