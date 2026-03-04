import React from "react";

type Prop = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

const Button: React.FC<Prop> = ({ text, className, icon: Icon }) => {
  return (
    <button
      className={`inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition cursor-pointer ${className}`}
    >
      {text}
      {Icon && <Icon fontSize={20} />}
    </button>
  );
};

export default Button;
