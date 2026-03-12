import React from "react";

type Prop = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Prop> = ({ text, className, onClick, icon: Icon }) => {
  return (
    <button
      className={`${className} group relative overflow-hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer hover:bg-primary-gray`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {text}
        {Icon && <Icon />}
      </span>
    </button>
  );
};

export default Button;
