import React from "react";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";

const StayInTouch = () => {
  return (
    <div className="my-12 w-full max-w-xl rounded-lg">
      <h2 className="text-4xl font-semibold mb-6">
        Let’s Stay In <span className="text-sky-500">Touch</span>
      </h2>

      <div className="flex items-center gap-3 mb-3 text-gray-700">
        <p className="font-medium">Enter Your Email Id</p>
        <FaArrowRight />
      </div>

      <input
        type="email"
        placeholder=""
        className="w-full border border-sky-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400 bg-transparent"
      />

      <div className="my-5">
        <Button text="Subscribe" icon={FaArrowCircleRight} />
      </div>
    </div>
  );
};

export default StayInTouch;
