import React from "react";

type Prop = {
  text: string;
  muted?: boolean;
};

const AuthButton: React.FC<Prop> = ({ text, muted = false }) => {
  return (
    <button
      className={`w-full ${muted ? "bg-text-muted/60" : "bg-primary"} text-white py-3 rounded-lg text-lg ${muted ? "hover:bg-text-muted" : "hover:bg-cyan-500"} transition cursor-pointer font-medium`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
