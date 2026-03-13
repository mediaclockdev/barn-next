"use client";

import Image from "next/image";
import React from "react";
import Button from "../components/ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";

type Props = {
  text: string;
  highlightedText: string;
  btn?: boolean;
  center?: boolean;
  shadow?: boolean;
  isGrid?: boolean;
  onClick?: () => void;
};

const TextHeader: React.FC<Props> = ({
  text,
  highlightedText,
  center,
  onClick,
  shadow = true,
  btn = true,
  isGrid = false,
}) => {
  return (
    <section
      className={`relative ${isGrid ? "py-3" : "py-12"}  w-full`}
    >
      <div
        className={`flex items-center ${
          center ? "justify-center" : "justify-between"
        } ${btn && "flex-col md:flex-row gap-5"}`}
      >
       <div className="relative inline-block px-1">
          
          {shadow && (
            <Image
              src="/images/textImage.png"
              alt="Blur Background"
              width={600}
              height={300}
              className="absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              w-[120%] max-w-none opacity-80 pointer-events-none"
            />
          )}

          <h2 className="relative z-10 text-4xl font-bold ">
            <span>{text} </span>
            <span className="text-primary">{highlightedText}</span>
          </h2>

        </div>

        {btn && (
          <Button text="View All" icon={FaArrowCircleRight} onClick={onClick} />
        )}
      </div>
    </section>
  );
};

export default TextHeader;
