import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="section !p-0">
      <div className="w-full min-h-[calc(100vh-80px)] bg-white overflow-hidden shadow-lg grid md:grid-cols-2">
        <div className="relative h-full">
          <Image
            src="/images/auth/auth.png"
            alt="Dog"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-linear-to-r from-cyan-50 to-gray-50 p-3 flex flex-col justify-center relative">
          <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
            Welcome To The Barn
          </h1>

          {children}

          <div className="absolute bottom-0 right-0 w-36 opacity-90">
            <Image
              src="/images/dog-cartoon.png"
              alt="dog"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
