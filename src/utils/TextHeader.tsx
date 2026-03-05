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
};

const TextHeader: React.FC<Props> = ({
  text,
  highlightedText,
  center,
  shadow = true,
  btn = true,
  isGrid = false,
}) => {
  return (
    <section className={`relative ${isGrid ? "py-3" : "py-12"} overflow-hidden w-full`}>
      <div
        className={`flex items-center ${
          center ? "justify-center" : "justify-between"
        } ${btn && "flex-col md:flex-row gap-5" }`}
      >
        <div className="relative w-fit px-1">
          {shadow && (
            <div
              className={`absolute ${isGrid ? "-top-2" : "-top-9"} left-0 pointer-events-none`}
            >
              <Image
                src="/images/textImage.png"
                alt="Blur Background"
                width={400}
                height={300}
                priority
              />
            </div>
          )}

          <h2 className="relative z-10 text-4xl font-bold">
            <span>{text} </span>
            <span className="text-primary">{highlightedText}</span>
          </h2>
        </div>

        {btn && <Button text="View All" icon={FaArrowCircleRight} />}
      </div>
    </section>
  );
};

export default TextHeader;
