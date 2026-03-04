"use client";

import Image from "next/image";
import React from "react";
import Button from "../components/ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";

type Props = {
  text: string;
  highlightedText: string;
  btn?: boolean;
};

const TextHeader: React.FC<Props> = ({ text, highlightedText, btn = true }) => {
  return (
    <section className="relative py-12 overflow-hidden w-full">
      <div className="flex items-center justify-between">
        <div className="relative max-w-6xl px-6">
          <div className="absolute -top-10 left-0 pointer-events-none">
            <Image
              src="/images/textImage.png"
              alt="Blur Background"
              width={400}
              height={300}
              className="opacity-90"
              priority
            />
          </div>

          <h2 className="relative z-10 text-4xl md:text-4xl font-bold">
            <span>{text} </span>
            <span className="text-primary">{highlightedText}</span>
          </h2>
        </div>
        <div className="">
          {btn && <Button text="View All" icon={FaArrowCircleRight} />}
        </div>
      </div>
    </section>
  );
};

export default TextHeader;